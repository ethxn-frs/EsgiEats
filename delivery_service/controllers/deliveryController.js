const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const {orderId, clientId} = req.body;
    console.log(`Starting delivery for order ${orderId}, client ${clientId}`);

    const deliveryPerson = {
        id: Math.floor(Math.random() * 1000),
        name: 'Mock Deliverer'
    };

    console.log(`Delivery person assigned:`, deliveryPerson);

    res.status(200).json({
        status: 'assigned',
        deliveryPerson
    });
});

module.exports = router;
