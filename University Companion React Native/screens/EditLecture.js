import React, { Component } from 'react';
import {Text, View, Picker} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label,
    Left, Button, Icon, Right, Body, Title, Footer, DatePicker, Toast } from 'native-base';
import firebase from 'react-native-firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class EditLecture extends Component {

    // Hide from drawer navigator
    static navigationOptions = {
        drawerLabel: () => null
    }

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.id = this.params.id;
        this.courseName = this.params.courseName;
        this.courseRoom = this.params.courseRoom;
        this.state = ({
            chosenDate: new Date(this.params.date),
            time: this.params.time
        })
    }

  render() {
    
    return (
      <Container>
        <Header>
            <Left>
                <Button transparent onPress={() =>
                    this.props.navigation.navigate('Course Timetable')}>
                    <Icon name='ios-arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Edit Lecture</Title>
            </Body>
            <Right />
        </Header>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Course Name</Label>
              <Input placeholder={this.courseName} onChangeText= {(text) => this.courseName = text} />
            </Item>
            <Item inlineLabel>
              <Label>Course Room</Label>
              <Input placeholder={this.courseRoom} onChangeText= {(text) => this.courseRoom = text} />
            </Item>
            <Item inlineLabel>
                <Label>Date</Label>
                <DatePickerComponent setDate={this.setDate} />
            </Item>
            <Item>
                <Label>Time</Label>
                    <Picker
                        selectedValue={this.state.time}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue})}>
                        <Picker.Item label="12:00am" value="12:00am" />
                        <Picker.Item label="1:00am" value="1:00am" />
                        <Picker.Item label="2:00am" value="2:00am" />
                        <Picker.Item label="3:00am" value="3:00am" />
                        <Picker.Item label="4:00am" value="4:00am" />
                        <Picker.Item label="5:00am" value="5:00am" />
                        <Picker.Item label="6:00am" value="6:00am" />
                        <Picker.Item label="7:00am" value="7:00am" />
                        <Picker.Item label="8:00am" value="8:00am" />
                        <Picker.Item label="9:00am" value="9:00am" />
                        <Picker.Item label="10:00am" value="10:00am" />
                        <Picker.Item label="11:00am" value="11:00am" />
                        <Picker.Item label="12:00pm" value="12:00pm" />
                        <Picker.Item label="1:00pm" value="1:00pm" />
                        <Picker.Item label="2:00pm" value="2:00pm" />
                        <Picker.Item label="3:00pm" value="3:00pm" />
                        <Picker.Item label="4:00pm" value="4:00pm" />
                        <Picker.Item label="5:00pm" value="5:00pm" />
                        <Picker.Item label="6:00pm" value="6:00pm" />
                        <Picker.Item label="7:00pm" value="7:00pm" />
                        <Picker.Item label="8:00pm" value="8:00pm" />
                        <Picker.Item label="9:00pm" value="9:00pm" />
                        <Picker.Item label="10:00pm" value="10:00pm" />
                        <Picker.Item label="11:00pm" value="11:00pm" />
                    </Picker>
            </Item>
          </Form>
        </Content>
        
        <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>
            <Button onPress={() => {
                this.addLectureToFirebase();
                Toast.show({
                    text: "Your lecture for " + this.courseName + " has been added!",
                    buttonText: "Dismiss",
                    duration: 3000
                  })
                this.props.navigation.navigate('Course Timetable');
                }}
            >
            <Text>Edit Lecture</Text>
            </Button>
        </View>
        
      </Container>
    );
  }

  addLectureToFirebase() {
    var ref = firebase.firestore().collection('data');
    var docRef = ref.doc(firebase.auth().currentUser.uid);
    docRef.get()
            .then(docSnapshot => {
            if (docSnapshot.exists) {
                let pulledData = []
                Object.entries(docSnapshot.data()).forEach(([key, val]) => {
                    if (val.id == this.id) {
                        // Update the entry
                        pulledData.push({
                            id: this.id,
                            courseName: this.courseName,
                            courseRoom: this.courseRoom,
                            date: this.state.chosenDate.toDateString(),
                            time: this.state.time
                        })
                    } else {
                        pulledData.push(val);
                    }
                });
                docRef.set(
                    pulledData
                );
            }
        });
  }

  setDate = (newDate) => {
    this.setState({
        chosenDate: newDate,
    });
};

  
}

const DatePickerComponent = (props) => {
    return <DatePicker
    defaultDate={new Date()}
    minimumDate={new Date(2018, 1, 1)}
    maximumDate={new Date(2018, 12, 31)}
    locale={"en"}
    timeZoneOffsetInMinutes={undefined}
    modalTransparent={false}
    animationType={"fade"}
    androidMode={"default"}
    placeHolderText={"Select date"}
    textStyle={{ color: "green" }}
    placeHolderTextStyle={{ color: "#d3d3d3" }}
    onDateChange={props.setDate}
    />
};