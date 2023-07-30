const mentorsModel = require('../models/mentors.model.js'); // Importing mentors model
const studentsModel = require('../models/students.model.js'); // Importing students model

// Task-1 (create a mentor)
exports.createMentor = async (req, res) => {
    try{
        const payload = req.body;
        
        // Checking whether the mentor is already created with this name
        const mentorExisting = await mentorsModel.findOne({name : payload.name});

        if(mentorExisting){
            // If mentor is already created with this name----return message
            return res.status(401).send({message : `A mentor with the name ${mentorExisting.name} is already created. Please select some other name.`});
        }else{
            // If mentor is not yet created with this name----create a new mentor
            const newMentor = new mentorsModel(payload);
            await newMentor.save()
            .then((result) => {
                res.status(200).send({message: "Mentor is created successfully.", data: result});
            })
            .catch((err) => {
                res.status(400).send({message: "Failed to create a mentor.", error: err.message});
            })
        }

    }catch(error){
        res.status(500).send({message: "Internal server error.", error: error.message});
    }
}



// Task-3 (assign a student to mentor)
exports.assignStudentToMentor = async (req, res) => {
    try{
        const payload = req.body;
        let isExistingMentor = false;
        let mentorData = {};

        // Checking whether the mentor is existing or not
        await mentorsModel.findOne({_id : req.params.mentorID})
        .then((mentorDoc) => {
            isExistingMentor = true; 
            // If existing----taking the mentor data
            mentorData = mentorDoc;  
        })
        .catch(err => {
            // If mentor does not exist----return message
            return res.status(400).send({message: `The mentor with id ${req.params.mentorID} does not exist.`, error : err.message})
        })

        
        if(isExistingMentor){
            // If the mentor is existing
            
            const mentorName = mentorData.name;
            // List of students entered in the post call to assign to this mentor
            const studentsSelected = payload.mentoringStudents; 
            
            // Getting all students data in the DB
            const allStudentsData = await studentsModel.find();
            
            // Checking whether any of the students entered are already having mentors
            const studentsAlreadyHavingMentor = [];
            for(let stud of studentsSelected){
                const studData = allStudentsData.filter( doc => doc.name == stud)[0];
                const isStudHas_NO_Mentor = studData.mentor == ""; // True if the student does not have mentor
                if( ! isStudHas_NO_Mentor){
                    // If the student already has a mentor
                    studentsAlreadyHavingMentor.push(stud);
                }       
            }
    

            if(studentsAlreadyHavingMentor.length !== 0){
                // If any of the students' names entered already have mentors----return message
                return res.status(401).send({message: `The students ${studentsAlreadyHavingMentor} already have mentors. Please change the mentoringStudents array given by you in the body of post call.`})
            }
    
            // If NONE of the students' names entered have mentors----add this mentor to those students
            for(let stud of studentsSelected){
                await studentsModel.findOneAndUpdate({name : stud}, {$set : {mentor : mentorName}});
            }
    
            // Concatenate the new students to the students array of this mentor
            const newStudentsForTheMentor = mentorData.mentoringStudents.concat(studentsSelected);
    
            // Update the data of this mentor
            await mentorsModel.findOneAndUpdate({_id : req.params.mentorID}, {$set : {mentoringStudents : newStudentsForTheMentor}})
            .then((result) => {
                res.status(200).send({message: `The mentoring students list of ${mentorName} has been updated successfully.`});
            })
            .catch((err) => {
                res.status(400).send({message: `Failed to update the mentoring students list of ${mentorName}.`, error: err.message});
            })
        }
        

    }catch(error){
        res.status(500).send({message: "Internal server error.", error: error.message});
    }
}



// Task-4 (show students of a particular mentor)
exports.showAllStudentsOfParticularMentor = async (req, res) => {
    try{
        await mentorsModel.findOne({_id : req.params.mentorID})
        .then((result) => {
            res.status(200).send({message: `The students list of ${result.name} is obtained successfully.`, data: result.mentoringStudents});
        })
        .catch((err) => {
            res.status(400).send({message: `The mentor with id ${req.params.mentorID} does not exist.`, error: err.message});
        })

    }catch(error){
        res.status(500).send({message: "Internal server error.", error: error.message});
    }
}


