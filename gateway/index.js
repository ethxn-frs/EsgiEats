const express = require('express');
const apiController = require('./controllers/apiController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', apiController);

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
