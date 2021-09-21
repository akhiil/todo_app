import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import BoxData from '../components/boxData'
import styles from '../components/css';
import BackIcon from 'react-native-vector-icons/MaterialIcons'
import ThreeDots from 'react-native-vector-icons/Entypo';
import AllIcon from 'react-native-vector-icons/Foundation'
import WorkIcon from 'react-native-vector-icons/Ionicons';
import MusicIcon from 'react-native-vector-icons/FontAwesome5'
import TravelIcon from 'react-native-vector-icons/SimpleLineIcons'
import StudyIcon from 'react-native-vector-icons/AntDesign';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import ShoppingIcon from 'react-native-vector-icons/Feather';
import OtherIcon from 'react-native-vector-icons/AntDesign';
import asynFunction from '../components/asynFunction';
import auth from '@react-native-firebase/auth';

const App = (props) => {
    const [tempvalue, setTempValue] = useState(true);
    const [deleteTodoList, setDeleteTodoList] = useState([]);
    const [todoData, setTododData] = useState([])

    const name = props.route.params.name

    useEffect(async () => {
        // console.log(user?.email)
        const data = await asynFunction.getItem(user?.email);
        const temp = [];
        data.map((item) => {
            if (item.category === name) {
                temp.push(item)
            } else if (name === "All") {
                temp.push(item)
            }
        })
        setTododData(temp);
    }, [todoData])

    const user = auth().currentUser;

    const iconFinder = (value) => {
        switch (value) {
            case ('All'):
                return <AllIcon name="clipboard-notes" size={26} color="#4d79ff" />;
            case ('Music'):
                return <MusicIcon name="headphones-alt" size={24} color="#ff99dd" />;
            case ('Work'):
                return <WorkIcon name="briefcase-outline" size={24} color="#ffa64d" />;
            case ('Travel'):
                return <TravelIcon name="plane" size={24} color="#00cc66" />;
            case ('Study'):
                return <StudyIcon name="laptop" size={24} color="#bf80ff" />;
            case ('Home'):
                return <HomeIcon name="home" size={26} color="#ff8533" />;
            case ('Shopping'):
                return <ShoppingIcon name="shopping-bag" size={24} color="#d966ff" />;
            case ('Other'):
                return <OtherIcon name="switcher" size={24} color="#8cff1a" />;
        }
    }


    const itemCompletedHandler = (id, value) => {
        setTempValue(!tempvalue)
        if (id && value)
            dispatch({ type: 'UPDATE_TODO', payload: value, id })
    }

    const deleteTodoListHandler = (id) => {
        setDeleteTodoList([...deleteTodoList, id])
    }

    const deleteTodoHandler = async (id) => {
        // console.log("dekete button", id)
        const data = await asynFunction.getItem(user?.email);
        // console.log(data);
        const temp = [];
        data.map((item) => {
            if (item.id != id) {
                temp.push(item);
            }
        })
        setTododData(temp);
        await asynFunction.setItem(user?.email, temp)
    }



    return (
        <View style={styles.categoryScreenContainer}>

            <View style={styles.categoryHeaderIcons}>
                <TouchableOpacity onPress={() => props.navigation.replace('HomeScreen')}>
                    <BackIcon name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={deleteTodoHandler}>
                    <ThreeDots name="dots-three-vertical" size={22} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.categoryScreenIconStyle}>
                {iconFinder(name)}
            </View>

            <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                <Text style={styles.categoryScreenTextName}>{name}</Text>
                <Text style={{ color: 'white' }}>{todoData.length} tasks</Text>
            </View>

            <View style={styles.tododataShowStyle}>
                <BoxData
                    data={todoData} name={name}
                    onUpdateCompleted={(id, value) => itemCompletedHandler(id, value)}
                    deleteSingleTodo={(id) => deleteTodoHandler(id)}
                    deleteList={deleteTodoList}
                />
            </View>
        </View>
    )
}

export default App;