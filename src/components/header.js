import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import Logo from './logo'

const App = (props) => {

    const user = auth().currentUser;
    return (
        <View style={styles.headerContainer}>
            <Logo height={45} width={45} />
            <Text style={styles.textStyle}>{props.name}</Text>
            <Image source={{ uri: user?.photoURL }} style={styles.imageStyle} />
            {/* <Text style={{}}>{user?.displayName}</Text>
            <Text style={{}}>{user?.email}</Text>
            <View style={{ marginTop: 30 }}>
                <Button title="Signout" onPress={() => auth().signOut()} />
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '90%',
        height: 60,
        borderWidth: 2,
        borderColor: '#cccccc',
        borderRadius: 30,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    textStyle: {
        fontSize: 20
    },
    imageStyle: {
        height: 45,
        width: 45,
        borderRadius: 40
    },

})

export default App;