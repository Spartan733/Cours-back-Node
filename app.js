const express = require('express')
const app = express()
const port = 3000
//Pour pouvoir utiliser les variables d'environements
// Ne pas oublier d'installer dotenv: `npm install dotenv`
// Ensuite pour utiliser : process.env.NOM_DE_VARIABLE_DANS_ENV
require('dotenv').config()
require('./config/db')

//Import des routes
const productsRoutes = require('./routes/productsRoutes')
const authRoutes = require('./routes/authRoutes')


// Exemple 2

app.use(express.json())


// Monte le routeur sur le chemin de base
app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API RESTfull !')
})

app.listen(port, () => {
    console.log(`Serveur démaré sur http://localhost:${port}`)
})

