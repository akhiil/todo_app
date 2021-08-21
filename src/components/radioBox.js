import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const App = (props) => {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
            <TouchableOpacity onPress={(props.statusButton)} style={[styles.radioStyle, { backgroundColor: props.checked ? 'green' : '#f2f2f2' }]}>
            </TouchableOpacity>
            <Text style={{ color: 'gray', fontSize: props.small ? 12 : 16 }}>{props.textValue}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    radioStyle: {
        borderWidth: 4,
        borderColor: 'lightgray',
        height: 22,
        width: 22,
        marginRight: 5,
        borderRadius: 50,
    }
})

export default App;