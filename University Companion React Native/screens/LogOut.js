import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Button, Header, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';

export default class LogOut extends React.Component {
  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style = {styles.container}>
        
      <Text h1>Do you really wish to log out?{"\n"}</Text>
      <Button
        onPress={() => {
          firebase.auth().signOut().then(function() {
            this.props.navigation.navigate('SignUp');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
        }}
        title="Yes"
      >
      </Button>
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="No"
      >
      </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})