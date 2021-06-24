import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {

    const user = auth().currentUser;
    return (
        <View style={{}}>
            <Text style={{}}>You're Logged In</Text>
            <Image source={{ uri: user?.photoURL }} style={{ height: 100, width: 100 }} />
            <Text style={{}}>{user?.displayName}</Text>
            <Text style={{}}>{user?.email}</Text>
            <View style={{ marginTop: 30 }}>
                <Button title="Signout" onPress={() => auth().signOut()} />
            </View>
        </View>
    );
}
export default App;