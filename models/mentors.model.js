const mongoose = require('mongoose');

// Defining schema for mentor
const mentorSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true       
    },
    subject : {
        type : String,
        trim : true,
        default : ""
    },
    mentoringStudents : {
        type : Array,
        default : []
    }
});

// Creating and exporting model mentors model
module.exports = mongoose.model("Mentors", mentorSchema);
