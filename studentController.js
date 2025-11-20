// /controllers/studentController.js
const Student = require('../models/Student');

// Helper to wrap Mongoose functions and catch errors centrally
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Helper for Consistent JSON Responses
const formatResponse = (res, statusCode, success, data, message) => {
    res.status(statusCode).json({ success, message, data });
};

// POST /api/students
exports.createStudent = asyncHandler(async (req, res, next) => {
    const student = await Student.create(req.body);
    formatResponse(res, 201, true, student, 'Student added successfully.');
});

// GET /api/students
exports.getAllStudents = asyncHandler(async (req, res, next) => {
    const students = await Student.find({});
    formatResponse(res, 200, true, students, 'Students retrieved successfully.');
});

// GET /api/students/sid/:studentId (Retrieve by Student ID)
exports.getStudentBySid = asyncHandler(async (req, res, next) => {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) {
        return formatResponse(res, 404, false, null, `Student with ID ${req.params.studentId} not found.`);
    }
    formatResponse(res, 200, true, student, 'Student retrieved successfully by Student ID.');
});

// GET /api/students/course/:courseName
exports.getStudentsByCourse = asyncHandler(async (req, res, next) => {
    const students = await Student.find({ course: req.params.courseName });
    formatResponse(res, 200, true, students, `Found ${students.length} students enrolled.`);
});

// GET /api/students/level/:yearLevel
exports.getStudentsByYearLevel = asyncHandler(async (req, res, next) => {
    const students = await Student.find({ yearLevel: req.params.yearLevel });
    formatResponse(res, 200, true, students, `Found ${students.length} students in Year ${req.params.yearLevel}.`);
});

// GET /api/students/section/:sectionName
exports.getStudentsBySection = asyncHandler(async (req, res, next) => {
    const students = await Student.find({ section: req.params.sectionName });
    formatResponse(res, 200, true, students, `Found ${students.length} students in section ${req.params.sectionName}.`);
});

// GET /api/students/search?q=...
exports.searchStudents = asyncHandler(async (req, res, next) => {
    const query = req.query.q;
    if (!query) {
         return formatResponse(res, 400, false, null, 'Search query (q) is required.');
    }
    const students = await Student.find({
        $or: [
            { firstName: { $regex: query, $options: 'i' } }, 
            { lastName: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
        ]
    });
    formatResponse(res, 200, true, students, `Found ${students.length} matching students.`);
});

// PUT /api/students/:id & PATCH /api/students/:id (Update by Mongoose ID)
exports.updateStudent = asyncHandler(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true,
    });

    if (!student) {
        return formatResponse(res, 404, false, null, 'Student not found.');
    }
    formatResponse(res, 200, true, student, 'Student information updated successfully.');
});

// DELETE /api/students/sid/:studentId (Delete by Student ID)
exports.deleteStudentBySid = asyncHandler(async (req, res, next) => {
    const student = await Student.findOneAndDelete({ studentId: req.params.studentId });
    
    if (!student) {
        return formatResponse(res, 404, false, null, `Student with ID ${req.params.studentId} not found.`);
    }
    formatResponse(res, 200, true, student, `Student with ID ${req.params.studentId} successfully removed.`);
});

// DELETE /api/students/:id (Delete by Mongoose ID - for completeness)
exports.deleteStudent = asyncHandler(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
        return formatResponse(res, 404, false, null, 'Student not found.');
    }
    formatResponse(res, 200, true, student, 'Student successfully removed by internal ID.');
});