const studentsModel = require('../models/students.model.js'); // Importing students model
const mentorsModel = require("../models/mentors.model.js"); // Importing mentors model

// Task-2 (create a student)
exports.createStudent = async (req, res) => {
    try{
        const payload = req.body;
        
        // Checking whether the student is already created with this name
        const studentExisting = await studentsModel.findOne({name : payload.name});

        if(studentExisting){
            // If student is already created with this name----return message
            res.status(401).send({message : `Student with the name ${studentExisting.name} is already created. Please provide different name.`})
        }else{
            // If student is not yet created with this name----create a new student
            const newStudent = new studentsModel(payload);
            await newStudent.save()
            .then((result) => {
                res.status(200).send({message: "Student is created successfully.", data: result});
            })
            .catch((err) => {
                res.status(400).send({message: "Failed to create student.", error: err.message});

            })
        }

    }catch(error){
        res.status(500).send({message: "Internal server error.", error: error.message});
    }
}



// Task-4 (assign or change mentor for particular students)
exports.assignOrChangeMentorForStudent = async (req, res) => {
    try{
        const payload = req.body;
        const selectedMentor = payload.mentor;

        let isExistingStudent = false;
        let studData = {}

        // Checking whether the student is existing or not
        await studentsModel.findOne({_id : req.params.studentID})
        .then((studDoc) => {
            isExistingStudent = true;
            // If existing----taking the student data
            studData = studDoc;
        }) 
        .catch((err) => {
            // If student does not exist----return message
            return res.status(400).send({message: `The student with id ${req.params.studentID} does not exist.`, error: err.message});
        })


        if(isExistingStudent){
            // If the student is existing

            const studentName = studData.name;
            // Array of previously assigned mentors (if any) for this student
            const previousMentors = studData.previousMentors;
            
            // Getting data of the selected mentor (supplied in the post call)
            const dataOfSelectedMentor = await mentorsModel.findOne({name : selectedMentor});
            // The students array that the selected mentor already mentoring
            const studentsOfSelectedMentor = dataOfSelectedMentor.mentoringStudents;
            

            if(studData.mentor === ""){  
                // If the student currently has NO mentor
                if( ! studentsOfSelectedMentor.includes(studentName) ){
                    // If this student is not in the "mentoringStudents" field of the selected (new) mentor
                    studentsOfSelectedMentor.push(studentName);
                    // Updating the "mentoringStudents" field of the selectedMentor with this student
                    await mentorsModel.findOneAndUpdate({name : selectedMentor}, {$set : {mentoringStudents : studentsOfSelectedMentor}});
                }

                // Updating the "mentor" field of this student
                await studentsModel.findOneAndUpdate({_id : req.params.studentID}, {$set : {mentor : selectedMentor}})
                    .then((result) => {
                        res.status(200).send({message: `For ${studentName}, the mentor is added/updated successfully.`})
                    })
                    .catch((err) => {
                        res.status(400).send({message: `Failed to add/update mentor for ${studentName}.`, error: err.message})  
                    })

            }else{    
                // If the student currently has some mentor        
                const mentorToBeRemoved = studData.mentor; // Mentor to be removed from the "mentor" field of this student

                if(mentorToBeRemoved == selectedMentor){
                    // If the current mentor and the new selected mentor for this student are same
                    return res.status(403).send({message: `${studentName} already has ${selectedMentor} as current mentor. No need to update.`});   
                    
                }else{
                    // If the current mentor and the new selected mentor for this student are different
                    // Push the current mentor into the "previousMentors" field of this student
                    previousMentors.push(mentorToBeRemoved);
                    
                    // Updating the data by removing this student from the "mentoringStudents" field of the current mentor
                    const dataOfMentorToBeRemoved = await mentorsModel.findOne({name : mentorToBeRemoved});
                    const studentsOfMentorToBeRemoved = dataOfMentorToBeRemoved.mentoringStudents;
                    const newStudentsOfMentorToBeRemoved = studentsOfMentorToBeRemoved.filter(val => val !== studentName);

                    await mentorsModel.findOneAndUpdate({name : mentorToBeRemoved}, {$set : {mentoringStudents : newStudentsOfMentorToBeRemoved}});


                    if( ! studentsOfSelectedMentor.includes(studentName) ){
                        // If this student is not in the "mentoringStudents" field of the selected (new) mentor
                        studentsOfSelectedMentor.push(studentName);
        
                        // Updating the "mentoringStudents" field of the selectedMentor with this student
                        await mentorsModel.findOneAndUpdate({name : selectedMentor}, {$set : {mentoringStudents : studentsOfSelectedMentor}});
                    }

                    // Updating the "mentor" field of this student
                    await studentsModel.findOneAndUpdate({_id : req.params.studentID}, {$set : {previousMentors : previousMentors, mentor : selectedMentor} })
                    .then((result) => {
                        res.status(200).send({message: `For ${studentName}, the mentor is updated successfully.`});
                    })
                    .catch((err) => {
                        res.status(400).send({message: `Failed to update mentor for ${studentName}.`, error: err.message});
                    })
                }
            }

        }

    }catch(error){
        res.status(500).send({message: "Internal server error.", error: error.message});
    }
}



// Task-6 (show previously assigned mentors list for particular student (not current mentor))
exports.previouslyAssignedMentorsListOfParticularStudent = async (req, res) => {
    try{

        await studentsModel.findOne({_id : req.params.studentID})
        .then((result) => {
            res.status(200).send({message: `The previous mentors list for ${result.name} is obtained successfully.`, data: result.previousMentors});
        })
        .catch((err) => {
            res.status(400).send({message: `The student with id ${req.params.studentID} does not exist.`, error: err.message});
        })
    }catch(error){
        res.status(500).send({message: "Internal server error.", error: error.message});
    }
}



// Task-6 (show previously assigned mentor for particular student--------If it is asked to show the current mentor)
exports.currentMentorOfStudent = async (req, res) => {
    try{

        await studentsModel.findOne({_id : req.params.studentID})
        .then((result) => {
            res.status(200).send({message: `The current mentor of ${result.name} is obtained successfully.`, data: result.mentor});
        })
        .catch((err) => {
            res.status(400).send({message: `The student with id ${req.params.studentID} does not exist.`, error: err.message});
        })

    }catch(error){
        res.status(500).send({message: "Internal server error.", error: error.message});
    }
}

