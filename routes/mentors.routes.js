const express = require('express');
// Importing the customized functions from mentors.controller.js file
const {createMentor, assignStudentToMentor, showAllStudentsOfParticularMentor} = require('../controllers/mentors.controller.js');

// Intialising an express router
const mentorsRouter = express.Router();

// For Task-1 (create a mentor)
mentorsRouter.post('/createMentor', createMentor);
// For Task-3 (assign a student to mentor)
mentorsRouter.post('/assignStudentToMentor/:mentorID', assignStudentToMentor);
// For Task-5 (show all students for particular mentor)
mentorsRouter.get('/studentsOfMentor/:mentorID', showAllStudentsOfParticularMentor);


module.exports = mentorsRouter;