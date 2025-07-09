# 🍽️ ESGIEats – Microservices Prototype

> Projet réalisé dans le cadre du cours **Architecture | Micro Service**

---

## Présentation

**ESGIEats** est une plateforme de livraison de repas développée en architecture microservices.  
Elle permet à un client de :

- Consulter des restaurants et leurs menus
- Passer une commande
- Obtenir une validation par le restaurant (ou un refus simulé)
- Procéder à un paiement simulé (avec échecs aléatoires)
- Déclencher une livraison simulée

---

## Architecture

| Microservice         | Description                                                 |
|----------------------|-------------------------------------------------------------|
| `gateway`            | Point d’entrée de l’application                             |
| `order_service`      | Orchestration du processus de commande (SAGA)               |
| `payment_service`    | Simule un paiement (20% de chance d’échec)                  |
| `delivery_service`   | Simule une livraison avec assignation                       |
| `restaurant_service` | Gère les restaurants, menus, acceptation/rejet de commandes |

Chaque service est une app Express.js indépendante, conteneurisée avec Docker.

---

## Données & Mock

Les données utilisées sont **mockées** via un fichier `restaurants.json` contenant :

- 10 restaurants
- 10 plats par restaurant
- Des IDs globaux uniques pour tous les items

Aucune base de données réelle n’est utilisée. Tout est en mémoire.

---

## Lancer le projet

```bash
docker-compose up --build
```

### Ports exposés

| Service            | URL                   |
|--------------------|-----------------------|
| API Gateway        | http://localhost:3000 |
| Order Service      | http://localhost:3001 |
| Payment Service    | http://localhost:3002 |
| Delivery Service   | http://localhost:3003 |
| Restaurant Service | http://localhost:3004 |

---

## Endpoints principaux (via Gateway)

### ➤ Lister les restaurants

```
GET /api/restaurants
```

### ➤ Consulter le menu d’un restaurant

```
GET /api/restaurants/:id/menu
```

### ➤ Passer une commande

```
POST /api/order
Content-Type: application/json
Body:
{
  "clientId": "123",
  "restaurantId": "2",
  "items": [12, 13] // IDs des plats du menu
}
```

### Exemple de réponse (succès)

```json
{
  "orderId": 27,
  "status": "in_delivery",
  "message": "Order paid and delivery started",
  "total": 17.5,
  "items": [
    {
      "id": 12,
      "name": "Classic Pizza",
      "price": 9.5
    },
    {
      "id": 13,
      "name": "Tiramisu",
      "price": 8.0
    }
  ]
}
```

---

## ⚠️ Cas simulés pris en charge

- ❌ Restaurant inexistant → 404
- ❌ Plats inexistants → 400
- ❌ Restaurant qui refuse la commande → 400
- ❌ Paiement échoué → 500
- ✅ Livraison OK → 200

---

## Structure du projet

```
/gateway
/order_service
/payment_service
/delivery_service
/restaurant_service
/data/restaurants.json
docker-compose.yml
README.md
```

---

## Réalisé par

- Ethan FRANCOIS | Hector ADJAKPA
