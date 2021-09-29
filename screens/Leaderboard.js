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
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import SumCard from './SumCard';

export default class Home extends Component{
  constructor(props){
    super(props);

    this.state={
      sums:[],
      light_theme:false,
      score:0,
      name:""
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
  render(){
    var isLight=this.state.light_theme;
    return(
      <View style={isLight ? style.containerLight:style.container}>
        <SafeAreaView style={style.safeArea} />
            <View style={style.appTitle}>
            <View style={style.icon}>
              <Image
                source={require('../assets/logo.png')}
                style={style.logoImage}
              />
            </View>
            <View style={style.text}>
              <Text style={isLight ? style.goTextLight:style.goText}>
                Go Brains Leaderboard
              </Text>
            </View>
          </View>
          <View style={style.score}>
          <Text style={style.scoreText}>Hello {this.state.name}</Text>
          <Text style={style.scoreText}>Your Total Score till now is {this.state.score}</Text>
          </View>
          <View style={{ flex: 0.08 }}/>
      </View>
    )
  }

  async fetchUserData() {
    var theme;
    var score;
    var name;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme,
        score=snapshot.val().score;
        name=snapshot.val().first_name;
      });

    this.setState({
      light_theme: theme === 'light' ? true : false,
      score:score,
      name:name
    });
    console.log("score:"+this.state.score)
  }
  
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
    containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(40),
  },
  logoImage: {
    width: RFValue(100),
    resizeMode: 'contain',
  },
  appTitle: {
    flex: 0.15,
    flexDirection: 'row',
  },
  icon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 0.7,
    justifyContent: 'center',
  },
  goText:{ fontSize: RFValue(28), fontWeight: 'bold',color:"white" },
  
  goTextLight:{ fontSize: RFValue(28), fontWeight: 'bold',color:"black" },

  score:{
   backgroundColor:"#F48D20",
   margin:RFValue(22),
   justifyContent:"center",
   borderRadius:10
  },
  scoreText:{
    margin:RFValue(20),
    fontSize:RFValue(20),
    color:"white",
    fontWeight:"bold"
  }


});