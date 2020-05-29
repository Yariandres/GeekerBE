const express = require('express');
const connectDB = require('./config/db.js');

const app = express();

// Connects to DB server
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

/*
  DEFINE ROUTES
*/
app.use('/api/dev', require('./routes/api/devs'));
app.use('/api/auth', require('./routes/api/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
