const express = require('express');
const connectDB = require('./config/db.js');

const app = express();

// Connects to DB server
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
