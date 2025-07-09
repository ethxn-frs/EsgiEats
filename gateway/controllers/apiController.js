const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/order', async (req, res) => {
    try {
        const response = await axios.post('http://order_service:3001/order', req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        console.error('Error forwarding order:', err.message);
        if (err.response && err.response.data) {
            return res.status(err.response.status).json(err.response.data);
        }

        res.status(500).json({error: 'Gateway error'});
    }
});

router.get('/restaurants', async (req, res) => {
    try {
        const response = await axios.get('http://restaurant_service:3004/restaurants');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch restaurants'});
    }
});

router.get('/restaurants/:id/menu', async (req, res) => {
    try {
        const response = await axios.get(`http://restaurant_service:3004/restaurants/${req.params.id}/menu`);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch menu'});
    }
});

module.exports = router;
