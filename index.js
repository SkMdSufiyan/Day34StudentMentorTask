const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Using the dotenv config() method

const mentorsRoutes = require('./routes/mentors.routes.js'); // Importing mentor routes
const studentsRoutes = require('./routes/students.routes.js'); // Importing student routes

const database = require('./configurations/databaseConnect.js'); // Importing database


const app = express(); // Initialising express app
app.use(express.json());

database(); // calling the database() function which establishes the mongoDB database connection

// For welcome message
app.get('/', (req, res) => {
    res.status(200).send("Welcome to student-mentor management app. You can add or update the student-mentor assignments-----Only after creating the students and mentors. While creating student or mentor, you can not do the assignment.---------student-1---to---student-7 and mentor-1---to---mentor-3 are already created.");
});

// Using the routes
app.use('/api', mentorsRoutes);
app.use('/api', studentsRoutes);



// Listening to the app
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})