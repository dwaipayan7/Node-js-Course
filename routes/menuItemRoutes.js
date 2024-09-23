const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


// POST /menuitem (Add a new menu item)
router.post('/menuitems', async (req, res) => {
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
  router.get('/menuitems', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("Menu items fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  module.exports = router;