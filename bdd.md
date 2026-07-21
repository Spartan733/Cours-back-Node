# Le principe de Modèle
Les modèles sont des représentation des données de votre application et de la logique métier associée. Ils sont responsable de l'interaction avec la base de données (création,lecture, mise a jour, suppression des donées) et de la validation des données. Dans une application Node avec Mo,goDB, Mongoose est couramment utilisé pour définir les schémas de données et interagir avec la n=base de données, agissant ainsi come la couche modèle.

**Exxemple de modèle avec Mongoose :**
/!\ ATTENTION : Pour utiliser Mongoose, il faut l'installer avec `npm install mongoose`

```javascript
//models/productModel.js
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: Date.now
    },
    
})

module.exports = mongoose.model('Product', prodcutSchema)
```

# Manipulation de BDD avec MongoDB et Mongoose
## Introduction à MongoDB
MongoDB est une base de données NoSQL (Not Only SQL) orientée document, ce qui signifie qu'elle stocke les données sous forme de documents BSON (Binary JSON) avec des schémas flexibles.
Contrairement aux base de données relationnelles traditionelles qui utilisent des tables et des lignes, MongoDB utilise des cillections et des documents. Cette flexibilité en fait un excellent choix pour les applications qui necessitent une evolutivité rapide et la gestion de données non structurée ou semi_structuré.

**Concepts clés de MongoDB :**
* **Document :** L'unité de base de données dans MongoDB. un document est un ensemble de paires clé-valeur, similaire a un objet JSON. Les documents peuvent avoir des structures différentes au sein de la meme collection.
* **Collection :** Un groupe de documents. L'equivalent d'une table dans une base de données relationnelle. Une collection ne force pas de schéma stricte sur ses documents.
* **Base de données :** Un conteneur pour les collections. Un serveur MongoDB peut héberger plusieurs bas de données.


**Avantages de MongoDB**
* **Flexibilité des schémas :** Permet de stocker des documents avec des structures différentes dans la même collection, ce qui facilite l'évolution des applications.
* **Haute performance :** Conçu pour la vitesse et l'evolutivité, capable de gérer de grands volumes de données et de requetes.
* **Scalabilité horizontale :** Facile a mettre a l echelle en distribuant les données sur plusieurs serveurs (sharding).
* **Richesse des requetes :** Supporte des requetes complexes, l'indexation et l'agregation de données.

/!\ Comme avec MySQL, vous pouvez utiliser MongoDB soit en local, soit depuis un hébergeur ATLAS (site MongoDB).

## Introduction a Mongoose
Mongoose est une bibliothèque ODM (Object Data Modeling) pour MongoDB et Node. Elle fournit une solution basée sur des schémas pour modéliser les données de votre application, fournit une validation de schéma et est largement utilisé pour la modélisation d'objets MongoDB dans une environnement asynchrone.

**Pourquoi utiliser Mongoose ?**
* **Validation de schéma :** Mongoose vous permet de définir des schémas pour vos documents, garantissant que les données stockées dans MongoDB respectent une structure définie et des règles de validation.
* **Modélisation des donées :** Facilite la création de modèles JavaScript qui correspondent à vos collections MongoDB, permettant d'intéragir avec la base de données en utilisant des objets JavaScript.
* **Middlewares :** Permet d'executer des fonctions avant ou apres certaines opérations de base de données (par exemple avant de sauvegarder un doculent).

## Connexion a MongoDB avec Mongoose
Pour connexter votre application Node à une base de données MongoDB en utilisant Mongoose, vous devez d'abord installer Mongoose :
```bash
npm install mongoose
```

Ensuite, dans votre fichier `app.js` (ou un fichier de configuration de base de données séparé):
```javascript
//app.js ou /config/db.js
const mongoose = require('mongoose')

//const dbURI = "mongosb+srv://DONNEES_DE_MONGODB"
const dbURI = "mongodb+srv://..."
// const dbURI = "mongodb+srv://<NomUtilisateur>:<MotDePasse>@<Serveur>/?appName=<NomDuCluster>"

mongoose.connect(dbURI)
    .then(() => console.log("Connexion à MongoDB reussie !"))
    .catch(err => console.log("Erreur de connexin  a MonoDB :", err))

//Si vous n'intégrer pas le code dans app.js, on fait l'export
module.exports = mongoose.connection

//Dans app.js, juste avant le premier app.use, integrer avec :
// require('./config/db')
// Si votre fichier s'appelle db.js et se trouve dans le dossier config
```