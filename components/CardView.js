import React from 'react';
import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';

import images from '../constants/images';
import icons from '../constants/icons';



export const FeaturedCardView = ({ data: { name, address, price, rating, image }, moreDetails }) => {
    return (
        <TouchableOpacity style={styles.featuredCardView} onPress={moreDetails}>
            
            <ImageBackground style={{
                height: 220,
                width: 180,
                borderRadius: 20,
                marginVertical: 10,
                overflow: 'hidden',
                marginTop: 15,
            }}
                source={{ uri: image }}

            >
                <View style={{ width: '100%', }}>
                    <View style={{
                        marginTop: 15,
                        position: 'absolute',
                        left: "70%",
                        backgroundColor: '#FFFFFF',
                        width: 40,
                        padding: 2,
                        borderRadius: 20,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Image source={icons.star} style={{ height: 15, width: 15, marginRight: 2 }} />
                        <Text style={{ fontSize: 11 }}>{rating}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', height: 200, width: '100%', marginTop: "70%" }}>

                    <Text style={styles.titleText}>{name}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'Rubik-Regular', marginHorizontal: 10 }}>{address}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'Rubik-Bold', marginHorizontal: 10, }}>$ {price}</Text>
                    <Image source={icons.heart} style={{ height: 20, width: 20, position: "absolute", left: "80%", top: "29%" }} />

                </View>

            </ImageBackground>
        </TouchableOpacity>
    );
}

export const BasicView = ({ data: { name, address, price, image }, moreDetails }) => {
    return (
        <View style={styles.basicCardView}>
            <TouchableOpacity style={styles.basicCardContainer} onPress={moreDetails}>
                <Image source={{ uri: image }} style={{ height: 130, width: 145, margin: 7, borderRadius: 7 }} resizeMode='cover' />
                <Text style={styles.basicViewTitleText} ellipsizeMode='tail' numberOfLines={1}>{name}</Text>
                <Text style={{ color: '#6B6C70', fontSize: 11, fontFamily: 'Rubik-Regular', marginHorizontal: 10, width: 120 }} ellipsizeMode='tail' numberOfLines={1}>{address}</Text>
                <Text style={{ color: '#0061FF', fontSize: 13, fontFamily: 'Rubik-Bold', marginHorizontal: 10, width: 120 }} ellipsizeMode='tail' numberOfLines={1}>$ {price}</Text>
                <Image source={icons.heart} tintColor="#6B6C70" style={styles.heartIcon} />

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    featuredCardView: {
        paddingHorizontal: 10,
    },
    basicCardView: {
        paddingHorizontal: 10,

    },
    basicCardContainer: {
        height: 210,
        width: "100%",
        borderRadius: 15,
        marginVertical: 10,
        overflow: 'hidden',
        marginTop: 2,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowOpacity: 0.25, // iOS shadow
        shadowRadius: 3.84, // iOS shadow
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Rubik-Medium',
        marginHorizontal: 10,
        paddingTop: 10
    },
    basicViewTitleText: {
        color: '#000000',
        fontSize: 12,
        fontFamily: 'Rubik-Medium',
        marginHorizontal: 10,
        width: 120,


    },
    heartIcon: {
        height: 18,
        width: 18,
        position: "absolute",
        left: "80%",
        top: "85%",
    },

})


