const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    age:{
        type:Number
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username: {

        require: true,
        type: String
    },
    password: {
        require: true,
        type:String
    }
});


//Create Model

const Person = mongoose.model('Person',personSchema);
module.exports = Person;