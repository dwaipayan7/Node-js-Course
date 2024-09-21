const express = require("express");

const app = express();

const db = require("./db");

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body

const Person = require('./models/Person');



app.get("/", function (req, res) {
  res.send("Welcome to my Hotel");
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
