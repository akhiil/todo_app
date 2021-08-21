import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Logo from '../components/logo'
import GoogleIcon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';

GoogleSignin.configure({
    webClientId:
        "682565229541-cgptbl1fc1026o2lmp44a2l79rspqv7n.apps.googleusercontent.com",
});

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 6500,
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}

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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient
                colors={['#808080', '#fff', '#fff', '#808080']}
                style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center'
                }}
            >
                <FadeInView style={{}}>
                    <Logo height={200} width={200} />
                    <Text style={styles.thinTextStyle}>Charzer</Text>
                    <Text style={styles.thickTextStyle}>Assignment</Text>
                </FadeInView>
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
                        props.navigation.replace('App');
                    }} />
            </LinearGradient>
        </SafeAreaView>
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
    }
})

export default App;