# MindBox - Journal Personnel Sécurisé

## Auteur

**Michel Ange Tamgho Fogue**

## Description

MindBox est une application web sécurisée permettant aux utilisateurs de créer un compte, se connecter et écrire leurs pensées personnelles dans un espace journal protégé. L'application met en œuvre les meilleures pratiques de sécurisation d'une API et d'un site web moderne.

## Fonctionnalités

- 🔐 Authentification sécurisée avec JWT
- 📝 Journal personnel privé
- 🔒 Protection des routes
- 🛡️ Sécurité renforcée avec Helmet et CORS
- 📊 Base de données MongoDB
- 🎨 Interface utilisateur moderne avec Pug et Boostrap

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

## Installation

1. Cloner le repository

```bash
git clone [URL_DU_REPO]
cd journal-express-js
```

2. Installer les dépendances

```bash
npm install
```

3. Configurer les variables d'environnement
   Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mindbox
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=development
```

4. Démarrer l'application

```bash
npm run dev
```

## Structure du Projet

```
mindbox/
│
├── views/                # Templates Pug
│   ├── layout.pug
│   ├── register.pug
│   ├── login.pug
│   ├── journal.pug
│   └── error.pug
│
├── models/              # Schémas Mongoose
│   ├── User.js
│   └── JournalEntry.js
|   └── db_connect.js    # Connection à la base de données
│
├── middleware/          # Middlewares
│   ├── auth.js
│   ├── corsOtions.js
│   └── logger.js
│   ├── logger.js
│   └── logout.js
│   ├── register.js
│   └── signJWT.js
│   └── verifyJWT.js
│
├── routers/            # Routes
│   ├── auth.js
│   ├── journal.js
│   ├── register.js
│   └── logout.js
│
├── public/             # Fichiers statiques
│   └── style.css
│
├── .env               # Variables d'environnement
├── index.js          # Point d'entrée
└── package.json
```

## Routes Disponibles

### Routes Publiques

- `GET /` - Redirection vers login ou journal
- `GET /register` - Page d'inscription
- `POST /register` - Traitement de l'inscription
- `GET /auth` - Page de connexion
- `POST /auth` - Traitement de la connexion

### Routes Protégées

- `GET /journal` - Affichage du journal
- `POST /journal` - Ajout d'une entrée
- `GET /logout` - Déconnexion

## Sécurité

- Authentification par JWT stocké dans un cookie httpOnly
- Hachage des mots de passe avec bcrypt
- Protection contre les attaques XSS avec Helmet
- Limitation du taux de requêtes
- Validation des entrées utilisateur
- Protection CORS

## Technologies Utilisées

- Node.js
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Pug pour les templates
- bcrypt pour le hachage
- Helmet pour la sécurité
- CORS pour la sécurité des ressources

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT.

## Contact

Michel Ange Tamgho Fogue : angeltamgho87@gmail.com
