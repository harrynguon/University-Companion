import React from 'react';
import { FlatList, ScrollView, View, Text, TextInput, StyleSheet, ListView, TouchableOpacity, Image, Alert } from 'react-native';
import { Header, Left, Right, Icon, Button, Container, Content, Body, Title,
    DatePicker, Fab, List, ListItem, Toast } from 'native-base';
import firebase from 'react-native-firebase'

import Course from './Course'

class CourseTimetable extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.ref = firebase.firestore().collection('data');
        this.unsubscribe = null;
        this.state = {
            textInput: '',
            chosenDate: new Date(),
            loading: true,
            data: [],
        };

        this.retrieveDataFromFireBase();
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    // Iterate over the documents and populate state
    onCollectionUpdate = (querySnapshot) => {
        this.retrieveDataFromFireBase();
        this.setState({
            loading: false
        })
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    updateTextInput(value) {
        this.setState({ textInput: value });
    }

    retrieveDataFromFireBase() {
        var docRef = this.ref.doc(firebase.auth().currentUser.uid);
        docRef.get()
                .then(docSnapshot => {
                if (docSnapshot.exists) {
                    // console.log(docSnapshot.data()[0]);
                    let pulledData = []
                    Object.entries(docSnapshot.data()).forEach(([key, val]) => {
                        pulledData.push(val);
                    });
                    this.setState({
                        data: pulledData
                    })
                } 
                else {
                    var setWithMerge = docRef.set([{
                        id: Math.random()*1000000,
                        courseName: "Example Course",
                        courseRoom: "Example Room",
                        date: new Date().toDateString(),
                        time: "12:00am"
                    }], { merge: true });
                    this.retrieveDataFromFireBase();
                }
                });
    }

    render() {

        if (this.state.loading) {
            return null; // or render a loading icon
        }

        let allLectures = this.state.data
            .filter(lec => (new Date(lec.date).getDate() == this.state.chosenDate.getDate()))
            .map((lec, index) =>
                <ListItem key={index}>
                    <Text>Course Name: {lec.courseName}{"\n"}
                        Course Room: {lec.courseRoom}{"\n"}
                        Date: {lec.date}{"\n"}
                        Time: {lec.time}</Text>
                </ListItem>)
            
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.openDrawer()}> 
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Course Timetable</Title>
                </Body>
                <Right />
            </Header>
                <Content contentContainerStyle={styles.container}>
                    <DatePickerComponent setDate={this.setDate} />
                    <Text>
                    Date: {this.state.chosenDate.toString().substr(4, 12)}
                    </Text>
                    <Text>
                        {/* This is Content Section */}
                    </Text>
                </Content>
                <Content>
                <List
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    dataSource={this.ds.cloneWithRows(this.getFilteredData())}
                    renderRow={data =>
                    <ListItem>
                        <Text>Course Name: {data.courseName}{"\n"}
                        Course Room: {data.courseRoom}{"\n"}
                        Date: {data.date}{"\n"}
                        Time: {data.time}</Text>
                    </ListItem>}
                    renderLeftHiddenRow={data =>
                    <Button full success onPress={() => this.props.navigation.navigate('EditLecture', {
                        id: data.id,
                        courseName: data.courseName,
                        courseRoom: data.courseRoom,
                        date: data.date,
                        time: data.time
                    })}>
                        <Icon active name="create" />
                    </Button>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={_ => this.confirmDelete(data, secId, rowId, rowMap)}>
                        <Icon active name="trash" />
                    </Button>}
                />
            </Content>
            
            <AddLectureButton navigation={this.props.navigation}/>
            
        </Container>
        );
    }

    getFilteredData() {
        return this.state.data.filter(lec => (new Date(lec.date).getDate() == this.state.chosenDate.getDate()));
    }

    confirmDelete(data, secId, rowId, rowMap) {
        Alert.alert(
            'Confirmation',
            'Are you sure you wish to delete the lecture for ' + data.courseName + '?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => this.deleteRow(data, secId, rowId, rowMap)},
            ],
            { cancelable: false }
          )
    }

    deleteRow(data, secId, rowId, rowMap) {
        Toast.show({
            text: "Your " + data.courseName + " lecture for has been deleted!",
            buttonText: "Dismiss",
            duration: 3000
        })
        rowMap[`${secId}${rowId}`].props.closeRow();
        // console.log(this.state.data);
        var newData = this.state.data.filter(lec => lec.id != data.id);
        // console.log(newData);
        this.setState({ data: newData });
        var docRef = this.ref.doc(firebase.auth().currentUser.uid);
        docRef.set(newData);
      }

    setDate = (newDate) => {
        // this.setState({
        //     chosenDate: newDate,
        // });
        this.state.chosenDate = newDate;
        this.forceUpdate();
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
    placeHolderText="Select date"
    textStyle={{ color: "green" }}
    placeHolderTextStyle={{ color: "#d3d3d3" }}
    onDateChange={props.setDate}
    />
};

const AddLectureButton = ({navigation}) => {
    return <View style={{ flex: 1 }}>
            <Fab
                active='true'
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => {navigation.navigate('AddLecture')}}>
                <Icon name="add" />
            </Fab>
            </View>
}

export default CourseTimetable;


const styles = StyleSheet.create({
    header: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
    }
});