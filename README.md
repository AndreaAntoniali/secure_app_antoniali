# 🔐 Secure App

Une application web sécurisée full-stack avec authentification JWT, gestion des rôles et communication HTTPS.

## 📋 Table des matières

- [Présentation](#présentation)
- [Architecture](#architecture)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Sécurité](#sécurité)
- [Structure du projet](#structure-du-projet)

## 🎯 Présentation

Secure App est une application web moderne conçue avec les meilleures pratiques de sécurité. Elle propose un système complet d'authentification et de gestion des utilisateurs avec différents niveaux d'accès (utilisateur/administrateur).

### Cas d'usage

- Système d'authentification sécurisé avec JWT
- Gestion des utilisateurs avec rôles (user/admin)
- Interface d'administration pour la gestion des comptes
- Communication sécurisée via HTTPS
- Protection contre les attaques courantes (XSS, CSRF, Clickjacking, etc.)

## 🏗️ Architecture

L'application est composée de trois parties principales :

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (Angular)                  │
│                      Port: 8080 (HTTP)                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     ↓
┌─────────────────────────────────────────────────────────┐
│                   Backend (Node.js/Express)              │
│                      Port: 4000 (HTTPS)                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ PostgreSQL Protocol
                     ↓
┌─────────────────────────────────────────────────────────┐
│                   Database (PostgreSQL)                  │
│                         Port: 5432                       │
└─────────────────────────────────────────────────────────┘
```

### Services Docker

- **Frontend** : Application Angular servie via Nginx
- **Backend** : API REST en Node.js/Express avec TypeScript
- **Database** : Base de données PostgreSQL pour la persistance
- **Adminer** : Interface web pour gérer la base de données (port 8081)

## ✨ Fonctionnalités

### Authentification
- ✅ Inscription et connexion des utilisateurs
- ✅ Tokens JWT (Access Token + Refresh Token)
- ✅ Cookies sécurisés (HttpOnly, Secure, SameSite)
- ✅ Renouvellement automatique des tokens
- ✅ Déconnexion sécurisée

### Gestion des utilisateurs
- ✅ Création, modification et suppression d'utilisateurs
- ✅ Système de rôles (user/admin)
- ✅ Interface d'administration
- ✅ Hashage des mots de passe avec bcrypt

### Sécurité
- ✅ Communication HTTPS (certificats mkcert)
- ✅ Protection contre XSS
- ✅ Protection contre CSRF
- ✅ Protection contre Clickjacking
- ✅ Validation des entrées
- ✅ Prepared statements (protection SQL injection)
- ✅ En-têtes de sécurité HTTP

## 🛠️ Technologies utilisées

### Backend
- **Node.js** avec **Express** (v5.1.0)
- **TypeScript** (v5.9.3)
- **PostgreSQL** (v16) - Base de données
- **JWT** - Authentification
- **bcrypt** - Hashage des mots de passe
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

### Frontend
- **Angular** (v20.2.0)
- **Angular Material** (v20.2.8)
- **RxJS** (v7.8.0)
- **TypeScript** (v5.9.2)

### DevOps
- **Docker** & **Docker Compose**
- **Nginx** - Serveur web pour le frontend
- **mkcert** - Certificats SSL locaux

## 📦 Prérequis

- **Docker** (v20.10 ou supérieur)
- **Docker Compose** (v2.0 ou supérieur)
- **mkcert** (optionnel, pour les certificats HTTPS locaux)
- **Node.js** (v18 ou supérieur) - pour le développement local
- **npm** (v9 ou supérieur) - pour le développement local

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/AndreaAntoniali/secure_app.git
cd secure_app
```

### 2. Configuration des certificats SSL (optionnel pour le développement)

```bash
# Installer mkcert
# Sur macOS
brew install mkcert

# Sur Linux
sudo apt install libnss3-tools
wget -O mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
chmod +x mkcert
sudo mv mkcert /usr/local/bin/

# Créer l'autorité de certification locale
mkcert -install

# Générer les certificats pour le backend
cd backend
mkdir -p certs
cd certs
mkcert localhost 127.0.0.1 ::1

# Générer les certificats pour le frontend
cd ../../frontend
mkdir -p certs
cd certs
mkcert localhost 127.0.0.1 ::1
```

### 3. Configuration des variables d'environnement

Créer un fichier `.env` dans le dossier `backend/` :

```env
NODE_ENV=development
DATABASE_URL=postgresql://secureapp:secureapp@db:5432/secureapp
JWT_SECRET=mon_secret_jwt_super_long_et_complexe
JWT_EXPIRATION=15m
REFRESH_EXPIRATION=7d
FRONTEND_URL=https://localhost:4200
```

## 💻 Utilisation

### Mode développement

```bash
# Lancer tous les services
docker-compose -f docker-compose.dev.yml up

# Ou en arrière-plan
docker-compose -f docker-compose.dev.yml up -d
```

Les services seront accessibles à :
- **Frontend** : http://localhost:4200
- **Backend API** : https://localhost:4000
- **Adminer** : http://localhost:8080
- **PostgreSQL** : localhost:5432

### Mode production

```bash
# Lancer tous les services
docker-compose -f docker-compose.prod.yml up -d
```

Les services seront accessibles à :
- **Frontend** : http://localhost:8080
- **Backend API** : https://localhost:4000
- **Adminer** : http://localhost:8081
- **PostgreSQL** : localhost:5432

### Arrêter les services

```bash
# Mode développement
docker-compose -f docker-compose.dev.yml down

# Mode production
docker-compose -f docker-compose.prod.yml down

# Supprimer également les volumes (données)
docker-compose -f docker-compose.dev.yml down -v
```

### Développement local (sans Docker)

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## 📡 API Endpoints

### Authentification (`/api/auth`)

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| POST | `/api/auth/register` | Inscription d'un nouvel utilisateur | Non |
| POST | `/api/auth/login` | Connexion utilisateur | Non |
| POST | `/api/auth/logout` | Déconnexion utilisateur | Non |
| POST | `/api/auth/refresh` | Renouvellement du token d'accès | Oui (Refresh Token) |
| GET | `/api/auth/whoami` | Informations sur l'utilisateur connecté | Oui |

### Utilisateurs (`/api/users`)

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| GET | `/api/users` | Liste de tous les utilisateurs | Oui (Admin) |
| GET | `/api/users/:id` | Détails d'un utilisateur | Oui |
| GET | `/api/users/me` | Profil de l'utilisateur connecté | Oui |
| POST | `/api/users` | Créer un nouvel utilisateur | Oui (Admin) |
| PUT | `/api/users/:id` | Modifier un utilisateur | Oui (Admin) |
| DELETE | `/api/users/:id` | Supprimer un utilisateur | Oui (Admin) |

### Public (`/api/public`)

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| GET | `/api/public/health` | Vérifier l'état du serveur | Non |

### Exemples de requêtes

#### Inscription

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "login": "johndoe",
    "password": "monMotDePasse123"
  }'
```

#### Connexion

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "johndoe",
    "password": "monMotDePasse123"
  }' \
  -c cookies.txt
```

#### Obtenir la liste des utilisateurs (avec cookies)

```bash
curl -X GET http://localhost:4000/api/users \
  -b cookies.txt
```

## 🔒 Sécurité

### Mesures de sécurité implémentées

#### Backend

1. **Authentification JWT**
   - Access Token (durée de vie : 15 minutes)
   - Refresh Token (durée de vie : 7 jours)
   - Stockage sécurisé dans des cookies HttpOnly

2. **Cookies sécurisés**
   - `HttpOnly` : Protection contre les attaques XSS
   - `Secure` : Transmission uniquement via HTTPS
   - `SameSite: strict` : Protection contre CSRF

3. **En-têtes de sécurité HTTP**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: no-referrer`
   - `Cross-Origin-Resource-Policy: same-origin`
   - `Cross-Origin-Opener-Policy: same-origin`
   - `Cross-Origin-Embedder-Policy: require-corp`

4. **Protection de la base de données**
   - Prepared statements (protection contre SQL injection)
   - Hashage des mots de passe avec bcrypt (10 rounds)
   - Pas d'exposition des password_hash dans les API

5. **CORS**
   - Configuration stricte des origines autorisées
   - Credentials activés uniquement pour les origines de confiance

#### Frontend

1. **Communication sécurisée**
   - Requêtes HTTPS uniquement
   - Intercepteurs pour gérer les tokens automatiquement

2. **Gestion des erreurs**
   - Pas d'exposition des détails techniques
   - Redirection automatique en cas d'authentification expirée

### Compte administrateur par défaut

Au premier démarrage, un compte administrateur est automatiquement créé :
- **Login** : `admin`
- **Mot de passe** : `admin123`

⚠️ **Important** : Modifiez ce mot de passe immédiatement après la première connexion !

## 📁 Structure du projet

```
secure_app/
├── backend/                    # API Node.js/Express
│   ├── src/
│   │   ├── config/            # Configuration (env, etc.)
│   │   ├── db/                # Connexion base de données
│   │   │   └── init.sql       # Script d'initialisation DB
│   │   ├── middleware/        # Middlewares (auth, tokens)
│   │   ├── routes/            # Routes API
│   │   │   ├── auth.ts        # Routes d'authentification
│   │   │   ├── users.ts       # Routes utilisateurs
│   │   │   └── public.ts      # Routes publiques
│   │   ├── types/             # Types TypeScript
│   │   ├── server.ts          # Point d'entrée du serveur
│   │   └── initAdmin.ts       # Création admin par défaut
│   ├── certs/                 # Certificats SSL
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/         # Module admin
│   │   │   ├── home-component/ # Page d'accueil
│   │   │   ├── users/         # Module utilisateurs
│   │   │   ├── shared/        # Services partagés
│   │   │   │   ├── auth/      # Service d'authentification
│   │   │   │   └── interceptors/ # Intercepteurs HTTP
│   │   │   └── types/         # Types TypeScript
│   │   ├── environments/      # Configurations d'environnement
│   │   └── main.ts
│   ├── certs/                 # Certificats SSL
│   ├── Dockerfile
│   ├── nginx.conf             # Configuration Nginx
│   ├── angular.json
│   └── package.json
│
├── docker-compose.dev.yml     # Configuration Docker développement
├── docker-compose.prod.yml    # Configuration Docker production
└── README.md                  # Ce fichier
```

## 🧪 Tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence ISC.

## 👤 Auteur

**Andrea Antoniali**

## 🙏 Remerciements

- Angular et Node.js communities
- Les contributeurs de toutes les dépendances utilisées
- mkcert pour la génération facile de certificats SSL locaux
