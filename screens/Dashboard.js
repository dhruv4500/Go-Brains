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
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../navigations/DrawerNavigator';
import UserDrawerNavigator from '../navigations/UserDrawerNavigator';
import firebase from 'firebase';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state={
      user:false
    }
  }

  componentDidMount(){
    this.fetchUserData();
      try{
      setInterval(async ()=>{
        this.fetchUserData();
      },5000); 
    }catch(e){
        console.log(e);
      }
  }
  render() {
    if (this.state.user) {
      return (
        <NavigationContainer>
          <UserDrawerNavigator />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      );
    }
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
