const express = require('express');
// Importing customised functions from "students.controller.js" file
const {createStudent, assignOrChangeMentorForStudent, previouslyAssignedMentorsListOfParticularStudent, currentMentorOfStudent} = require('../controllers/students.controller.js');


const studentsRouter = express.Router(); // Intialising an express router

// For Task-2 (create a student)
studentsRouter.post('/createStudent', createStudent);
// For Task-4 (assign or change mentor for particular student)
studentsRouter.post('/assignChangeMentor/:studentID', assignOrChangeMentorForStudent);
// For Task-6 (previously assigned mentors list-----NOT current mentor)
studentsRouter.get('/previousMentorsList/:studentID', previouslyAssignedMentorsListOfParticularStudent);
// For Task-6 (previously assigned mentor---------if it is asked for current mentor)
studentsRouter.get('/currentMentor/:studentID', currentMentorOfStudent);

module.exports = studentsRouter;