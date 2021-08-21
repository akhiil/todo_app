import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image, ScrollView, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import Header from '../components/header';
import FilterModal from './mainScreen';
import RadioBox from '../components/radioBox'
import DownIcon from 'react-native-vector-icons/AntDesign';
import TodoDataShow from '../components/todoDataShow'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';


// const reference = database().ref('/users/123');
//const tempToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExMmU0YjUyYWI4MzMwMTdkMzg1Y2UwZDBiNGM2MDU4N2VkMjU4NDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2ODI1NjUyMjk1NDEtNHZrODJqMmJjdDh0cGIxcTRwcjMydmh0ODd1dDhjZzcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2ODI1NjUyMjk1NDEtY2dwdGJsMWZjMTAyNm8ybG1wNDRhMmw3OXJzcHF2N24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY5NzIzNjI2NDI3NTM4NTQ1OTEiLCJlbWFpbCI6ImFraGlsY3NrMTExMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkFraGlsIEt1bWFyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnMndocllPdXFHUi1MVEdkdDFvQjgtWm9vZkpNaUhqZGJUdkxuaD1zOTYtYyIsImdpdmVuX25hbWUiOiJBa2hpbCIsImZhbWlseV9uYW1lIjoiS3VtYXIiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTYyNDUxMjc3OCwiZXhwIjoxNjI0NTE2Mzc4fQ.Pouadbw40sx6UjxfZrsbIj2q98NdwKPvBC2KrpSEZRFJT0AXHn0g7Y7G1ZlC8auvi1TeOUkqu6zLCDLMKMVUeWzhlYXb3zq-aOltFhVSmd_13CJRi3jzz976hHAogidRhbj7X71ee636PcP3CeFAyeBj7ql9Bct7AUnaqCgqV2pTVYRdBqE1iCvIunF79iCr_z_rXMU83SKqLpJ9GlFwQC8KIrwkMBnPL1UQxZyIMFLFnzc6hKtJpcgrNxJKk_xgqimiiOPiPO2d0HCxMfmdQk3tCWxScK7We6EHEvI19J6yqIWJcgjbIu1gPzOJSMWvzaL1x8ctNN2TV7NESSdgYA"
const App = (props) => {
    const [objectArray, setObjectArray] = useState([]);
    const [stringArray, setStringArray] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [status, setStatus] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isfilterModalVisible, setIsfilterModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([
        { label: 'Work', value: 'work' },
        { label: 'Fitness', value: 'fitness' },
        { label: 'Assignment', value: 'assignment' },
        { label: 'Shopping-list', value: 'shopping-list' },
        { label: 'Milestone', value: 'milestone' },
        { label: 'Other', value: 'other' }
    ]);
    const [otherCategory, setOtherCategory] = useState('');



    const dispatch = useDispatch();

    const todoData = useSelector((state) => {
        return state.todoReducer
    })

    // console.log(todoData)


    const addTodoHandler = () => {
        if (todoInput !== "") {
            dispatch({
                type: 'ADD_TODO', value: todoInput, completed: status,
                category: value === 'other' ? otherCategory : value === '' ? 'work' : value
            })
        }
        setTodoInput('');
        setStatus(false);
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
                        showSoftInputOnFocus={false}
                        placeholder="Add your todo"
                        placeholderTextColor='#cccccc'
                        style={styles.inputStyle}
                        onChange={(value) => setTodoInput(value.nativeEvent.text)}
                        value={todoInput}
                        onSubmitEditing={addTodoHandler}
                        onPressIn={() => setIsModalVisible(true)}
                    />
                </View>
                {/* <Spinner
                    visible={spinner}
                    textContent={'Fetching data...'}
                    textStyle={{ color: 'white' }}
                /> */}

                <TouchableOpacity
                    onPress={() => setIsfilterModalVisible(true)}
                    style={styles.filterButtonStyle}>
                    <Text style={{ color: '#f2f2f2', marginRight: 5 }}>Filter by Category</Text>
                    <DownIcon name="caretdown" size={20} color="#4d4d4d" />
                </TouchableOpacity>

                {/* filter screen modal */}

                <Modal
                    style={{}}
                    animationInTiming={800}
                    animationOutTiming={800}
                    animationIn={'slideInDown'}
                    animationOut={'slideOutDown'}
                    isVisible={isfilterModalVisible}>
                    <FilterModal onClick={() => setIsfilterModalVisible(false)} />
                </Modal>


                {/* modal part */}
                <Modal
                    style={{ top: 0 }}
                    animationInTiming={800}
                    animationOutTiming={800}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                    isVisible={isModalVisible}>
                    <View style={styles.modalStyle}>
                        <Text style={{ color: 'gray', fontWeight: 'bold', marginBottom: 5 }}>Hello, {user?.displayName} !!</Text>
                        <TextInput
                            placeholderTextColor='#cccccc'
                            style={styles.inputStyle}
                            placeholder="enter your todo"
                            onChange={(value) => setTodoInput(value.nativeEvent.text)}
                            value={todoInput}
                        />

                        <View style={{ width: '80%', marginTop: 10 }}>
                            <DropDownPicker
                                placeholder="Select a category"
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                maxHeight={150}
                                style={{
                                    backgroundColor: "#e6e6e6"
                                }}
                                textStyle={{
                                    fontSize: 15
                                }}
                            />
                        </View>

                        {value === 'other' ? <TextInput
                            placeholderTextColor='#cccccc'
                            style={[styles.inputStyle, { width: '70%', height: 40, marginTop: 5 }]}
                            placeholder="please specify..."
                            onChange={(value) => setOtherCategory(value.nativeEvent.text)}
                            value={otherCategory}
                        /> : null}


                        <View style={{ marginTop: 10 }}>
                            <RadioBox textValue="Completed" statusButton={statusButton} checked={status} />
                            <RadioBox textValue="In-completed" statusButton={statusButton} checked={status ? false : true} />
                        </View>


                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                backgroundColor: 'gray',
                                padding: 10,
                                paddingHorizontal: 20,
                                borderRadius: 5,
                                marginRight: 20,
                                marginTop: 20
                            }}
                            onPress={() => {
                                addTodoHandler();
                                setOtherCategory('');
                                setValue('')
                                setIsModalVisible(false)
                            }}>
                            <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* modal part */}


                <ScrollView style={{}} horizontal={true}>
                    <TodoDataShow todoData={todoData} />
                </ScrollView>
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
    inputStyle: {
        fontSize: 18,
        width: '85%',
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        paddingHorizontal: 15,
        fontFamily: 'sans-serif-condensed',
        color: '#737373'
    },
    modalStyle: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        top: 80,
        paddingBottom: 30
    },
    filterButtonStyle: {
        backgroundColor: '#999999',
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 5,
        borderRadius: 5,
        flexDirection: 'row',
    }
})

export default App;