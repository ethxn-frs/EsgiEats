const express = require('express');
const router = express.Router();
const sagaService = require('../services/sagaService');
const orders = [];

router.post('/', async (req, res) => {
    const order = {
        id: orders.length + 1,
        clientId: req.body.clientId,
        restaurantId: req.body.restaurantId,
        items: req.body.items,
        total: req.body.total,
        status: 'pending'
    };

    console.log(`New order received:`, order);

    orders.push(order);

    try {
        const result = await sagaService.processOrder(order);
        order.status = result.status;
        res.status(result.statusCode).json({
            orderId: order.id,
            message: result.message,
            status: order.status,
            total: result.total,
            items: result.items
        });
    } catch (error) {
        console.error('SAGA failed:', error.message);
        order.status = 'failed';
        res.status(500).json({
            orderId: order.id,
            status: 'failed',
            error: error.message
        });
    }
});

module.exports = router;
