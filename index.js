require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const routes = require('./route');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api', routes);

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// For all other requests, return the React index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
