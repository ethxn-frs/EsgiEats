const express = require('express');
const orderController = require('./controllers/orderController');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/order', orderController);

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});