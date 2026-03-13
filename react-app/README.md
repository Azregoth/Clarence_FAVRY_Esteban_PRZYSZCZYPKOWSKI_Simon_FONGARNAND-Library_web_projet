# 🎨 Library Manager Pro - Interface (Front-end)

Ce projet constitue l'interface utilisateur de l'application **Library Manager Pro**. Il a été conçu avec une architecture stricte pour garantir la maintenabilité, l'évolutivité et une expérience utilisateur fluide.

## 🛠️ Stack Technique

* **Framework Core** : React + Vite + TypeScript
* **UI Library** : [Ant Design (v5)](https://ant.design/) pour des composants d'interface professionnels et responsives.
* **Routing** : `@tanstack/react-router` pour un routage 100% Type-Safe.
* **Requêtes HTTP** : `axios`

## 🏛️ Architecture (Domain-Driven Design)

Pour éviter l'éparpillement du code (fichiers de types, d'API et de composants mélangés), le projet utilise une architecture orientée domaine (DDD). 

Chaque entité métier (`authors/`, `books/`, `clients/`, `sales/`) possède son propre dossier isolé contenant :
* `components/` : Les composants visuels (Listes, Modales, Détails).
* `pages/` : Les vues principales associées aux routes.
* `providers/` : Les Hooks personnalisés (ex: `useBookProvider`) qui encapsulent les appels Axios et la gestion des états (chargement, données, erreurs).
* `[Domain]Model.tsx` : Les contrats d'interface TypeScript garantissant l'intégrité des données.

## 🚀 Installation et Lancement

1. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

2. Lancer le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

L'application sera accessible sur `http://localhost:5173`.
*Attention : Assurez-vous que l'API NestJS (`nest-api`) tourne en parallèle sur le port 3000 pour que les données s'affichent correctement.*