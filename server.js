const express = require('express');
const connectDB = require('./config/db.js');

const app = express();

// Connects to DB server
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

/*
DEFINE ROUTES
*/
app.use('/api/dev', require('./routes/api/devs'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
