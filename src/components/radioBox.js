import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const App = (props) => {
    return (
        <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity onPress={(props.statusButton)} style={[styles.radioStyle, { backgroundColor: props.checked ? 'green' : 'lightgray' }]}>
            </TouchableOpacity>
            <Text>{props.textValue}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    radioStyle: {
        borderWidth: 3.5,
        borderColor: 'lightgray',
        height: 22,
        width: 22,
        marginRight: 5,
        borderRadius: 50,
    }
})

export default App;