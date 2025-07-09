const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const restaurants = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/restaurants.json'))
);

router.get('/', (req, res) => {
    const list = restaurants.map(({id, name, cuisine}) => ({id, name, cuisine}));
    res.json(list);
});

router.get('/:id/menu', (req, res) => {
    const restaurant = restaurants.find(r => r.id === req.params.id);
    if (!restaurant) return res.status(404).json({error: 'Restaurant not found'});
    res.json({menu: restaurant.menu});
});

router.post('/:id/orders', (req, res) => {
    const restaurant = restaurants.find(r => r.id === req.params.id);
    if (!restaurant) return res.status(404).json({error: 'Restaurant not found'});

    const accepted = Math.random() > 0.2;
    console.log(`Order at ${req.params.id}: ${accepted ? 'ACCEPTED' : 'REJECTED'}`);
    res.status(200).json({accepted});
});

module.exports = router;