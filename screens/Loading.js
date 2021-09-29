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

import { RFValue } from 'react-native-responsive-fontsize';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkifLogedIn();
  }

  render() {
    return (
      <View style={style.container}>
        <SafeAreaView style={style.safeArea} />
        <Image
          source={require('../assets/loading.gif')}
          style={style.connectImage}
        />
      </View>
    );
  }

  checkifLogedIn = () => {
     firebase.auth().onAuthStateChanged((user)=>{
      
      if(user){
        this.props.navigation.navigate('Dashboard')
      }else{
        this.props.navigation.navigate('Login')
      }
    })
  };
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  safeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  connectImage: {
    width: '100%',
    height: '20%',
    alignSelf: 'center',
    margin: 130,
  },
});
