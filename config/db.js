//app.js ou /config/db.js
const mongoose = require('mongoose')

//const dbURI = "mongosb+srv://DONNEES_DE_MONGODB"
const dbURI = process.env.MONGODB_URI
// const dbURI = "mongodb+srv://<NomUtilisateur>:<MotDePasse>@<Serveur>/?appName=<NomDuCluster>"


mongoose.connect(dbURI)
    .then(() => console.log("Connexion à MongoDB reussie !"))
    .catch(err => console.log("Erreur de connexin  a MongoDB :", err))

//Si vous n'intégrer pas le code dans app.js, on fait l'export
module.exports = mongoose.connection