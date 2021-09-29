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
  Switch,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';


export default class Profile extends Component{
  constructor(props){
    super(props);

    this.state={
      name:"",
      theme:"",
      image:"",
      score:0,
      user:false,
      light_theme:false,
      isEnabled:true,
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
    if(this.state.user){
return(
      <View style={this.state.light_theme ? styles.containerLight:styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
         <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ? styles.appTitleTextLight:styles.appTitleText}>Go Brains</Text>
            </View>
          </View>
           <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: this.state.image }}
                style={styles.profileImage}
              ></Image>
              <Text style={this.state.light_theme ? styles.nameTextLight:styles.nameText}>{this.state.name}</Text>
            </View>
            <View style={styles.themeContainer}>
              <Text style={this.state.light_theme ? styles.themeTextLight:styles.themeText}>Dark Theme</Text>
              <Switch
                style={{
                  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
                }}
                trackColor={{ false: "#767577", true: "white" }}
                thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.toggleSwitch()}
                value={this.state.isEnabled}
              />
                <View style={{ flex: 0.3 }} />
            </View>
              <TouchableOpacity style={styles.editButton} onPress={()=>{this.props.navigation.navigate("Edit_Profile")}}>

            <Text style={styles.editText}>Edit Profile</Text>
            
            </TouchableOpacity>
          
          </View>
          <View style={{ flex: 0.08 }} />
      </View>
      )

    }else{
    return(
      <View style={this.state.light_theme ? styles.containerLight:styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
         <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ? styles.appTitleTextLight:styles.appTitleText}>Go Brains</Text>
            </View>
          </View>
           <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: this.state.image }}
                style={styles.profileImage}
              ></Image>
              <Text style={this.state.light_theme ? styles.nameTextLight:styles.nameText}>{this.state.name}</Text>
            </View>
            <View style={styles.themeContainer}>
              <Text style={this.state.light_theme ? styles.themeTextLight:styles.themeText}>Dark Theme</Text>
              <Switch
                style={{
                  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
                }}
                trackColor={{ false: "#767577", true: "white" }}
                thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => this.toggleSwitch()}
                value={this.state.isEnabled}
              />
            </View>
            <View style={{ flex: 0.3 }} />
          </View>
          <View style={{ flex: 0.08 }} />
      </View>
    );}
  }
     toggleSwitch() {
    const previous_state = this.state.isEnabled;
    const theme = !this.state.isEnabled ? "dark" : "light";
    var updates = {};
    updates[
      "/users/" + firebase.auth().currentUser.uid + "/current_theme"
    ] = theme;
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({ isEnabled: !previous_state, light_theme: previous_state });
  }
  async fetchUserData(){
   var name;
   var theme;
   var image;
   var score;
   var user;
      await firebase.database().ref("/users/"+firebase.auth().currentUser.uid).on("value",function (snapshot){

               name=snapshot.val().first_name+" "+snapshot.val().last_name,
               theme=snapshot.val().current_theme,
               image=snapshot.val().profile_picture,
               score=snapshot.val().score,
               user=snapshot.val().user
               

      })

      
             this.setState({
               name:name,
               theme:theme,
               image:image,
               score:score,
               user:user,
               light_theme: theme === "light" ? true : false,
               isEnabled: theme === "light" ? false : true,
             })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: '#c4fdff',
  },
   droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
   appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
    appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
    appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
    iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
    screenContainer: {
    flex: 0.85
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70)
  },
  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
   nameTextLight: {
    color: "black",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20)
  },
  themeText: {
    color: "white",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15)
  },
   themeTextLight: {
    color: "black",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15)
  },
  editButton:{
    backgroundColor:"black",
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginLeft:20,
    marginRight:70,
    marginBottom:20,
    width:150,
    borderRadius:20
  },
  editText:{

    color:"white",
    padding:10,
    fontSize:24

  }
});