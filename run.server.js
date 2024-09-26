const express = require("express");

const app = express();

const db = require("./db"); // Assuming you have a proper database connection file

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON body

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()} Request Made to ${req.originalUrl}]`);
  next();
};

// Root route (commented out but can be used as fallback)
// app.get("/", function (req, res) {
//   res.send("Welcome to my Hotel");
// });

// Person and MenuItem models
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

// Use logRequest middleware for all routes
app.use(logRequest);

// Route for testing the root '/' route
app.get('/', function (req, res) {
  res.send("Welcome to my Hotel");
});

// Menu item routes (handling menu-related endpoints)

const menuItem = require('./routes/menuItemRoutes.js');
app.use('/', menuItem); 

const personRoutes = require('./routes/person.routes.js');
app.use('/', personRoutes); //logRequest

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
