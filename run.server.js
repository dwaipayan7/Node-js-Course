const express = require("express");

const app = express();

const db = require("./db");

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON body

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

// Root route
app.get("/", function (req, res) {
  res.send("Welcome to my Hotel");
});



const menuItem = require('./routes/menuItemRoutes.js');
app.use('/', menuItem); 

const personRoutes = require('./routes/person.routes.js');
app.use('/', personRoutes);


// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
