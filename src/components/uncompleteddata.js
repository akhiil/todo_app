import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import RadioBox from './radioBox'


const phoneWidth = Dimensions.get('window').width;

const App = (props) => {
    const [count, setCount] = useState(0);

    const uncompletedTodo = useSelector((state) => {
        return state.todoReducer;
    })

    useEffect(() => {
        console.log("count", count)
        let temp = 0;
        uncompletedTodo.map((item) => {
            !item.completed ? temp++ : null;
        })
        setCount(temp)
    }, [uncompletedTodo])

    const dispatch = useDispatch();
    const deleteTodoHandler = (id) => {
        console.log("first", id)
        dispatch({ type: "DELETE_TODO", id })
    }

    const updateTodoHandler = (id) => {
        dispatch({ type: "UPDATE_TODO", id, payload: true });
    }

    return (
        <View style={{ width: phoneWidth * 0.87 }}>
            <View style={styles.heading}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#f2f2f2' }}>Incompleted-Todo</Text>
            </View>
            <View>
                {count > 0 ? <FlatList
                    data={uncompletedTodo}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item, index }) => {
                        if (!item.completed) {
                            //  console.log(item.id, item.value)
                            return (
                                <View style={styles.eachBox}>
                                    <View>
                                        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center' }}>
                                            <View style={{ height: 10, width: 10, backgroundColor: '#bfbfbf', borderRadius: 10, marginRight: 10 }} />
                                            <Text style={styles.textStyle}>{item.value}</Text>

                                        </View>
                                        <Text style={[styles.textStyle, { fontSize: 12 }]}>Category:- ({item.category})</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => deleteTodoHandler(item.id)}>
                                            <DeleteIcon name="delete" size={26} color="red" />
                                        </TouchableOpacity>
                                        <RadioBox
                                            small={true}
                                            textValue="Mark complete"
                                            statusButton={() => updateTodoHandler(item.id)}
                                            checked={item.completed} />
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
                            <Text style={styles.textStyle}>No incompleted Todo...😔</Text>

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
        backgroundColor: '#e6b3ff',
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
        backgroundColor: '#9933ff',
        width: 150,
        alignItems: 'center',
        paddingVertical: 10,
        borderTopLeftRadius: 10,
        alignSelf: 'flex-start'
    }
})

export default App;

//'#e6b3ff'