// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

export default class Main extends React.Component {

  state = {
    currentUser: null 
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
      <Container>
        <Header>
            <Left>
                <Button transparent onPress={() => this.props.navigation.openDrawer()}> 
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Home</Title>
            </Body>
            <Right />
        </Header>
        <View style={styles.container}>
          <Text>
            Hi {currentUser && currentUser.email}!
          </Text>
          <Text>
            Welcome to the University Companion App. 
          </Text>
          <Text>
            This app consists of a school course timetable.
          </Text>
          <Text>
            It contains persistent data storage via Firebase.
          </Text>
        </View>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})