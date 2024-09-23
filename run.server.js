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

// POST /person (Add a new person)
app.post('/person', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('Person saved');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

// GET /person (Fetch all persons)
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Persons fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/person/:workType',async(req, res) =>{
  try {
    const workType = req.params.workType;

    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      
      const response = await Person.find({work: workType});

      console.log("response fetched");

      res.status(300).json(response);
    }else{
      res.status(404).json({error: 'Invalid work type'});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
