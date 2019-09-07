// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Alert } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Header, Left, Button, Icon, Body, Title, Right, ListItem, Content, Switch, Toast } from 'native-base';

export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('data');
        this.unsubscribe = null;
    }

  render() {
    return (
      <Container>
        <Header>
            <Left>
                <Button transparent onPress={() => this.props.navigation.openDrawer()}> 
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Settings</Title>
            </Body>
            <Right />
        </Header>
        <Content>

          <ListItem itemDivider>
              <Text>General</Text>
            </ListItem>  
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="plane" />
              </Button>
            </Left>
            <Body>
              <Text>Placeholder</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>

          <ListItem itemDivider>
              <Text>Course Timetable</Text>
            </ListItem>  
          <ListItem icon>
            <Left>
              <Button danger>
                <Icon active name="trash" />
              </Button>
            </Left>
            <Body>
              <Text>Delete All Lectures</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => this.deleteAllLecturesConfirmation()}> 
                    <Icon active name="arrow-forward" />
                </Button>
            </Right>
          </ListItem>
          
        </Content>
      </Container>
    )
  }

  deleteAllLecturesConfirmation() {
    Alert.alert(
        'Confirmation',
        'Are you sure you wish to delete ALL of your lectures?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => this.deleteAllLectures()},
        ],
        { cancelable: false }
      )
  }

  deleteAllLectures() {
    var ref = firebase.firestore().collection('data');
    var docRef = ref.doc(firebase.auth().currentUser.uid);
    docRef.get()
            .then(docSnapshot => {
            if (docSnapshot.exists) {
                docRef.set(
                    []
                );
            }
        });
    Toast.show({
        text: "All of your lectures have been deleted!",
        buttonText: "Dismiss",
        duration: 3000
    })
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})