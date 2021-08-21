import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import RadioBox from './radioBox'


const phoneWidth = Dimensions.get('window').width;
const App = (props) => {
    const [count, setCount] = useState(0);

    const completedTodo = useSelector((state) => {
        return state.todoReducer;
    })

    useEffect(() => {
        // console.log("count", count)
        let temp = 0;
        completedTodo.map((item) => {
            item.completed ? temp++ : null;
        })
        setCount(temp)
    }, [completedTodo])

    const dispatch = useDispatch();
    const deleteTodoHandler = (id) => {
        console.log("first", id)
        dispatch({ type: "DELETE_TODO", id })
    }

    const updateTodoHandler = (id) => {
        console.log("hgjhjh")
        dispatch({ type: "UPDATE_TODO", id, payload: false });
    }

    return (
        <View style={{ width: phoneWidth * 0.87 }}>
            <View style={styles.heading}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4d4d4d' }}>Completed-Todo</Text>
            </View>
            <View>
                {count > 0 ? <FlatList
                    data={completedTodo}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => {
                        if (item.completed) {

                            return (

                                <View style={styles.eachBox}>
                                    <View>
                                        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center' }}>
                                            <View style={{ height: 10, width: 10, backgroundColor: '#bfbfbf', borderRadius: 10, marginRight: 10 }} />
                                            <Text style={styles.textStyle}>{item.value}</Text>

                                        </View>
                                        <Text style={[styles.textStyle, { fontSize: 12 }]}>Category:- ({item.category})</Text>
                                    </View>
                                    <View>
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity onLongPress={() => console.log("atleast")} onPress={() => deleteTodoHandler(item.id)}>
                                                <DeleteIcon name="delete" size={26} color="red" />
                                            </TouchableOpacity>
                                            <RadioBox
                                                small={true}
                                                textValue="Unmark complete"
                                                statusButton={() => updateTodoHandler(item.id)}
                                                checked={item.completed} />
                                        </View>
                                    </View>
                                </View>


                            )
                        } else {
                            return null;
                        }
                    }}
                /> : <View style={styles.eachBox}>
                    <View style={{ paddingVertical: 15 }}>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={{ height: 10, width: 10, borderRadius: 10, marginRight: 10 }} />
                            <Text style={styles.textStyle}>No completed Todo...😔</Text>

                        </View>
                        <Text style={[styles.textStyle, { fontSize: 12 }]}>please make one</Text>
                    </View>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    eachBox: {
        backgroundColor: '#b3ffcc',
        flexDirection: 'row',
        width: '95%',
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 17,
        fontFamily: 'sans-serif-condensed',
        color: '#737373'
    },
    heading: {
        backgroundColor: '#1aff8c',
        width: 150,
        alignItems: 'center',
        paddingVertical: 10,
        borderTopLeftRadius: 10
    }
})

export default App;


// '#b3ffcc'