// sis-frontend/services/StudentApi.js
// 🚨 IMPORTANT: Change this IP based on your emulator/device!
const API_BASE_URL = 'http://localhost:3000/api/students';

const handleResponse = async (response) => {
    // ... (include the helper function code from previous steps)
};

export const getAllStudents = () => {s
    return fetch(API_BASE_URL).then(handleResponse);
};

export const createStudent = (studentData) => {
    // ... (include the fetch POST request code)
};

// ... (include functions for searchStudents, updateStudent, deleteStudentBySid)