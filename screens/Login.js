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
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    const { email, password } = this.state;

    return (
      <View style={style.container}>
        <SafeAreaView style={style.safeArea} />
            <View style={style.appTitle}>
            <View style={style.icon}>
              <Image
                source={require('../assets/logo.png')}
                style={style.logoImage}
              />
            </View>
            <View style={style.text}>
              <Text style={{ fontSize: RFValue(28), fontWeight: 'bold' }}>
                Go Brains
              </Text>
            </View>
          </View>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 0.5 }}>
      
          <View style={style.title}>
            <Text style={{ fontSize: RFValue(30) }}>Login</Text>

            <View style={style.lowerContainer}>
              <TextInput
                style={style.textinput}
                onChangeText={(text) => this.setState({ email: text })}
                placeholder={'Enter Email'}
                placeholderTextColor={'#FFFFFF'}
              />
              <TextInput
                style={[style.textinput, { marginTop: 20 }]}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder={'Enter Password'}
                placeholderTextColor={'#FFFFFF'}
                secureTextEntry
              />
              <TouchableOpacity
                style={[style.button, { marginTop: 20 }]}
                onPress={() => this.handleLogin(email, password)}>
                <Text style={style.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontColor: 'black',
                  alignSelf: 'center',
                  marginTop: 40,
                  fontSize: RFValue(20),
                  fontWeight: 'bold',
                }}>
                OR
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={style.buttonG}
            onPress={() => this.signInWithGoogleAsync()}>
            <Text style={style.googleText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleLogin =  (email, password) => {
    if(email=="admin@gobrains.com"){

      firebase.auth().signInWithEmailAndPassword(email, password).then(
        ()=>{
          this.props.navigation.navigate('Dashboard')
        }
      ).catch((error)=>{alert(error.message)})

    }else{
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });}
  }

    signInWithGoogleAsync=async ()=> {
    try {
      const result = await Google.logInAsync({
        behavior:'web',
        androidClientId:
          '673224925033-fh4fnacco2asi8h06atlh18gk5vs80fp.apps.googleusercontent.com',
        iosClientId:
          '673224925033-afpb39fq6qrdj3m1rdhnpvcsvbq5u6mf.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  onSignIn=(googleUser)=> {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  score:0,
                  user:false,
                  current_theme: "dark", // this wasnt here ?
                })
                .then(function (snapshot) {})

            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The credential that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }
  isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
}

const style = StyleSheet.create({
  container: {
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
  title: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: 30,
  },
  textinput: {
    width: RFValue(200),
    height: 55,
    padding: 10,
    borderColor: '#FFFFFF',
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#5653D4',
  },
  button: {
    width: RFValue(100),
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F48D20',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Rajdhani_600SemiBold',
  },
  buttonContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonG: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: '#F48D20',
    position: 'absolute',
  },

  googleText: {
    color: 'white',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
  },
});
