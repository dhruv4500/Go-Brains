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
import CreateSum from './CreateSums';

export default class Home extends Component{
  constructor(props){
    super(props);

    this.state={
      sums:[],
      light_theme:false,
      user:false,
      name:""
    }
  }
  componentDidMount(){
    this.fetchSums();
    this.fetchUserData();
    try{
      setInterval(async ()=>{
        this.fetchSums();
        this.fetchUserData();
      },2000); 
    }catch(e){
        console.log(e);
      }
  }
  keyExtractor = (item, index) => index.toString();
  
  renderItem = ({ item: sums }) => {
    return <SumCard sums={sums} navigation={this.props.navigation} />;
  };

  render(){
    var isLight=this.state.light_theme;
    if(this.state.user){
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
                Go Brains
              </Text>
            </View>
          </View>
          <ScrollView>
        <View style={style.greetings}>
          <Text style={style.greetingText}>Hello {this.state.name}! Create your new assignment below: </Text>
        </View>
        <View>
         <CreateSum />
        </View>
          <View style={{ flex: 0.08 }} />
          </ScrollView>
          <View style={{ flex: 0.08 }} />

          
      </View>
    );
    }else{
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
                Go Brains
              </Text>
            </View>
          </View>

          { !this.state.sums[0] ? (
            <View style={style.noStories}>
              <Text style={isLight ? {color:"black"}:{color:"white"}}>
                No Sums Available
              </Text>
            </View>
          ) :(  <View style={style.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.sums}
              renderItem={this.renderItem}
            />
          </View>)}
          <View style={{ flex: 0.08 }} />
      </View>
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
      light_theme: theme === 'light' ? true : false,
      user:user,
      name:name
    });
  }

   async fetchSums() {
    var sum = [];
    let sums=[];
    await firebase
      .database()
      .ref('/sums/')
      .on('value', function (snapshot) {
      
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach(function (key) {
            sums.push({ key: key, value: snapshot.val()[key] });

          });
        }
      });

    this.setState({
      sums: sums,
    });
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
    marginTop:RFValue(20)
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
  cardContainer: {
    flex: 0.93,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  greetings:{
    backgroundColor:"#F48D20",
    marginTop:RFValue(60),
    marginBottom:RFValue(20),
    marginLeft:RFValue(20),
    marginRight:RFValue(20),
    justifyContent:"center",
    borderRadius:20
  },
  greetingText:{
    padding:RFValue(15),
    color:"white",
    fontWeight:"bold",
    fontSize:RFValue(18)
  }


});