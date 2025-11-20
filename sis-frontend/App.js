import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StudentListScreen from './screens/StudentListScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import StudentDetailsScreen from './screens/StudentDetailsScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={StudentListScreen} options={{ title: 'Student Directory' }} />
        <Stack.Screen name="Add" component={AddStudentScreen} options={{ title: 'Add New Student' }} />
        <Stack.Screen name="Details" component={StudentDetailsScreen} options={{ title: 'Student Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}