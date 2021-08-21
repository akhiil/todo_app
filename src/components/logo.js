import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const App = (props) => {

    const fontHeight = () => {
        return (28 / 100) * props.height;
    }
    const borderwidth = () => {
        return (8 / 100) * props.width;
    }

    return (
        <SafeAreaView style={[styles.logoStyle, { height: props.height, width: props.width, borderWidth: borderwidth() }]}>
            <LinearGradient
                colors={['#1aff8c', '#fff', '#fff', '#1aff8c']}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 200 }}
            >
                <Text style={{ fontSize: fontHeight(), fontWeight: 'bold', color: '#7300e6' }}>Todo</Text>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logoStyle: {
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#9933ff'
    },
    textStyle: {

    }
})

export default App;