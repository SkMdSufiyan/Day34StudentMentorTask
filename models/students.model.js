const mongoose = require('mongoose');

// Defining schema for student
const studentSchema = new mongoose.Schema({
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
    batch : {
        type : String,
        required : true,
        trim : true
    },
    subject : {
        type : String,
        trim : true,
        default : ""
    },
    mentor : {
        type : String,
        trim : true,
        default : ""
    },
    previousMentors : {
        type : Array,
        default : []
    }
});

// Creating and exporting students model
module.exports = mongoose.model("Students", studentSchema);