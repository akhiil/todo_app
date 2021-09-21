import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import GoogleIcon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay';
import Direction from 'react-native-vector-icons/FontAwesome5'

GoogleSignin.configure({
    webClientId:
        "682565229541-cgptbl1fc1026o2lmp44a2l79rspqv7n.apps.googleusercontent.com",
});


const App = (props) => {
    const [spinner, setSpinner] = useState(false);


    async function onGoogleButtonPress() {
        setSpinner(true);
        try {
            const { idToken } = await GoogleSignin.signIn();
            //   console.log(idToken)
            // saveData(idToken);
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);

        } catch (err) {
            console.log(err)
        }
        setSpinner(false)
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#4d79ff' }}>

            {/* <View style={{}}>
                <Logo height={200} width={200} />
                <Text style={styles.thinTextStyle}>Charzer</Text>
                <Text style={styles.thickTextStyle}>Assignment</Text>
            </View>
            <Spinner
                visible={spinner}
                textContent={'please wait...'}
                textStyle={{ color: 'white' }}
            />
            <View style={{ marginTop: 70 }} />

            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {
                    await onGoogleButtonPress();
                    props.navigation.replace('HomeScreen');
                }} /> */}


            <View style={styles.upperPartStyle}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', }}>Todo - App</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'cursive', fontSize: 18 }}>save your todos</Text>
            </View>
            <Spinner
                visible={spinner}
                textContent={'please wait...'}
                textStyle={{ color: 'white' }}
            />
            <View style={styles.lowerPartStyle}>
                <View style={{ flex: 0.5, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                        <Text style={{ color: '#4d79ff', fontWeight: 'bold', fontSize: 22, marginRight: 25, }}>Please login</Text>
                        <Direction name="hand-point-right" size={72} color="black" />
                    </View>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={async () => {
                            await onGoogleButtonPress();
                            props.navigation.replace('HomeScreen');
                        }} />
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    thinTextStyle: {
        fontSize: 28,
        fontWeight: '200',
        color: '#404040'
    },
    thickTextStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#404040'
    },
    upperPartStyle: {
        height: '25%',
        justifyContent: 'flex-end'
    },
    lowerPartStyle: {
        backgroundColor: 'white',
        marginTop: 40,
        paddingTop: 20,
        borderTopEndRadius: 25,
        borderTopLeftRadius: 25,
        height: '100%',
        alignItems: 'center',
    }
})

export default App;