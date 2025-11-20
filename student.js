// /models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    studentId: { // This is your unique business identifier
        type: String,
        required: true,
        unique: true,
        trim: true,
        // Unique property already creates a standard index, but explicit clarity doesn't hurt
        index: true 
    },
    course: { 
        type: String, 
        required: true, 
        trim: true,
        index: true // <-- ADDED: Crucial for getStudentsByCourse
    },
    yearLevel: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5,
        index: true // <-- ADDED: Crucial for getStudentsByYearLevel
    },
    section: { 
        type: String, 
        required: true, 
        trim: true,
        index: true // <-- ADDED: Crucial for getStudentsBySection
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true,
        index: true // <-- ADDED: For fast lookups and Text Index (below)
    }
}, { timestamps: true });

// 🎯 ADD THIS: Compound Text Index for the searchStudents endpoint
// This will greatly speed up the fuzzy searching on names and email.
studentSchema.index({ 
    firstName: 'text', 
    lastName: 'text', 
    email: 'text' 
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;