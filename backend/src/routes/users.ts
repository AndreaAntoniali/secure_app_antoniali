import { Router } from 'express'
import pool from '../db/database.ts'
import bcrypt from 'bcryptjs'
import { requireAdmin } from '../middleware/auth-admin.ts'

// Création d'un routeur Express pour gérer les routes /api/users
const router = Router()

// ═══════════════════════════════════════════════════════════════════════════
// GET /api/users - Liste de tous les utilisateurs
// ═══════════════════════════════════════════════════════════════════════════
router.get('/', async (_req, res) => {
    // Requête SQL : sélectionne uniquement id, login, role (PAS password_hash)
    const { rows } = await pool.query('SELECT id, login, role FROM users')
    // Renvoie le tableau d'utilisateurs en JSON avec status 200 (implicite)
    res.json(rows)
})


// Récupération du profil utilisateur (authentifié)
router.get('/me', async (req, res) => {
    const user = req.user
    const { rows } = await pool.query(
        'SELECT id, login, role FROM users WHERE id=$1',
        [user?.id]
    )
    res.json(rows[0]);
})
// Liste de tous les utilisateurs (réservée aux admins)
router.get('/', requireAdmin, async (_req, res) => {
    const { rows } = await pool.query(
        'SELECT id, login, role FROM users ORDER BY id'
    )
    res.json(rows)
})
// ═══════════════════════════════════════════════════════════════════════════
// GET /api/users/:id - Récupérer UN utilisateur par son ID
// ═══════════════════════════════════════════════════════════════════════════
router.get("/:id", async (req, res) => {
    // Extraction du paramètre dynamique de l'URL
    // Exemple: /api/users/5 → id = "5" (toujours une string)

    const { id } = req.params

    // ─────────────────────────────────────────────────────────────────────
    // VALIDATION : Vérifier que l'ID est un nombre valide
    // ─────────────────────────────────────────────────────────────────────
    // !id : vérifie si id est vide, null ou undefined
    // isNaN(Number(id)) : vérifie si la conversion en nombre échoue
    // Exemples:

    if (!id || isNaN(Number(id))) {
        // Status 400 Bad Request : erreur côté client (paramètre invalide)
        return res.status(400).json({ error: "ID invalide" })
        // return est CRUCIAL : arrête l'exécution de la fonction
    }

    // ─────────────────────────────────────────────────────────────────────
    // REQUÊTE À LA BASE DE DONNÉES
    // ─────────────────────────────────────────────────────────────────────
    try {
        // Prepared statement (protection contre l'injection SQL)
        // $1 : placeholder remplacé par la valeur du tableau [id]
        // SELECT uniquement id, login, role (jamais password_hash)
        const { rows } = await pool.query(
            'SELECT id, login, role FROM users WHERE id = $1',
            [id] // Valeur sécurisée passée séparément
        )

        // ─────────────────────────────────────────────────────────────────
        // VÉRIFICATION : L'utilisateur existe-t-il ?
        // ─────────────────────────────────────────────────────────────────
        if (rows.length === 0) {
            // Status 404 Not Found : ressource inexistante
            return res.status(404).json({ error: "Utilisateur non trouvé " })
        }

        // ─────────────────────────────────────────────────────────────────
        // SUCCÈS : Utilisateur trouvé
        // ─────────────────────────────────────────────────────────────────
        // rows[0] : premier (et seul) élément du tableau
        // res.json() : envoie la réponse en JSON avec status 200 (implicite)
        // Ajoute automatiquement le header Content-Type: application/json
        res.json(rows[0])

    } catch (err) {
        // ─────────────────────────────────────────────────────────────────
        // GESTION DES ERREURS (DB down, timeout, erreur SQL, etc.)
        // ─────────────────────────────────────────────────────────────────
        // Log côté serveur uniquement (terminal backend)
        console.log("Error DB:", err)
        // Ne PAS exposer les détails de l'erreur au client (sécurité)
        // Status 500 Internal Server Error : erreur côté serveur
        res.status(500).json({ error: "Erreur serveur" })
    }
})

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/users - Créer un nouvel utilisateur
// ═══════════════════════════════════════════════════════════════════════════
router.post('/', async (req, res) => {
    // Extraction des données du body (parsé par express.json())
    const { login, password } = req.body

    // ─────────────────────────────────────────────────────────────────────
    // VALIDATION : Champs requis
    // ─────────────────────────────────────────────────────────────────────
    if (!login || !password) {
        // Status 400 Bad Request : données manquantes
        return res.status(400).json({ error: 'Login et mot de passe requis' })
    }

    try {
        // ─────────────────────────────────────────────────────────────────
        // HACHAGE DU MOT DE PASSE avec bcrypt
        // ─────────────────────────────────────────────────────────────────
        // bcrypt.hash(password, saltRounds)
        // 10 rounds = bon équilibre sécurité/performance
        // Génère un hash unique (inclut un salt aléatoire)
        // Exemple: "admin" → "$2b$10$abc123..."

        const hash = await bcrypt.hash(password, 10)

        // ─────────────────────────────────────────────────────────────────
        // INSERTION EN BASE DE DONNÉES
        // ─────────────────────────────────────────────────────────────────
        // Stocke le HASH, jamais le mot de passe en clair
        // $1, $2 : placeholders sécurisés (protection injection SQL)
        await pool.query(
            'INSERT INTO users (login, password_hash) VALUES ($1, $2)',
            [login, hash] // Valeurs passées séparément
        );

        // Status 201 Created : ressource créée avec succès
        res.status(201).json({ message: 'Utilisateur créé' })

    } catch (err: any) {
        // ─────────────────────────────────────────────────────────────────
        // GESTION DES ERREURS SPÉCIFIQUES
        // ─────────────────────────────────────────────────────────────────
        // Code '23505' : violation de contrainte UNIQUE (login déjà existant)
        // Code PostgreSQL spécifique pour les doublons
        if (err.code === '23505') {
            // Status 409 Conflict : ressource en conflit
            res.status(409).json({ error: 'Login déjà existant' })
        } else {
            // Autres erreurs (DB down, timeout, etc.)
            console.error(err); // Log complet côté serveur
            // Status 500 : erreur serveur générique
            res.status(500).json({ error: 'Erreur serveur' })
        }
    }
})

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT DU ROUTEUR
// ═══════════════════════════════════════════════════════════════════════════
// Ce routeur sera monté dans server.ts avec :
// app.use('/api/users', verifyToken, usersRouter)
// Toutes les routes ici sont donc préfixées par /api/users
// et protégées par le middleware verifyToken
export default router