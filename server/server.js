const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err));

app.get('/', (req, res) => {
    res.send('Server connected successfully!'); 
});

const axios = require('axios');
app.post('/predict', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/predict', req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
