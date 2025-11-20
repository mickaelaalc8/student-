// sis-frontend/screens/StudentDetailsScreen.js

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { updateStudent, deleteStudentBySid } from '../sis-frontend/studentApi' // Import PUT and DELETE

const StudentDetailsScreen = ({ route, navigation }) => {
    // Student object passed from StudentListScreen
    const { student } = route.params; 
    
    // STATE: Controls whether the screen shows data or editable fields
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(student);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const payload = { ...formData, yearLevel: Number(formData.yearLevel) };

            // Use the internal Mongoose ID for the PUT request
            await updateStudent(student._id, payload);

            Alert.alert('Success', 'Student information updated successfully.', [
                { text: 'OK', onPress: () => {
                    setIsEditing(false);
                    navigation.goBack(); // Go back to refresh list
                }}
            ]);
        } catch (error) {
            Alert.alert('Update Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to delete ${student.firstName} ${student.lastName}?`,
            [{ text: "Cancel", style: "cancel" },
             { text: "Delete", style: "destructive", onPress: confirmDelete }
            ]
        );
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            // Use the studentId (business key) for the DELETE request
            await deleteStudentBySid(student.studentId);
            Alert.alert('Deleted', 'Student successfully removed.', [
                { text: 'OK', onPress: () => navigation.goBack() } 
            ]);
        } catch (error) {
            Alert.alert('Deletion Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    // React Navigation Hook to place the Edit button in the header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    onPress={() => setIsEditing(!isEditing)} 
                    style={{ marginRight: 15 }}
                >
                    <Icon 
                        name={isEditing ? 'x' : 'edit'} 
                        type='feather' 
                        color='#007AFF' 
                        size={24} 
                    />
                </TouchableOpacity>
            ),
            title: isEditing ? 'Edit Student' : `${student.firstName} ${student.lastName}`
        });
    }, [navigation, isEditing, student.firstName, student.lastName]);

    const InfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}:</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {!isEditing ? (
                // VIEW MODE
                <View>
                    <InfoRow label="Student ID" value={student.studentId} />
                    <InfoRow label="First Name" value={student.firstName} />
                    <InfoRow label="Last Name" value={student.lastName} />
                    <InfoRow label="Email" value={student.email} />
                    <InfoRow label="Course" value={student.course} />
                    <InfoRow label="Year Level" value={student.yearLevel} />
                    <InfoRow label="Section" value={student.section} />
                    <InfoRow label="Enrolled Since" value={new Date(student.createdAt).toLocaleDateString()} />

                    {/* DANGER ZONE for Deletion */}
                    <View style={styles.dangerZone}>
                        <Button 
                            title="Delete Student" 
                            onPress={handleDelete} 
                            loading={loading}
                            buttonStyle={{ backgroundColor: 'red' }} 
                        />
                    </View>
                </View>
            ) : (
                // EDIT MODE
                <View>
                    <Input label="Student ID" value={formData.studentId} onChangeText={(t) => handleChange('studentId', t)} />
                    <Input label="First Name" value={formData.firstName} onChangeText={(t) => handleChange('firstName', t)} />
                    <Input label="Last Name" value={formData.lastName} onChangeText={(t) => handleChange('lastName', t)} />
                    <Input label="Email" value={formData.email} onChangeText={(t) => handleChange('email', t)} keyboardType="email-address" />
                    <Input label="Course" value={formData.course} onChangeText={(t) => handleChange('course', t)} />
                    <Input label="Year Level" value={formData.yearLevel.toString()} onChangeText={(t) => handleChange('yearLevel', t)} keyboardType="numeric" maxLength={1} />
                    <Input label="Section" value={formData.section} onChangeText={(t) => handleChange('section', t)} />
                    
                    <Button 
                        title="Save Changes" 
                        onPress={handleUpdate} 
                        loading={loading}
                        containerStyle={styles.buttonContainer} 
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    infoRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    infoLabel: { fontWeight: 'bold', width: 120, color: '#555' },
    infoValue: { flex: 1, color: '#333' },
    buttonContainer: { marginTop: 20, marginBottom: 10 },
    dangerZone: { marginTop: 40, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'red' },
});

export default StudentDetailsScreen;