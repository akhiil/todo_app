import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image, ScrollView, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import Header from '../components/header';
import UnCompletedData from '../components/uncompleteddata';
import CompletedData from '../components/completeddata';
import RadioBox from '../components/radioBox'
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import Spinner from 'react-native-loading-spinner-overlay';
import TickBox from 'react-native-vector-icons/FontAwesome'
import Arrow from 'react-native-vector-icons/AntDesign'


// const reference = database().ref('/users/123');
//const tempToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExMmU0YjUyYWI4MzMwMTdkMzg1Y2UwZDBiNGM2MDU4N2VkMjU4NDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2ODI1NjUyMjk1NDEtNHZrODJqMmJjdDh0cGIxcTRwcjMydmh0ODd1dDhjZzcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2ODI1NjUyMjk1NDEtY2dwdGJsMWZjMTAyNm8ybG1wNDRhMmw3OXJzcHF2N24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY5NzIzNjI2NDI3NTM4NTQ1OTEiLCJlbWFpbCI6ImFraGlsY3NrMTExMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkFraGlsIEt1bWFyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnMndocllPdXFHUi1MVEdkdDFvQjgtWm9vZkpNaUhqZGJUdkxuaD1zOTYtYyIsImdpdmVuX25hbWUiOiJBa2hpbCIsImZhbWlseV9uYW1lIjoiS3VtYXIiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTYyNDUxMjc3OCwiZXhwIjoxNjI0NTE2Mzc4fQ.Pouadbw40sx6UjxfZrsbIj2q98NdwKPvBC2KrpSEZRFJT0AXHn0g7Y7G1ZlC8auvi1TeOUkqu6zLCDLMKMVUeWzhlYXb3zq-aOltFhVSmd_13CJRi3jzz976hHAogidRhbj7X71ee636PcP3CeFAyeBj7ql9Bct7AUnaqCgqV2pTVYRdBqE1iCvIunF79iCr_z_rXMU83SKqLpJ9GlFwQC8KIrwkMBnPL1UQxZyIMFLFnzc6hKtJpcgrNxJKk_xgqimiiOPiPO2d0HCxMfmdQk3tCWxScK7We6EHEvI19J6yqIWJcgjbIu1gPzOJSMWvzaL1x8ctNN2TV7NESSdgYA"
const App = (props) => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [showUncompleted, setShowUncompleted] = useState(false);
    const [objectArray, setObjectArray] = useState([]);
    const [stringArray, setStringArray] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [status, setStatus] = useState(false);
    const [todoData, setTodoData] = useState([]);
    const [userToken, setUserToken] = useState('');
    const [databaseData, setDatabaseData] = useState([]);
    const [spinner, setSpinner] = useState(false);


    useEffect(async () => {
        setSpinner(true);
        let temp;
        let usertoken = await extractEmail();
        await database()
            .ref(`/users/`)
            .once('value')
            .then(snapshot => {
                // console.log('User data: ', snapshot.val());
                temp = snapshot.val();
                setDatabaseData(snapshot.val());

            }).catch((e) => {
                console.log(e)
            })
        setSpinner(false);
        console.log("temp wala data", usertoken)
        let againTemp = temp[usertoken];
        console.log("again Temp", againTemp)
        if (againTemp === undefined) {
            setTodoData([]);
        } else {
            setTodoData(temp[usertoken]);
        }


    }, [])

    // console.log(userToken, databaseData[userToken])
    //  console.log("todo ka data yha se", todoData)

    const extractEmail = async () => {
        const mail = await user.email;
        let p = "";
        for (let i = 0; i < mail.length; i++) {
            if (mail[i] !== '@') {
                p += mail[i];
            } else {
                break;
            }
        }
        console.log(p);
        setUserToken(p);
        return p;
    }

    const AddFirebaseData = (temp) => {
        database()
            .ref(`/users/` + userToken)
            .set(temp)
            .then(() => console.log('Data set.'));
    }



    console.log("ye loo", todoData)


    const addTodo = async () => {
        if (todoInput !== "") {
            const temp = [...todoData];
            temp.push({
                id: todoData.length,
                value: todoInput,
                completed: status
            })
            // console.log(todoInput)
            setTodoData(temp);
            setTodoInput('');
            setStatus(false);
            AddFirebaseData(temp);
        }
    }
    const deleteTodo = (id) => {
        let temp = [];
        console.log(id);
        todoData.map((item, index) => {
            if (index !== id) {
                temp.push({
                    id: temp.length,
                    value: item.value,
                    completed: item.completed
                })
            }
        })
        setTodoData(temp)
        AddFirebaseData(temp);
        console.log(temp)
    }

    const statusButton = () => {
        setStatus(!status)
    }



    const user = auth().currentUser;
    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
                <Header name="Todo Home" />
            </View>
            <ScrollView>

                <View style={styles.textInputStyle}>
                    <TextInput
                        placeholder="Write your todo"
                        placeholderTextColor='#cccccc'
                        style={{
                            fontSize: 18,
                            width: '75%',
                            backgroundColor: '#e6e6e6',
                            borderRadius: 5,
                            paddingHorizontal: 15,
                            fontFamily: 'sans-serif-condensed',
                            color: '#737373'
                        }}
                        onChange={(value) => setTodoInput(value.nativeEvent.text)}
                        value={todoInput}
                        onSubmitEditing={addTodo}
                    />
                    <TouchableOpacity
                        onPress={addTodo}
                        style={styles.tickBoxStyle}>
                        <TickBox name="check" size={30} />
                    </TouchableOpacity>
                </View>
                <Spinner
                    visible={spinner}
                    textContent={'Fetching data...'}
                    textStyle={{ color: 'white' }}
                />
                <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <RadioBox textValue="Completed" statusButton={statusButton} checked={status} />
                    <RadioBox textValue="Un-completed" statusButton={statusButton} checked={status ? false : true} />
                </View>

                <View style={{ marginLeft: '5%' }}>
                    <TouchableOpacity
                        onPress={() => setShowCompleted(!showCompleted)}
                        style={[styles.buttonStyle, { backgroundColor: '#1aff8c' }]}>
                        <Text style={styles.buttonTextStyle}>Completed Todo's</Text>
                        {showCompleted ? <Arrow name="caretup" size={24} color="#999999" /> :
                            <Arrow name="caretdown" size={24} color="#999999" />
                        }
                    </TouchableOpacity>
                    {showCompleted ? <CompletedData completedTodo={todoData} deleteButton={(id) => deleteTodo(id)} /> : null}
                    <TouchableOpacity
                        onPress={() => setShowUncompleted(!showUncompleted)}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>Uncompleted Todo's</Text>
                        {showUncompleted ? <Arrow name="caretup" size={24} color="#999999" /> :
                            <Arrow name="caretdown" size={24} color="#999999" />
                        }
                    </TouchableOpacity>
                    {showUncompleted ? <UnCompletedData uncompletedTodo={todoData} deleteButton={(id) => deleteTodo(id)} /> : null}
                </View>
                <View style={{ marginVertical: 8 }} />
                {/* <TouchableOpacity
                    onPress={AddFirebaseData}
                    style={styles.saveButton}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green' }}>Save</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputStyle: {
        height: 50,
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: '#9933ff',
        width: '95%',
        paddingVertical: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonTextStyle: {
        color: '#999999',
        fontWeight: 'bold',
        fontSize: 18
    },
    saveButton: {
        backgroundColor: 'skyblue',
        height: 30,
        width: 70,
        marginLeft: '75%',
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tickBoxStyle: {
        backgroundColor: '#bfbfbf',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7,
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5
    }
})

export default App;