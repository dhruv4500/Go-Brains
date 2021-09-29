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

import Login from './screens/Login';
import Loading from './screens/Loading';
import Dashboard from './screens/Dashboard';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const SwitchNavigator = createSwitchNavigator({
  'Loading': Loading,
  'Login': Login,
  'Dashboard': Dashboard,
});

const AppSwitchNavigator = createAppContainer(SwitchNavigator);

export default function App() {
  return <AppSwitchNavigator />;
}
