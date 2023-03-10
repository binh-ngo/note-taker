// Dependencies
const express = require("express");

// Initialize
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes/routes')(app);

// Listener
app.listen(PORT, () => 
    console.log(`Listening on PORT:  + ${PORT}! 🏎️`)
);