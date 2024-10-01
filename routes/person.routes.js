const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { jwtAuthMiddleware, generateToken } = require('../jwt')

// POST /person (Add a new person)
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('Person saved');

    const token = generateToken(response.toObject());  // Generate token with person data
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /person (Fetch all persons)
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Persons fetched');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /person/:workType (Fetch persons by work type)
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;

    if (['chef', 'manager', 'waiter'].includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log("Persons with work type fetched");
      res.status(200).json(response);  // Use 200 for success
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /person/:id (Update a person's data)
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: 'Person Not Found' });
    }

    console.log('Data Updated');
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Invalid Update' });
  }
});

// DELETE /person/:id (Delete a person)
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: 'Person Not Found' });
    }

    console.log("Data Deleted");
    res.status(200).json({ message: 'Person Deleted Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Invalid Deletion' });
  }
});

module.exports = router;
