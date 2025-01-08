import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const CustomButton = ({handlePress, title, widthLength}) => {
    return (
        < TouchableOpacity onPress={handlePress}>
            <View style={styles.button} >
                <Text style={[styles.buttonText, {width: widthLength ? widthLength : 170 }]}>{title}</Text>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0061FF',
        padding: 15,
        borderRadius: 15,
        marginTop: "50",
        alignItems: 'center',
        
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        width: 200,
        
    },
})

export default CustomButton;
