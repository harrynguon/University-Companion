import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation';
import { Root } from 'native-base';
// import the different screens
import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Main from './screens/Main'
import CourseTimetable from './screens/CourseTimetable'
import AddLecture from './screens/AddLecture'
import EditLecture from './screens/EditLecture'
import LogOut from './screens/LogOut'
import Settings from './screens/Settings'

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppDrawerNavigator />
      </Root>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  'Loading': Loading,
  'Home': Main,
  'Course Timetable': CourseTimetable,
  'SignUp': SignUp,
  'Login': Login,
  'AddLecture': AddLecture,
  'EditLecture': EditLecture,
  'Settings': Settings,
  'Log Out': LogOut
});