const express = require("express");
const app = express();
const db = require("./db"); 
const passport = require('./auth.js');
const MenuItem = require('./models/MenuItem');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()} Request Made to ${req.originalUrl}]`);
  next();
};


// Use logRequest middleware for all routes
app.use(logRequest);

// Route for testing the root '/' route

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',localAuthMiddleware,  function (req, res) {
  res.send("Welcome to my Hotel");
});

// Menu item routes (handling menu-related endpoints)
const menuItem = require('./routes/menuItemRoutes.js');
app.use('/menuitems',menuItem); 

const personRoutes = require('./routes/person.routes.js');
app.use('/person',localAuthMiddleware, personRoutes); 

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
