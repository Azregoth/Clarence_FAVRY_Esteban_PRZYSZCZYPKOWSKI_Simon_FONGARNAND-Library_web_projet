# ⚙️ Library Manager Pro - API REST (Back-end)

Ce projet constitue l'API Back-end de l'application **Library Manager Pro**, développée dans le cadre du projet de Master 1. 
Il expose les routes RESTful nécessaires à la gestion de la bibliothèque et assure la persistance des données.

## 🛠️ Stack Technique

* **Framework** : [NestJS](https://nestjs.com/) (TypeScript)
* **Base de données** : SQLite (légère et parfaite pour le développement local)
* **ORM** : TypeORM
* **Validation** : `class-validator` et `class-transformer` (DTOs stricts)

## 🏛️ Architecture

L'API respecte une architecture modulaire classique de NestJS :
* **Controllers** : Définition des routes HTTP (GET, POST, PATCH, DELETE).
* **Services** : Logique métier et validation.
* **Entities / Repositories** : Définition des tables de la base de données via TypeORM.

Une attention particulière a été portée au typage fort avec l'utilisation de **Branded Types** (ex: `BookId`, `ClientId`) pour éviter toute confusion entre les différents identifiants UUID.

## 🚀 Installation et Lancement

1. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

2. Lancer le serveur en mode développement :
\`\`\`bash
npm run start:dev
\`\`\`

L'API sera accessible sur `http://localhost:3000`. 
*Note : La base de données SQLite (`db.sqlite`) sera générée automatiquement à la racine de ce dossier lors du premier lancement grâce à la synchronisation TypeORM.*