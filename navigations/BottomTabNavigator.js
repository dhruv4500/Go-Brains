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
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

import Leaderboard from "../screens/Leaderboard";
import Home from "../screens/Home";
const Tab = createMaterialBottomTabNavigator();
import firebase from 'firebase';
import StudentDashboard from '../screens/StudentDashboard';

class BottomTabNavigator extends Component {
  constructor(){
    super();
    this.state={
      user:false
    }
  }
  componentDidMount(){
    this.fetchUserData();
  }
  render(){
    if(this.state.user){
   return(
          <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "StudentDashboard") {
            iconName = focused ? "copy" : "copy-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        }
      })}
      activeColor={"#5dfcf7"}
      inactiveColor={"white"}
    >
      
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="StudentDashboard" component={StudentDashboard} />
    </Tab.Navigator>
  ) }else{
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        }
      })}
      activeColor={"#5dfcf7"}
      inactiveColor={"white"}
    >
      
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
    </Tab.Navigator>
  );}
  }
   async fetchUserData() {
    var theme;
    var user;
    var name;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
        user = snapshot.val().user;
        name = snapshot.val().first_name
      });

    this.setState({
      user:user
    });
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "black",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});

export default BottomTabNavigator;
