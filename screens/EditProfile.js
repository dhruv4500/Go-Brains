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


export default class EditProfile extends Component{
  constructor(props){
    super(props);

    this.state={
      firstName:"",
      lastName:"",
  
    }
  }
  render(){
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
        <Text style={styles.heading}>Create Sum</Text>
        <KeyboardAvoidingView>
        <View style={styles.box}>
          <Text style={styles.authorName}>First Name - </Text>
          <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({ firstName: text })}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
              />
        </View>
         <View style={styles.box}>
          <Text style={styles.authorName}>Last Name - </Text>
          <TextInput
                style={[styles.textinput,{width:RFValue(160)}]}
                onChangeText={(text) => this.setState({ lastName: text })}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
              />
        </View>
        
            </KeyboardAvoidingView>
          <TouchableOpacity style={styles.button} onPress={()=>{this.updateProfile()}}>
           <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <View style={{ flex: 0.08 }} />
        
      </View>
    );
  }
  updateProfile=async()=>{
    if(this.state.firstName){
    var firstName=this.state.firstName;
    firstName=firstName.trim();

    var secondName=this.state.lastName;
    secondName=secondName.trim();
          
       await firebase
        .database()
        .ref("users")
        .child(firebase.auth().currentUser.uid)
        .child("first_name")
        .set(firstName);
        
       await firebase
        .database()
        .ref("users")
        .child(firebase.auth().currentUser.uid)
        .child("last_name")
        .set(secondName);
Alert.alert('Success!',
'Your name is updated in the database')

this.props.navigation.navigate("Home")
}else{
  Alert.alert(
    'Data Missing!',
    'Please fill your first name'
  )
}
        
  }
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:"#1eaec7",
    margin:RFValue(5),
    borderRadius:10
  },
  safeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(40),
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