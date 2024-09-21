const express = require("express");

const app = express();

const db = require("./db");

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body

const Person = require('./models/Person');



app.get("/", function (req, res) {
  res.send("Welcome to my Hotel");
});

app.post('/person', (req, res)=>{

  const data = res.body;

  const newPerson = new Person(data); //prefilled with database

  newPerson.sava((error, savedPerson) =>{
    if (error) {
      console.log('Error Saving Person', error);
      res.status(500).json({error: 'Internal server Error'});

    }else{
      console.log("Data saved Successfully");
      res.status(200).json(savedPerson);
    }
  });

  // newPerson.name = data.name;
  // newPerson.age = data.age;
  // newPerson.mobile = data.mobile;
  // newPerson.email = data.email;
  // newPerson.address = data.address;


});

// app.get("/tatay", function (req, res) {
//   res.send("Dwaipayan ");
// });

// app.post('/items', (req, res) =>{

//   res.send("Data is Saved");

// });

// app.get("/idli", (req, res) => {
//   var customised_idli = {
//     name: "rava idli",
//     size: "10 CM",
//     is_Sambar: true,
//     is_chutney: false
//   };

//   res.send(customised_idli);
// });

app.listen(3000, () => {
  console.log("Server is listening in 3000 ");
});
