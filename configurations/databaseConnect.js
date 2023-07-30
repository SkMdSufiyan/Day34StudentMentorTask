const mongoose = require('mongoose');

// Function for establishing connection with mongoDB database
const database = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB connection established");

    }catch(error){
        console.log("Error : ", error.message);
    }
}

module.exports = database;