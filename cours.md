# API RestFul avec Node.js et Express

## 1. Qu'est ce que qu'une API ?

Une API ( Application Programming Interface) est ensemble de règles qui permet a deux logiciels de communiquer entre eux. Elle définit **comment** un client peut demander des données ou des actions à un serveur, et **comment** ce dernier doit répondre.

**Analogie du restaurant :**
Le client ne va pas en cuisine préparer son plat. Il passe commande auprès du serveur (l'API), qui transmet la demande à la cuisine (le backend) et rapporte le plat (la réponse).

Dans le développement web, l'Api est le pont entre le front-end (ce que voit l'utilisateur) et le back-end (la base de données, la logique métier).

## 2. Qu'est ce que Rest ?

REST(*REpresentational State Transfer*) est un style d'architecture défini par Roy Fielding en 2000. Ce n'est **pas** une technologie ni un protocle, mais un ensemble de principes a respecter pour concevoir une API cohérente et scalable.

### Les 6 contraintes REST

| # | Contrainte | En résumé |
|---|-----------|-----------|
| 1 | Client-serveur| Le front et le back sont séparés et évoluent indépendament |
| 2 | Sans état (*stateless*) | Chaque requete contient toutes les infos nécessaires ; le seveur ne mémorise rien entre deuxrequétes |
| 3 | Cacheable | Les réponses indiquent si elles peuvent etres mises en cache |
| 4 | Interface uniforme | Les ressources sont identifiées par des URI, manipulées via des représentations (JSON...) |
| 5 | Système en couches | Le client ignore s'il parle au serveur final ou a un proxy/load balancer |
| 6 | Code à la demande *(optionnel)* | Le serveur peut envoyer du code au client exécutable au client |

### Une API RESTfull, concrétement

* Une **ressource** = une entité métier (un produit, un utilisateur...), identifiée par une URI.
* On nomme les URI avec des **noms**, jamais de verbes :
    * ✅ `GET /api/products`
    * ❌ `GET/api/getAllProducts`
* Les actions (créer/lire/modifier/supprimer) sont portées par le **verbe HTTP**, pas par l'URI

| Verbe HTP | Action CRUD | Exemple |
|-----------|-------------|---------|
| GET | Read | `GET /api/products/123` |
| POST | Creat | `POST /api/products` |
| PUT | Update (remplacement complet) | `PUT /api/products/123` |
| PATCH | Update (modification partielle) | `PATCH /api/products/123` |
| DELETE | Delete | `DELETE /api/products/123` |

### Codes de statut HTP à connaitre

* **2xx - Succès** : `200 OK`, `201 Create`, `204 No Content`
* **4xx - Erreur Client** : `400 Bad Request`, `401 Unauthorized`, `404 Forbidden` `404 Not Found`
* **5xx - Erreur Serveur** : `500 Internal Serveur Error`

---

## 3. Node.js et Express.js

### Node.js
Un environnement d'execution JavaScript coté serveur base sur le moteur V8 de Chrome. Il permet d'utiliser le meme langage (js) sur le front et le back, et gère efficacement de nombreuses connexions simultanées grâce a son modele asynchrone non bloquant.

### Express.js
un framework web minimaliste pour Node.js. Il facilite :
* La définition de routes HTTP,
* L'utilisation de middlewares,
* La connexion à une base de données,
* L'envoie de réponses (JSON, HTML,...)

---

## 4. Mettre en place un seveur Express

### Etape 1 - Initialiser le projet
```bash
npm init -y
```

### Etape 2 - Installer Express
```bash
npm install express # où
npm i expres
```

### Etape 3 - Créer le fichier `app.js`
```javascript
const express = require('express')
const app = express()
cont port = 3000

//      URL
app.get('/'? (req, res) => {
    res.send('Bienvenue sur mon API RESTfull !')
})

app.listen(port, () => {
    // Ce console log s'affiche uniquement coté SERVEUR et non coté CLIENT
    console.log(`Serveur démarré sur http://localhost:${port}`)
})
```


### Etape 4 - Lancer le serveur
```bash
node app.js # où
nodemon app.js
```

Pour lancer le serveur avec nodemon, vous devez l'installer avec `npm instal -g nodemon`.
Lancer le serveur avec nodemon permet de recharger automatiquelebt e serveur a chaque changement de vos fichiers, un peu comme fait l'extension Live Server.
Vous pouvez ouvrir `http://localhost:3000` dans le navigateur.

### Organiser le code avec `express.Router()`
Pour ne pas tout entasser dans `app.js`, on sépare les routes par ressourrce :

```javascript
// routes/users.js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json([
        {
            id: 1,
            name: "Lucas"
        }
        {
            id: 2,
            name: "Gabriel"
        }
    ])
})

router.get('/:id', (req,res) => {
    res.send(`Détail de l'utilisateur : ${req.params.id}`)
})

//Trés important pour pouvoir l'utiliser
module.exports = router
```

```javascript
// app.js
const userRoutes = require('./routes/users.js')
app.use('/api/v1/users', userRoutes)

### Architecture recommander (MVC simplifié)

```

mon-api/
├── app.js
├── routes/         → définit les endpoints, dirige vers les contrôleurs
├── controllers/    → logique métier, prépare la réponse
├── middlewares/    → s'exécute avant la route finale
└── models/         → schéma des données, interaction avec la BDD


## 5. Les middlewares

Un middlewares est une fonction qui à accès à `req`, `res`, et à `next()`. Elle s'éxecute **avant** que la requete n'atteigne sa route finale, et peut :
* lire ou modifier `req` et `res`,
* arretter la requete en renvoyant une réponse,
* ou la laisser continuer en appeleant `next()`.

Avec les middlewares vous pouvez tester l'authentification, faire une middleware de gestion d'erreurs, de log, etc.

Les middlewares s'executent **dans l'ordre où ils sont déclarés** avec `app.use()`.


### Exemple 1 - Middlewares de journalisation
```javascript
const express = require('express')
const app = express()

//Middleware global : s'applique à toutes les requêtes
app.use((req, res, nextx) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next() // indispensable : passe la main a la suite
})

app.get('/', req, res) => {
    res.send('Accueil')
}

app.listen(3000)
```


### Exemple 2 - Middlewares intégrés à Express (parsing du body)
```javascript
app.use(express.json()) //parse les requetes JSON
app.use(express.urlcoded({extend: true}))   //parse les formulaires classiques

app.post('/data', (req, res) => {
    console.log(req.body) // accessible uniquement grâce au middleware ci dessous
    res.send('Données reçues')
})
```

### Exemple 3 - Middleware d'authentification simple (sur une route précise)
Un middleware peut etre global (`app.use`) ou appliquer à une seul route, en le passant comme argument avant le handler final :

```javascript
function checkToken(req, res, next) {
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'Accès refusé: token manquant'})
    }

    // On intègre la logique de vérification du token
    next() // token_valide, on continue vers la route
}

// Au niveau de la route concernée
// On applique le midleware à une route spécifique
router.delete('/:id', checkToken, productController.deleteProduct)
```
**Point clé:** si `next()` n'est jamais appelé (et qu'aucune réponse n'est envoyée), la requete reste bloqué indéfiniment coté client.
