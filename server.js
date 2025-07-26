<<<<<<< HEAD
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('📝 Your To-Do List app is now running!');
    console.log('⛔ Press Ctrl+C to stop the server');
});
=======
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('📝 Your To-Do List app is now running!');
    console.log('⛔ Press Ctrl+C to stop the server');
});
>>>>>>> eb83fff6f4c11d2c13e6e8e216e532c0b78c5b60
