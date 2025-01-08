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
import { createUser, getCurrentUser } from '../lib/appwrite';





export default function SignupScreen({ navigation }) {
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useGlobalContext()

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })




    const handleLogin = () => {
        console.log("Login")
        navigation.navigate('Login')
    }

    const handleSignup = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert("Please fill all fields")
            return
        }
        try {
            const response = await createUser(form)
            if (response) {
                setUser(response)
                setIsLoggedIn(true)
   
            }
        } catch (error) {
            console.log(error)
        } finally {
            setForm({
                username: "",
                email: "",
                password: ""
            })

        }
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <StatusBar backgroundColor="#F1F1F1F1" barStyle="dark-content" />
            <ScrollView style={styles.containerScrollView}>
                <View style={styles.upperView}>
                    <View style={styles.loginSignup}>
                        <TouchableOpacity style={styles.loginUpper} onPress={() => navigation.navigate('Login')}>
                            <Text style={{ textAlign: "center", color: '#000000', fontSize: 18 }}>Login</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUpUpper}>
                            <Text style={{ textAlign: "center", color: '#FFFFFF', fontSize: 18 }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <Text style={{ textAlign: "center", fontSize: 21, fontWeight: "900", margin: 20 }}>Create an account</Text>
                    <Text style={{ textAlign: "center", fontSize: 18, color: "#A9A9A9" }}>create your new account and find {"\n"} more service</Text>
                    <CustomTextInput value={form.username} onTextChange={(text) => setForm({ ...form, username: text })} placeHolderText="Choose username" fieldName={"Username"} />
                    <CustomTextInput value={form.email} onTextChange={(text) => setForm({ ...form, email: text })} placeHolderText="Enter a valid email" fieldName={"Email"} />
                    <PasswordInput value={form.password} setPassword={(text) => setForm({ ...form, password: text })} placeHolderText="Enter password" fieldName={"Password"} />
                    <View style={{ width: "100%", }}>
                        <CustomButton title="Sign up" handlePress={handleSignup} />
                        <Text style={{ textAlign: "center" }}>Or</Text>
                        <View style={styles.signUpLabel}>
                            <Text style={{ color: "#92929d" }}>
                                Already Have an Account?
                            </Text>
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color: "#0061FF" }}>Login</Text>
                            </TouchableOpacity>


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
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        width: '48%'
    },
    signUpUpper: {
        backgroundColor: '#0061FF',
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