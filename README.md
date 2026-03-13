# 📚 Library Manager Pro - M1 S2 2026

Bienvenue sur **Library Manager Pro**, une application web complète de gestion de bibliothèque développée dans le cadre du projet universitaire de Master 1.

Ce projet met en œuvre une architecture **Domain-Driven Design (DDD)** stricte, séparant proprement le Back-end (API REST) et le Front-end (Interface Utilisateur), pour une maintenabilité et une évolutivité optimales.

---

## ✨ Fonctionnalités Principales

Le système est divisé en 4 domaines métiers distincts :

- **📖 Gestion des Livres** : Catalogue complet (titre, année, couverture, auteur) avec fonctionnalités de création, édition, suppression, et enregistrement direct des ventes.
- **✍️ Gestion des Auteurs** : Répertoire des écrivains avec statistiques dynamiques (nombre de livres écrits, moyenne des ventes par livre).
- **👥 Gestion des Clients** : Base de lecteurs avec suivi de l'historique d'achats individuel.
- **💰 Gestion des Ventes** : Historique globalisé des transactions avec possibilité d'annulation.

---

## 🛠️ Stack Technique

L'application respecte un cahier des charges technique strict :

### Back-end
- **Framework** : NestJS (TypeScript)
- **Base de données** : SQLite
- **ORM** : TypeORM avec modèle Active Record
- **Architecture** : Séparation Controller > Service > Repository
- **Typage** : Branded Types stricts pour les IDs

### Front-end
- **Framework** : React + Vite (TypeScript)
- **UI / Composants** : Ant Design (Tableaux, Modales, Formulaires)
- **Routage** : @tanstack/react-router (Type-safe routing)
- **Architecture** : Par domaines métiers (`/books`, `/authors`, `/clients`, `/sales`) avec utilisation de Providers.
- **Requêtes HTTP** : Axios

---

## 🚀 Installation et Lancement

Pour faire tourner le projet en local sur votre machine, suivez ces étapes :

### 1. Cloner le repository
\`\`\`bash
git clone https://github.com/Azregoth/Clarence_FAVRY_Esteban_PRZYSZCZYPKOWSKI_Simon_FONGARNAND-Library_web_projet
cd Library_web_project
\`\`\`

### 2. Lancer le Back-end (API)
Ouvrez un terminal dans le dossier `nest-api` :
\`\`\`bash
cd nest-api
npm install
npm run start:dev
\`\`\`
*L'API tournera sur `http://localhost:3000`.*

### 3. Lancer le Front-end (Application)
Ouvrez un nouveau terminal dans le dossier `react-app` :
\`\`\`bash
cd react-app
npm install
npm run dev
\`\`\`
*L'interface web sera accessible sur `http://localhost:5173`.*

---

## 🏛️ Choix d'Architecture (Front-end)

Nous avons opté pour une approche **Domain-Driven**, regroupant par dossiers les éléments métiers. Exemple de structure pour un domaine :
- `components/` : Éléments d'interface (Listes, Détails, Modales).
- `pages/` : Vues principales mappées sur les routes.
- `providers/` : Hooks personnalisés encapsulant les appels Axios et la gestion des états.
- `[Domain]Model.tsx` : Typage TypeScript strict des données du domaine.

Cette approche garantit une base de code propre, zéro `any`, et sans erreurs ESLint.

---

## 👨‍💻 Auteurs (Groupe)

- **Clarence FAVRY****
- **Esteban PRZYSZCZYPKOWSKI**
- **Simon FONGARNAND**

*Projet réalisé pour le cours de M. Gérald Gallet.*
