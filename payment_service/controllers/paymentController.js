const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const {orderId, amount} = req.body;
    console.log(`Payment request received for order ${orderId}, amount: €${amount}`);

    const success = Math.random() > 0.2;

    if (success) {
        console.log(`Payment approved for order ${orderId}`);
        res.status(200).json({status: 'success'});
    } else {
        console.log(`Payment failed for order ${orderId}`);
        res.status(200).json({status: 'failed'});
    }
});

module.exports = router;
