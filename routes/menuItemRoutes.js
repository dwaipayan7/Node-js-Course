const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// POST /menuitems (Add a new menu item)
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

// GET /menuitems/:taste (Fetch menu items by taste)
router.get('/menuitems/:taste', async (req, res) => {
  try {
    const taste = req.params.taste;

    // Validate the taste parameter
    if (['sweet', 'spicy', 'sour'].includes(taste)) {
      const response = await MenuItem.find({ taste });
      console.log('Menu items fetched by taste:', taste);
      res.status(200).json(response);
    } else {
      // Return 400 for bad request if taste is invalid
      res.status(400).json({ error: 'Invalid taste. Please use sweet, spicy, or sour.' });
    }
  } catch (error) {
    console.error('Error fetching menu items by taste:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
