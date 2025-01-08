import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image } from 'react-native'
import { useEffect } from 'react';
import React from 'react'

import { useGlobalContext } from '../context/GlobalContext';

import icons from '../constants/icons';
import images from '../constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OnboardingScreen({ navigation }) {

    const { isLoggedIn, setIsLoggedIn } = useGlobalContext()

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('HomeTabs')
        }
    }, [])

    const handleLogin = async () => {
        try {
            navigation.navigate('AuthStack')

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <View style={{ height: "65%" }}>
                <Image source={images.onboarding} style={{ height: "100%", width: "100%", }} resizeMode='contain' />
            </View>
            <View style={{  }}>
                <View style={{}}>
                    <Text style={styles.welcomeText}>WELCOME TO REAL SCOUT</Text>
                    <Text style={styles.mainText}>Let's Get You Closer</Text>
                    <Text style={[styles.mainText, { fontSize: 24, marginTop: -8 }]}>To <Text style={{ color: "#0061FF" }}> Your Ideal Home </Text></Text>

                    <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("AuthStack")}>
                        <Ionicons name="mail" size={24} color="black" />
                        <Text style={styles.buttonText}>Create an account</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
        backgroundColor: '#fff',

    },
    mainText: {
        textAlign: 'center',
        fontSize: 27,
        fontFamily: 'Rubik-Medium'

    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Rubik-Regular',
        color: "#666876",
        marginBottom: 10
    },
    loginText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Rubik-Regular',
        color: "#666876"
    },
    signupButton: {
        marginTop: 40,
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 25,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowOpacity: 0.25, // iOS shadow
        shadowRadius: 3.84, // iOS shadow
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 15,

    },
    buttonText: {
        color: "#191D31",
        fontSize: 17,
        fontFamily: 'Rubik-Regular',
        fontWeight: '700',
        marginLeft: 10
    }
})