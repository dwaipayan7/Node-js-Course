const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';


mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

//default connection object representation
const db = mongoose.connection;

//define event listeners for database connection

db.on('connected', () =>{
    console.log('Connected to MongoDB server');
});

db.on('error', () =>{
    console.log('MongoDB server error');
});


db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});

//export database connection

module.exports = db;

