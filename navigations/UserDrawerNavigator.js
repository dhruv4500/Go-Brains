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

import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from '../screens/Logout';
import StudentDashboard from '../screens/StudentDashboard';

const Drawer = createDrawerNavigator();

const UserDrawerNavigator=()=> {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackNavigator}/>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Student Dashboard" component={StudentDashboard}/>
     <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
  
};


export default UserDrawerNavigator;