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


export default class EditQuestion extends Component{
  constructor(props){
    super(props);

    this.state={
      question:this.props.route.params.sums.value.sum,
      answer:this.props.route.params.sums.value.answer,
      authorName:this.props.route.params.sums.value.authorName,
      description:this.props.route.params.sums.value.description
  
    }
  }
  render(){
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
        <Text style={styles.heading}>Edit Question</Text>
        <ScrollView>
        <KeyboardAvoidingView>
        <View style={styles.box}>
          <Text style={styles.authorName}>Question - </Text>
          <TextInput
                style={[styles.textinput,{width:RFValue(250)}]}
                onChangeText={(text) => this.setState({ question: text })}
                placeholder={''}
                value={this.state.question}
                placeholderTextColor={'#FFFFFF'}
                multiline={true}
              />
        </View>
         <View style={styles.box}>
          <Text style={styles.authorName}>Answer - </Text>
          <TextInput
                style={[styles.textinput,{width:RFValue(160)}]}
                onChangeText={(text) => this.setState({ answer: text })}
                value={this.state.answer}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
              />
        </View>

        <View style={styles.box}>
          <Text style={styles.authorName}>Description - </Text>
          <TextInput
                style={[styles.textinput,{width:RFValue(160)}]}
                onChangeText={(text) => this.setState({ description: text })}
                value={this.state.description}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
                multiline={true}
              />
        </View>

        <View style={styles.box}>
          <Text style={styles.authorName}>Author Name - </Text>
          <TextInput
                style={[styles.textinput,{width:RFValue(160)}]}
                onChangeText={(text) => this.setState({ authorName: text })}
                value={this.state.authorName}
                placeholder={''}
                placeholderTextColor={'#FFFFFF'}
              />
        </View>
        
            </KeyboardAvoidingView>
          <TouchableOpacity style={styles.button} onPress={()=>{this.updateQuestion()}}>
           <Text style={styles.buttonText}>Update Question</Text>
          </TouchableOpacity>
          </ScrollView>
          <View style={{ flex: 0.08 }} />
        
      </View>
    );
  }
  updateQuestion=async()=>{
    if(this.state.question&&this.state.authorName&&this.state.answer&&this.state.description){
    var question=this.state.question;
    question=question.trim();

    var authorName=this.state.authorName;
    authorName=authorName.trim();

    var answer=this.state.answer;
    answer=answer.trim();

    var description=this.state.description;
    description=description.trim();          

       await firebase
        .database()
        .ref("sums")
        .child(this.props.route.params.sums.key)
        .child("sum")
        .set(question);
        
       await firebase
        .database()
        .ref("sums")
        .child(this.props.route.params.sums.key)
        .child("authorName")
        .set(authorName);

        await firebase
        .database()
        .ref("sums")
        .child(this.props.route.params.sums.key)
        .child("answer")
        .set(answer);
        
       await firebase
        .database()
        .ref("sums")
        .child(this.props.route.params.sums.key)
        .child("description")
        .set(description);

Alert.alert('Success!',
'Your question is updated in the database')

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