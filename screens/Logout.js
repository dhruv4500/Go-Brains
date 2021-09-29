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
import firebase from 'firebase';

export default class LogoutScreen extends Component {
  componentDidMount(){
    firebase.auth().signOut();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>LogoutScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});