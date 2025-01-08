import React from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, TextInput} from 'react-native';
import { useState } from 'react';


import Feather from '@expo/vector-icons/Feather';



export const PasswordInput = ({ value, setPassword, placeHolderText, fieldName }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <View style={styles.passwordInputView} >
            <Text style={styles.fieldText}>{fieldName}</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderWidth: 1,
                height: 50,
                borderRadius: 15,
                color: "#3d3a3a",
                borderColor: "#A9A9A9",
                fontSize: 17

            }}>
                <View style={{ width: "80%" }}>
                    <TextInput value={value}
                        style={styles.passwordInput}
                        onChangeText={setPassword}
                        placeholder={placeHolderText}
                        placeholderTextColor="#92929d"
                        secureTextEntry={!showPassword}
                    />
                </View>
                <TouchableOpacity onPress={handleShowPassword}
                    style={{ width: "20%", alignItems: "center" }}>
                    <Feather name="eye" size={24} color="#A9A9A9" style={{ top: "25%" }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};


export const CustomTextInput = ({ fieldName, placeHolderText, value, onTextChange, password }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.fieldText}>{fieldName}</Text>
            <TextInput
                placeholder={placeHolderText}
                value={value}
                onChangeText={onTextChange}
                style={styles.textInput}
                secureTextEntry={password}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        width: '100%',
    },
    fieldText: {
        fontSize: 18,
        marginVertical: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        height: 50,
        borderRadius: 15,
        color: "#3d3a3a",
        borderColor: "#A9A9A9",
        fontSize: 17
    },
    passwordInputView: {
        width: "100%",
        borderRadius: 10,
        marginBottom: 15,

    },
    passwordInput: {
        color: "#3d3a3a",
        fontSize: 18,
        paddingLeft: 10,
        width: "100%",
        height: 50,
        borderRadius: 10,


    },

})


