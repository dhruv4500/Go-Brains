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
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';


export default class CreateSum extends Component{
  constructor(props){
    super(props);

    this.state={
      authorName:"",
      description:"",
      question:"",
      answer:""
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>Create Sum</Text>
        <KeyboardAvoidingView>
        <View style={styles.box}>
          <Text style={styles.authorName}>Author - </Text>
          <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({ authorName: text })}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
              />
        </View>
         <View style={styles.box}>
          <Text style={styles.authorName}>Description - </Text>
          <TextInput
                style={[styles.textinput,{width:RFValue(160)}]}
                onChangeText={(text) => this.setState({ description: text })}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
                multiline={true}
              />
        </View>
         <View style={styles.box}>
          <Text style={styles.authorName}>Question - </Text>
          <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({ question: text })}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
                multiline={true}
              />
        </View>
         <View style={styles.box}>
          <Text style={styles.authorName}>Answer - </Text>
          <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({ answer: text })}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
              />
        </View>
            </KeyboardAvoidingView>
          <TouchableOpacity style={styles.button} onPress={()=>{this.createSum()}}>
           <Text style={styles.buttonText}>Create Sum</Text>
          </TouchableOpacity>
          <View style={{ flex: 0.08 }} />
        
      </View>
    );
  }
  createSum=async()=>{
     if (
      this.state.authorName &&
      this.state.description &&
      this.state.question &&
      this.state.answer&&
      this.state.answer!==""
    ) {
      console.log("working")
      var sumData = {
        sum: this.state.question,
        answer: this.state.answer,
        description: this.state.description,
        created_on:new Date(),
        authorName:this.state.authorName,
      }
      await firebase.database().ref("/sums/"+Math.random().toString(36).slice(2)).set(sumData).then(
        (snapshot)=>{
            Alert.alert(
              'Submitted!',
              'Your Sum has been created'
            )
            this.props.navigation.navigate("StudentDashboard")
        }
      )
    } else {
      console.log('error');
      Alert.alert(
        'Error',
        'Data is Missing or answer is not numerical'
      );
    }
    this.setState({
      question:"",
      answer:"",
      description:"",
      authorName:""
    })
  }
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:"#1eaec7",
    margin:RFValue(5),
    borderRadius:10
  },
  heading:{
    alignSelf:"center",
    fontWeight:"center",
    fontSize:RFValue(20),
    color:"white",
    marginTop:10
  },
  textinput: {
    width: RFValue(130),
    height: 50,
    padding: 10,
    borderColor: '#FFFFFF',
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#5653D4',
  },
  box:{
    marginTop:RFValue(20),
    marginLeft:RFValue(20),
    marginRight:RFValue(20),
    marginBottom:RFValue(20),
    flexDirection:"row"
  },
  authorName:{
    fontSize:RFValue(18),
    alignSelf:"center",
    color:"white"
  },
  button:{
    backgroundColor:"black",
    marginTop:RFValue(20),
    marginBottom:RFValue(40),
    marginRight:RFValue(70),
    marginLeft:RFValue(70),
    justifyContent:"center",
  },
  buttonText:{
    color:"white",
    alignSelf:"center",
    fontSize:RFValue(18),
    fontWeight:"bold",
    padding:RFValue(5)
  }
})