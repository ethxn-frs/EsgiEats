const express = require('express');
const restaurantController = require('./controllers/restaurantController');

const app = express();
const PORT = 3004;

app.use(express.json());
app.use('/restaurants', restaurantController);

app.listen(PORT, () => {
    console.log(`Restaurant Service running on port ${PORT}`);
});
