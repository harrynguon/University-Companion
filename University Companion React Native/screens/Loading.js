// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import { Toast } from 'native-base';

export default class Loading extends React.Component {

  // Hide from drawer navigator
  static navigationOptions = {
    drawerLabel: () => null
  }

  componentDidMount() {
    // firebase.auth().signOut()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Toast.show({
          text: "You have successfully logged in!",
          buttonText: "Dismiss",
          duration: 1500
        })
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('SignUp');
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})