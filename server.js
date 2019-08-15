const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

app.use(cors());

const port = 5000;

// Connect to database
connectDB();

// Enable JSON parsing
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json('Frontend connected to backend'));

// Define API Routes
app.use('/api/test', require('./routes/api/test'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/location', require('./routes/api/location'));
app.use('/api/hashtag', require('./routes/api/hashtag'));
app.use('/api/event', require('./routes/api/event'));
app.use('/api/team', require('./routes/api/team'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/twitter', require('./routes/api/twitter'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
