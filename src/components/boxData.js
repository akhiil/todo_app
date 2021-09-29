import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const App = (props) => {


    return (
        <View>
            <FlatList
                data={props.data}
                ListFooterComponent={<View style={{ height: 350 }} />}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.eachBox}>
                            <View style={{ width: '80%' }}>
                                <Text style={styles.eachBoxTextName}>{item.value}</Text>
                                <View>{props.name === 'All' ?
                                    <Text style={{ color: '#a6a6a6' }}> category:- {item.category}</Text> : null
                                }</View>
                                <View>{item.completed ? <Text style={{ color: '#4d79ff' }}>completed</Text> : <Text style={{ color: 'red' }}>Incompleted</Text>}</View>
                                <Text style={styles.dateStyle}>Created at:- {item.created}</Text>
                            </View>
                            <View style={{ width: '20%' }}>
                                <TouchableOpacity
                                    onPress={() => props.deleteSingleTodo(item.id)}
                                    style={styles.deleteButtonStyle}>
                                    <Text style={{ color: 'white' }}>delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    eachBox: {
        marginVertical: 5,
        padding: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
    },
    eachBoxTextName: {
        fontSize: 18,
        color: '#595959'
    },
    dateStyle: {
        color: '#888888',
        fontSize: 12
    },
    deleteButtonStyle: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5
    }
})

export default App;