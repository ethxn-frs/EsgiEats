const express = require('express');
const deliveryController = require('./controllers/deliveryController');

const app = express();
const PORT = 3003;

app.use(express.json());
app.use('/delivery', deliveryController);

app.listen(PORT, () => {
    console.log(`Delivery Service running on port ${PORT}`);
});
