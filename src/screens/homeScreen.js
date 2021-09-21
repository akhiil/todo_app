import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Button, ScrollView, Linking } from 'react-native';
import styles from '../components/css'
import { useSelector, useDispatch } from 'react-redux';
import ThreeBar from 'react-native-vector-icons/MaterialCommunityIcons';
import AllIcon from 'react-native-vector-icons/Foundation'
import WorkIcon from 'react-native-vector-icons/Ionicons';
import MusicIcon from 'react-native-vector-icons/FontAwesome5'
import TravelIcon from 'react-native-vector-icons/SimpleLineIcons'
import StudyIcon from 'react-native-vector-icons/AntDesign';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import ShoppingIcon from 'react-native-vector-icons/Feather';
import OtherIcon from 'react-native-vector-icons/AntDesign';
import PlusIcon from 'react-native-vector-icons/Feather';
import asynFunction from '../components/asynFunction';
import auth from '@react-native-firebase/auth';
import { set } from 'react-native-reanimated';

// const categories = ["All", "Work", "Music", "Travel", "Study", "Home", "Shopping", "Other"]
const categories = [{
    name: 'All',
    size: 0
}, {
    name: 'Work',
    size: 0
}, {
    name: 'Music',
    size: 0
}, {
    name: 'Travel',
    size: 0
}, {
    name: 'Study',
    size: 0
}, {
    name: 'Home',
    size: 0
}, {
    name: 'Shopping',
    size: 0
}, {
    name: 'Other',
    size: 0
}]


const App = (props) => {
    const [nameData, setNameData] = useState([]);
    const [count, setCount] = useState({
    })

    useEffect(async () => {
        const asyncData = await asynFunction.getItem(user?.email);
        let All = 0, Work = 0, Music = 0, Travel = 0, Study = 0, Home = 0, Shopping = 0, Other = 0;
        asyncData.map((item) => {
            All++
            if (item.category === 'Work') {
                Work++;
            } else if (item.category === 'Music') {
                Music++;
            } else if (item.category === 'Travel') {
                Travel++;
            } else if (item.category === 'Study') {
                Study++;
            } else if (item.category === 'Home') {
                Home++;
            } else if (item.category === 'Shopping') {
                Shopping++;
            } else if (item.category === 'Other') {
                Other++;
            }
        })

        setCount({ All, Work, Music, Travel, Study, Home, Shopping, Other })
    }, [])

    // console.log(count)

    const onSignOut = async () => {
        await auth().signOut()
        props.navigation.replace('Login')
    }



    const iconFinder = (value) => {
        switch (value) {
            case ('All'):
                return <AllIcon name="clipboard-notes" size={32} color="#4d79ff" />;
            case ('Music'):
                return <MusicIcon name="headphones-alt" size={30} color="#ff99dd" />;
            case ('Work'):
                return <WorkIcon name="briefcase-outline" size={30} color="#ffa64d" />;
            case ('Travel'):
                return <TravelIcon name="plane" size={30} color="#00cc66" />;
            case ('Study'):
                return <StudyIcon name="laptop" size={30} color="#bf80ff" />;
            case ('Home'):
                return <HomeIcon name="home" size={32} color="#ff8533" />;
            case ('Shopping'):
                return <ShoppingIcon name="shopping-bag" size={30} color="#d966ff" />;
            case ('Other'):
                return <OtherIcon name="switcher" size={30} color="#8cff1a" />;
        }
    }


    const user = auth().currentUser;


    return (

        <View style={styles.Container}>

            <View style={styles.threeBarIconStyle}>
                <ThreeBar name="playlist-edit" size={40} />
                <TouchableOpacity
                    onPress={onSignOut}
                    style={styles.logoutButtonStyle}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Log out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.homeScreenHeader}>
                <Text style={styles.homeScreenHeaderText}>Todos</Text>
            </View>



            <View>
                <FlatList data={categories}
                    numColumns={2}
                    ListFooterComponent={<View style={{ height: 200 }} />}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={[styles.categoryBoxStyle, {}]}
                                onPress={() => {
                                    props.navigation.replace('CategoryScreen', { name: item.name })
                                }} >
                                <View style={styles.categoryIconStyle}>
                                    {iconFinder(item.name)}
                                </View>
                                <Text style={styles.categoryBoxTextHeader}>{item.name}</Text>
                                <Text style={styles.categoryBoxText}>{count[item.name] ? count[item.name] : 0} tasks</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('AccountScreen');

                }}
                style={styles.plusIconStyle}>
                <PlusIcon name="plus" size={30} color="white" />
            </TouchableOpacity>

        </View>

    )
}

export default App;