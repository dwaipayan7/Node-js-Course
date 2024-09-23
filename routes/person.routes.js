const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST /person (Add a new person)
router.post('/person', async (req, res) => {
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
  

  // GET /person (Fetch all persons)
  router.get('/person', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('Persons fetched');
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



  router.get('/person/:workType',async(req, res) =>{
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
  });


  module.exports = router;