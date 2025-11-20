// sis-frontend/screens/StudentListScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { getAllStudents, searchStudents } from '../services/StudentApi';

// ... (include the rest of the functional component code, styles, and rendering logic)