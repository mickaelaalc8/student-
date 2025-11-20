// sis-frontend/screens/AddStudentScreen.js

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text as RNText } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createStudent } from '../sis-frontend/studentApi'; // Import the POST function

const AddStudentScreen = ({ navigation }) => {
    // 1. STATE: Initialize state with the fields from your Student Schema
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', studentId: '', course: '', yearLevel: '', section: '', email: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Convert yearLevel to number as required by your Mongoose schema
            const payload = {
                ...formData,
                yearLevel: Number(formData.yearLevel) 
            };
            
            await createStudent(payload);
            
            Alert.alert('Success', 'Student added successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() } // Navigate back to list
            ]);
        } catch (error) {
            // Display specific error message returned by your backend (e.g., Duplicate ID)
            Alert.alert('Submission Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text h4 style={styles.header}>Enter New Student Details</Text>
            
            {/* Input fields matching the schema */}
            <Input label="First Name" value={formData.firstName} onChangeText={(t) => handleChange('firstName', t)} />
            <Input label="Last Name" value={formData.lastName} onChangeText={(t) => handleChange('lastName', t)} />
            <Input label="Student ID" value={formData.studentId} onChangeText={(t) => handleChange('studentId', t)} keyboardType="default" />
            <Input label="Email" value={formData.email} onChangeText={(t) => handleChange('email', t)} keyboardType="email-address" />
            <Input label="Course" value={formData.course} onChangeText={(t) => handleChange('course', t)} />
            <Input label="Year Level (1-5)" value={formData.yearLevel} onChangeText={(t) => handleChange('yearLevel', t)} keyboardType="numeric" maxLength={1} />
            <Input label="Section" value={formData.section} onChangeText={(t) => handleChange('section', t)} />

            <Button 
                title="Save Student" 
                onPress={handleSubmit} 
                loading={loading}
                disabled={loading}
                containerStyle={styles.buttonContainer} 
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { marginBottom: 20, textAlign: 'center', color: '#333' },
    buttonContainer: { marginTop: 30 },
});

export default AddStudentScreen;