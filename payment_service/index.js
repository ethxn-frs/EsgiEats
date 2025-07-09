const express = require('express');
const paymentController = require('./controllers/paymentController');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/payment', paymentController);

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});