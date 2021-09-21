
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, FlatList, AsyncStorage } from 'react-native';
import CrossIcon from 'react-native-vector-icons/Entypo'
import BellIcon from 'react-native-vector-icons/Feather'
import styles from '../components/css';
import date from 'date-and-time';
import auth from '@react-native-firebase/auth';
import NoteIcon from 'react-native-vector-icons/FontAwesome'
import CategoryIcon from 'react-native-vector-icons/AntDesign'
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from 'react-native-check-box'
import uuid from 'react-native-uuid';
import asyncStorage from '../components/asynFunction'

const App = (props) => {
    const [todoInput, setTodoInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false)
    const [email, setEmail] = useState('');
    const [value, setValue] = useState('');
    const [items, setItems] = useState([
        { selected: false, value: 'Work' },
        { selected: false, value: 'Music' },
        { selected: false, value: 'Travel' },
        { selected: false, value: 'Study' },
        { selected: false, value: 'Home' },
        { selected: false, value: 'Shopping' },
        { selected: true, value: 'Other' }
    ]);

    // console.log(email)

    const user = auth().currentUser;

    const now = new Date();
    const pattern = date.compile('MMM DD YYYY');
    const createdAt = date.format(now, pattern);

    const selectCategoryHandler = (value) => {
        console.log(value)
        const temp = [...items];
        temp.map((item) => {
            if (item.value === value) {
                item.selected = true
            } else {
                item.selected = false;
            }
        })
        setItems(temp)
    }

    const addTodoHandler = async () => {
        let cat;
        items.map((item) => {
            if (item.selected) {
                cat = item.value
            }
        })
        const todo = {
            id: uuid.v4(),
            value: todoInput,
            completed: isCompleted,
            created: createdAt,
            category: cat
        }

        // await asyncStorage.removeItem(user?.email)
        const data = await asyncStorage.getItem(user?.email)
        if (data == null) {
            await asyncStorage.setItem(user?.email, [todo])
        } else {
            await asyncStorage.setItem(user?.email, [...data, todo])
        }

        props.navigation.replace('HomeScreen')
    }



    return (
        <View style={styles.createScreenContainer}>

            <View style={styles.createScreenHeader}>
                <Text style={{ fontSize: 20 }}>New Task</Text>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <CrossIcon name="cross" size={26} />
                </TouchableOpacity>
            </View>

            <View style={styles.createScreenBox}>
                <Text style={{ marginBottom: -35, color: 'gray', fontSize: 16 }}>What are you planning ?</Text>
                <TextInput
                    value={todoInput}
                    placeholderTextColor="gray"
                    multiline={true}
                    onChangeText={(value) => setTodoInput(value)}
                    style={{ height: 150, width: '90%', color: 'black', borderBottomWidth: 1, borderColor: 'lightgray' }}
                />
            </View>

            <View style={{ marginTop: 10 }}>
                <View style={styles.createdScreenIcons}>
                    <BellIcon name="bell" size={22} color="#4d79ff" />
                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>{createdAt}</Text>
                </View>




                <View style={[styles.createdScreenIcons, { width: '70%' }]}>
                    {/* <NoteIcon name="sticky-note-o" size={22} color="gray" /> */}
                    <CheckBox
                        style={{ flex: 1, padding: 5 }}
                        onClick={() => setIsCompleted(!isCompleted)}
                        isChecked={isCompleted ? true : false}
                        leftText={"Completed"}
                        Text={"Completed"}
                        leftTextStyle={{ color: 'gray' }}
                        checkBoxColor="#4d79ff"
                    />
                </View>
                <View style={[styles.createdScreenIcons, { width: '70%' }]}>
                    <CheckBox
                        style={{ flex: 1, padding: 5 }}
                        onClick={() => setIsCompleted(!isCompleted)}
                        isChecked={isCompleted ? false : true}
                        leftText={"Incompleted"}
                        leftTextStyle={{ color: 'gray' }}
                        checkBoxColor="#4d79ff"
                    />
                </View>
            </View>



            <View style={{ marginTop: 5 }}>
                <View style={{ padding: 5, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Select Category</Text>
                </View>
                <FlatList
                    data={items}
                    keyExtractor={(items) => items.value}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => selectCategoryHandler(item.value)}
                                style={[styles.eachCategoryStyles, { backgroundColor: item.selected ? '#809fff' : '#b3c6ff' }]}>
                                <Text style={{ fontSize: 15 }}>{item.value}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={() => addTodoHandler()}
                style={styles.createScreenButtonStyle}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>

        </View>
    )
}

export default App;