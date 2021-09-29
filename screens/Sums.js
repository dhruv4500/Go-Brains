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
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';


export default class Sums extends Component{
    constructor(props) {
    super(props);
    this.state = {
      light_theme:false,
      userAnswer:0,
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
    let sum=this.props.route.params.sums.value
    return(
          <View style={this.state.light_theme ? styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ScrollView>
          <View style={this.state.light_theme ? styles.cardContainerLight:styles.cardContainer}>
            <View style={styles.dataContainer}>
              <View style={styles.titleContainer}>
                <Text style={this.state.light_theme ? styles.storyTitleTextLight:styles.storyTitleText}>
                  {sum.sum}
                </Text>
                <Text style={this.state.light_theme ? styles.storyAuthorTextLight:styles.storyAuthorText}>
                  Created by {sum.authorName}
                </Text>
              </View>
            </View>
             <KeyboardAvoidingView behavior="padding">

              <View style={{margin:RFValue(20),justifyContent:"center"}}>
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ userAnswer: text })}
              placeholder={"Enter Answer"}
              placeholderTextColor={"#FFFFFF"}
            />
              </View>
              </KeyboardAvoidingView>

              <TouchableOpacity style={styles.submitButton} onPress={()=>{this.checkAnswer()}}>
                <Text style={styles.buttonText}>Submit Answer</Text>
              </TouchableOpacity>
          </View>
          <View style={{ flex: 0.08 }} />
          </ScrollView>
        </View>
    )
  }

  async fetchUserData() {
    var theme;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
      });

    this.setState({
      light_theme: theme === 'light' ? true : false,
    });
  }

  checkAnswer(){
        let answer=this.props.route.params.sums.value.answer
        
        if(this.state.userAnswer==answer){

           firebase
        .database()
        .ref("users")
        .child(firebase.auth().currentUser.uid)
        .child("score")
        .set(firebase.database.ServerValue.increment(+3));
      
        firebase
        .database()
        .ref("sums")
        .child(this.props.route.params.sums.key)
        .child(firebase.auth().currentUser.uid)
        .set(true);

        Alert.alert(
          'Well Done!',
          'Your answer is correct.'
        )

        this.props.navigation.navigate("Home")
        }else{ 
          firebase
        .database()
        .ref("users")
        .child(firebase.auth().currentUser.uid)
        .child("score")
        .set(firebase.database.ServerValue.increment(-5));

      firebase
        .database()
        .ref("sums")
        .child(this.props.route.params.sums.key)
        .child(firebase.auth().currentUser.uid)
        .set(false);

          Alert.alert(
            'Wrong Answer!',
            'Your Answer is wrong. Please check your answer again'
          )
        }
        }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
    containerLight: {
    flex: 1,
    backgroundColor: '#c4f4ff',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  cardContainer: {
    margin: RFValue(18),
    backgroundColor: '#2d92a8',
    borderRadius: RFValue(20),
  },
    cardContainerLight: {
    margin: RFValue(18),
    backgroundColor: '#acfce4',
    borderRadius: RFValue(20),
  },
  titleContainer: { paddingLeft: RFValue(20), justifyContent: 'center',flex:0.9 },
  storyTitleText: {
    fontSize: RFValue(18),
    justifyContent:"center",
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
    padding:10,
  },
  storyTitleTextLight: {
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
    color: 'black',
    padding:10
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
   storyAuthorTextLight: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'black',
  },
  dataContainer: {
    flexDirection: 'row',
    padding: RFValue(20),
    flex:0.5
  },
  textinput: {
    width: "75%",
    height: 55,
    padding: 10,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Rajdhani_600SemiBold",
    backgroundColor: "#5653D4"
  },
  submitButton:{
    backgroundColor:"#F48D20",
    marginLeft:RFValue(30),
    marginBottom:20,
    borderRadius:20,
    width:"60%",
   
  },
  buttonText:{
    alignSelf:"center",
    color:"white",
    padding:RFValue(15),
    fontSize:RFValue(20),

  }
})