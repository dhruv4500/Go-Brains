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
  TouchableOpacity
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';

export default class SumCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sum_id:this.props.sums.key,
      sum_value:this.props.sums.value,
      user:false
    }
  }
  componentDidMount(){
    this.fetchUserData();
      try{
      setInterval(async ()=>{
        this.fetchUserData();
      },2000); 
    }catch(e){
        console.log(e);
      }
  }
  render(){
  var sum=this.state.sum_value
  if(this.state.user==true){
     return(
       <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.props.navigation.navigate('AdminSums', {
              sums: this.props.sums,
            });
          }}>
          <View style={styles.cardContainer}>
      
            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>
                {sum.sum}
              </Text>
              <Text style={styles.storyAuthorText}>
                Sum created by {sum.authorName}
              </Text>
              <Text style={styles.descriptionText}>
                {sum.description}
              </Text>
            </View>

          </View>
        </TouchableOpacity>
    );
  }else{
    return(
       <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.props.navigation.navigate('Sums', {
              sums: this.props.sums,
            });
          }}>
          <View style={styles.cardContainer}>
      
            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>
                {sum.sum}
              </Text>
              <Text style={styles.storyAuthorText}>
                Sum created by {sum.authorName}
              </Text>
              <Text style={styles.descriptionText}>
                {sum.description}
              </Text>
            </View>

          </View>
        </TouchableOpacity>
    )
    }
  }
   async fetchUserData() {
    var user;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        user = snapshot.val().user;
      });

    this.setState({
      user:user
    });
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    marginTop: RFValue(30),
    marginLeft: RFValue(16),
    marginBottom: RFValue(10),
    marginRight: RFValue(16),
    backgroundColor: '#006f85',
    borderRadius: RFValue(20),
  },
  titleContainer: { paddingLeft: RFValue(20), justifyContent: 'center' },
  storyTitleText: {
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
    paddingTop:10
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(17),
    color: 'white',
    paddingTop: RFValue(20),
    paddingBottom:30
  },
});