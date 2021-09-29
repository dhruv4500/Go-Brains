import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./BottomTabNavigator";
import Sums from "../screens/Sums";
import EditProfile from '../screens/EditProfile'; 
import CreateSum from '../screens/CreateSums';
import StudentDashboard from '../screens/StudentDashboard';
import AdimSums from '../screens/adminSums';
import EditQuestions from '../screens/editQuestion';

const Stack = createStackNavigator();

const StackNavigator =() => {

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={TabNavigator}/>
      <Stack.Screen name="Sums" component={Sums} />
      <Stack.Screen name="Edit_Profile" component={EditProfile} />
      <Stack.Screen name="CreateSum" component={CreateSum} />
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="AdminSums" component={AdimSums} />
      <Stack.Screen name="Edit" component={EditQuestions} />
    </Stack.Navigator>
  );
  
};

export default StackNavigator;
