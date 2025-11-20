// /routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createStudent, 
    getAllStudents, 
    getStudentBySid,
    searchStudents,
    getStudentsByCourse,
    getStudentsByYearLevel,
    getStudentsBySection,
    updateStudent, 
    deleteStudent,
    deleteStudentBySid
} = require('../controllers/studentController');

// Standard CRUD routes
router.route('/')
    .get(getAllStudents)        // GET /api/students
    .post(createStudent);       // POST /api/students

// Specific GET and DELETE routes using the business key (studentId)
router.route('/sid/:studentId')
    .get(getStudentBySid)      // GET /api/students/sid/:studentId (By Student ID)
    .delete(deleteStudentBySid); // DELETE /api/students/sid/:studentId

// Specific search and filter routes
router.get('/search', searchStudents);          // GET /api/students/search?q=...
router.get('/course/:courseName', getStudentsByCourse);    
router.get('/level/:yearLevel', getStudentsByYearLevel);   
router.get('/section/:sectionName', getStudentsBySection); 

// Internal Mongoose ID-based routes (for PUT/PATCH/DELETE)
router.route('/:id')
    .put(updateStudent)         // PUT /api/students/:id 
    .patch(updateStudent)       // PATCH /api/students/:id 
    .delete(deleteStudent);     // DELETE /api/students/:id


module.exports = router;