const express = require('express');
const connectDB = require('./config/db');
const app = express();

const port = 5000;

// Connect to database
connectDB();

// Enable JSON parsing
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json('Frontend connected to backend'));

// Define API Routes
app.use('/api/test', require('./routes/api/test'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/teams', require('./routes/api/teams.js'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
