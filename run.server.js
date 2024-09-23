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


// POST /menuitem (Add a new menu item)
app.post('/menuitem', async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    console.log("Menu item saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /menuitems (Fetch all menu items)
app.get('/menuitem', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu items fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const personRoutes = require('./routes/person.routes.js');
app.use('/', personRoutes);


// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
