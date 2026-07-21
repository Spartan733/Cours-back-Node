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