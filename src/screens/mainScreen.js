import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';


const App = (props) => {

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

    const todoData = useSelector((state) => {
        return state.todoReducer;
    })

    const checkForOther = (value) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].value === value) return true;
        }
        return false;
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerStyle}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#888888' }}>Filter by category</Text>
            </View>

            <View style={{ marginTop: 20 }}>
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

            {value !== '' ? <ScrollView style={{ marginVertical: 20, height: '50%' }}>
                {todoData.map((item) => {
                    if (value === 'other' && !checkForOther(item.category)) {
                        return (
                            <View key={item.id} style={styles.eachBox}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 10, width: 10, backgroundColor: '#bfbfbf', borderRadius: 10, marginRight: 10 }} />
                                    <Text style={styles.textStyle}>{item.value}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[styles.textStyle, { fontSize: 12 }]}>Category1:- ({item.category})</Text>
                                    <View >{item.completed ? <Text style={{ color: 'green' }}>Completed</Text> :
                                        <Text style={{ color: 'red' }}>Incompleted</Text>}</View>
                                </View>


                            </View>
                        )
                    }
                    else if (item.category === value) {
                        return (
                            <View key={item.id} style={styles.eachBox}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 10, width: 10, backgroundColor: '#bfbfbf', borderRadius: 10, marginRight: 10 }} />
                                    <Text style={styles.textStyle}>{item.value}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[styles.textStyle, { fontSize: 12 }]}>Category:- ({item.category})</Text>
                                    <View >{item.completed ? <Text style={{ color: 'green' }}>Completed</Text> :
                                        <Text style={{ color: 'red' }}>Incompleted</Text>}</View>
                                </View>


                            </View>
                        )
                    } else return null

                })}
            </ScrollView> : <View style={{ marginVertical: 20, height: '50%' }} />}

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                    setValue('');
                    props.onClick()
                }}>
                <Text>OK</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5
    },
    buttonStyle: {
        backgroundColor: '#bfbfbf',
        width: '95%',
        paddingVertical: 10,
        marginVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headerStyle: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5
    },
    eachBox: {
        backgroundColor: '#ffffcc',
        width: '95%',
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignItems: 'center',
        alignItems: 'flex-start'
    },
    textStyle: {
        fontSize: 17,
        fontFamily: 'sans-serif-condensed',
        color: '#737373'
    },
})

export default App;