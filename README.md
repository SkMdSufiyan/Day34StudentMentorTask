# Day34StudentMentorTask

Here it is assumed that student names as well as the mentor names are unique. Therefore used the names (also) for filtering at some portions of code.   

For checking this task code in POSTMAN, the following urls paths needs to be used  
   
---------------------------For Task-1 (create mentor) POST call   
URL is ---------> https://day34studentmentortask.onrender.com/api/createMentor   
BODY is ----> {
    "name" : "mentor-3",
    "email" : "mentor-3-email@gmail.com"
}   
   
--------------------------For Task-2 (create student) POST call   
URL is ---------> https://day34studentmentortask.onrender.com/api/createStudent   
BODY is -------> {
    "name" : "student-7",
    "email" : "student-7-email@gmail.com",
    "batch" : "batch-3"
}   
   
--------------------------For Task-3 (assign student for particular metor) POST call with params   
URL is ---------> https://day34studentmentortask.onrender.com/api/assignStudentToMentor/:mentorID   
BODY is---------> {
    "mentoringStudents" : ["student-6"]
}   
   
--------------------------For Task-4 (add or change mentor for particular student) POST call with params   
URL is ---------> https://day34studentmentortask.onrender.com/api/assignChangeMentor/:studentID   
BODY is --------> {
    "mentor" : "mentor-3"
}   
   
--------------------------For Task-5 (get all students of particular mentor) GET call with params   
URL is ---------> https://day34studentmentortask.onrender.com/api/studentsOfMentor/:mentorID   
   
   
--------------------------For Task-6 GET calls with params   
--------------------------Get all previously assigned mentors list for particular student   
URL is ---------> https://day34studentmentortask.onrender.com/api/previousMentorsList/:studentID   
   
--------------------------Get the current mentor for particular student   
URL is ---------> https://day34studentmentortask.onrender.com/api/currentMentor/:studentID   





