const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST /person (Add a new person)
router.post('/', async (req, res) => { //person
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
  router.get('/', async (req, res) => { //person
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


  router.put('/person/:id', async (req, res) =>{

    try {

      const personId = req.params.id;
      const updatePersonData = req.body;

      const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
        new: true,
        runValidators: true
      });


      if (!response) {
        return res.status(400).json({error:'Person Not Found'});
      }


      console.log('Data Updated');
      res.status(200).json(response);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Invalid Updation'});
    }

  });


  router.delete('/person/:id', async(req, res)=>{

    try {

      const personId = req.params.id;
      const response = await Person.findByIdAndDelete(personId);

      if (!response) {
        return res.status(400).json({error:'Person Not Found'});
      }

      console.log("Data Deleted");
      res.status(200).json({message: 'Person Deleted Successfully'});


    } catch (error) {
      
      console.log(error);
      res.status(500).json({error: 'Invalid Deletion'});

    }

  });




  module.exports = router;