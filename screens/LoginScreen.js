import {
    View,
    Text,
    StyleSheet,
    Button,
    Platform,
    StatusBar,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    ScrollView,
    Keyboard
} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'

import { CustomTextInput, PasswordInput } from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

import { useGlobalContext } from '../context/GlobalContext';

//appwrite functions
import { signIn } from '../lib/appwrite';
import { getCurrentUser } from '../lib/appwrite';


export default function LoginScreen({ navigation }) {
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useGlobalContext()


    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('HomeTabs')
        }
    })


    const handleLogin = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Please fill all fields")
            return
        }
        try {
            const response = await signIn(form)
            const getUser = await getCurrentUser()
            if (response) {
                setUser(getUser);
                if (user) {
                    setIsLoggedIn(true)
                }
            }
        } catch (error) {
            Alert.alert("Invalid Credentials", error.message)
        } finally {
            setForm({
                email: "",
                password: ""
            })
        }
    }


    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <StatusBar backgroundColor="#F1F1F1F1" barStyle="dark-content" />
            <ScrollView style={styles.containerScrollView}>
                <View style={styles.upperView}>
                    <View style={styles.loginSignup}>
                        <TouchableOpacity style={styles.loginUpper} >
                            <Text style={{ textAlign: "center", color: '#FFFFFF', fontSize: 18 }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUpUpper} onPress={() => navigation.navigate('Signup')}>
                            <Text style={{ textAlign: "center", color: '#000000', fontSize: 18 }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={{ textAlign: "center", fontSize: 21, fontWeight: "900", margin: 20 }}>Let's log you in</Text>
                        <Text style={{ textAlign: "center", fontSize: 18, color: "#A9A9A9" }}>Welcome back You've been missed</Text>
                        <CustomTextInput value={form.email} onTextChange={(text) => setForm({ ...form, email: text })} placeHolderText="Enter a valid email" fieldName={"Email"} />
                        <PasswordInput value={form.password} setPassword={(text) => setForm({ ...form, password: text })} placeHolderText="Enter password" fieldName={"Password"} />
                        <View style={{ marginTop: "50%", width: "100%", }}>
                            <CustomButton title="Login" handlePress={handleLogin} />
                            <Text style={{ textAlign: "center" }}>Or</Text>
                            <View style={styles.signUpLabel}>
                                <Text style={{ color: "#92929d" }}>
                                    Don't Have an Account?
                                </Text>
                                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Signup")}>
                                    <Text style={{ color: "#0061FF" }}>Sign Up</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        //borderWidth: 1,
        //borderColor: "red",


    },
    containerScrollView: {
        backgroundColor: "#FFFFFF",
        height: "100%"

    }, upperView: {
        backgroundColor: '#F1F1F1',
        height: 90,
        paddingBottom: 10,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '100%',
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    loginSignup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#FFFFFF',
        height: 65,
        borderRadius: 20,
        margin: 10,

    },
    loginUpper: {
        backgroundColor: '#0061FF',
        padding: 10,
        borderRadius: 10,
        width: '48%'
    },
    signUpUpper: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        width: '48%'
    },

    signUpLabel: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    }

})