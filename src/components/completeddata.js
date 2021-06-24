import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const App = (props) => {


    return (
        <View>
            <FlatList
                data={props.completedTodo}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => {
                    if (item.completed) {

                        return (
                            <View style={styles.eachBox}>
                                <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                                    <View style={{ height: 10, width: 10, backgroundColor: '#bfbfbf', borderRadius: 10, marginRight: 10 }} />
                                    <Text style={styles.textStyle}>{item.value}</Text>
                                </View>
                                <TouchableOpacity onPress={() => props.deleteButton(item.id)}>
                                    <DeleteIcon name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return null;
                    }
                }}
            />
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
    }
})

export default App;


// '#b3ffcc'