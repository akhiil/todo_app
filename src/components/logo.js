import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
const App = (props) => {

    const fontHeight = () => {
        return (28 / 100) * props.height;
    }
    const borderwidth = () => {
        return (8 / 100) * props.width;
    }

    return (
        <View style={[styles.logoStyle, { height: props.height, width: props.width, borderWidth: borderwidth() }]}>
            <Text style={{ fontSize: fontHeight(), fontWeight: 'bold', color: '#9933ff' }}>Todo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        backgroundColor: '#1aff8c',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#9933ff'
    },
    textStyle: {

    }
})

export default App;