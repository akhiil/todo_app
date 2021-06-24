import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import Header from '../components/header'

const App = (props) => {

    const onSignOut = async () => {
        await auth().signOut()
        props.navigation.replace('Login')
    }

    const user = auth().currentUser;
    return (
        <View style={styles.container}>
            <Header name="Account" />
            <View style={{ marginTop: 50 }} />
            <View style={{ borderWidth: 8, borderRadius: 100 }}>
                <Image source={{ uri: user?.photoURL }} style={styles.imageStyle} />
            </View>
            <Text style={styles.TextStyle}>{user?.displayName}</Text>
            <Text style={styles.TextStyle}>{user?.email}</Text>
            <View style={{ marginTop: 50 }}>
                <Button title="Signout" onPress={onSignOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',

    },
    TextStyle: {
        fontSize: 18,
        marginTop: 5
    },
    imageStyle: {
        height: 120,
        width: 120,
        borderRadius: 100
    }
})

export default App;