# secure_app_antoniali

> test_for_backend — Application backend TypeScript pour tests et démonstrations.
> Utilisation pour le front d'Angular 

[![Repo](https://img.shields.io/badge/repo-AndreaAntoniali/secure_app_antoniali-blue)](https://github.com/AndreaAntoniali/secure_app_antoniali)

## À propos
secure_app_antoniali est un projet backend de test/démonstration. Le dépôt contient principalement du TypeScript et JavaScript et inclut une configuration Docker. Ce README donne des instructions générales pour installer, configurer, développer et déployer l'application localement.

Si tu souhaites que j'adapte ce README au contenu exact du dépôt (scripts npm, endpoints, exemples concrets), donne-moi le fichier `package.json` ou dis-moi quelles commandes sont présentes.

## Technologies :
Le projet utilise principalement :
- Angular pour la logique métier et le backend -> typescritp
- SCSS pour parties frontales éventuelles
- Docker (Dockerfile présent)

## Prérequis
- Node.js 18+ (recommandé) ou la version utilisée par le projet
- npm >= 8 (ou yarn / pnpm selon préférence)
- Git
- Docker (optionnel, si tu veux exécuter l'application en conteneur)

## Installation

1. Cloner le dépôt
```bash
git clone https://github.com/AndreaAntoniali/secure_app_antoniali.git
cd secure_app_antoniali
```
2. Utilisation de docker

   Construction des containeurs en mode production 
```bash
docker compose -f docker-compose.prod.yml up --build
```
```bash

docker compose -f docker-compose.prod.yml up 
```
##Accès 
Frontend ⟶ https://localhost:8080
Backend ⟶ https://localhost:4000/api/public
adminer ⟶   http://localhost:8081


##Secrets et certificats : 
Les secrets sont restés en clairs pour la simplicité d'implémentation et d'utilisation. 
Bien entendu, ce n'est pas ce qui devrait être fait dans une véritable application. 

## Auteurs
- Andrea Antoniali — auteur / mainteneur

  Code du backend en très grande partie rédigée par C. Fioro. 

(Contact: voir profil GitHub)

## Remerciements
Merci pour l'intérêt porté à ce projet. Pour que je personnalise davantage ce README (exemples d'API, endpoints, scripts exacts, badges CI, instructions de déploiement spécifiques), fournis :
- le contenu de package.json
- un fichier .env.example
- quelques endpoints (routes) ou le fichier d'entrée (ex. src/index.ts)
