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


export default class AdminSums extends Component{
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
            <TouchableOpacity style={styles.editButton} onPress={()=>{this.props.navigation.navigate("Edit",{
              sums:this.props.route.params.sums
            })}}>
              <Text style={styles.editText}>Edit</Text>
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


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
    containerLight: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: '#6efaee',
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
  editButton:{
    margin:RFValue(20),
    alignSelf:"center",
    backgroundColor:"white",
    borderRadius:RFValue(10)
  },
  editText:{
    padding:RFValue(20)
  },

})