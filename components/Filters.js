import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react'
import React from 'react'

import { categories } from '../constants/data';
import { useGlobalContext } from '../context/GlobalContext';

const Filters = () => {
    const { searchValue, setSearchValue, selectedCategory, setSelectedCategory } = useGlobalContext()

    const handleFilterPress = (category) => {
        // if(selectedCategory === category){
        //     setSelectedCategory("All");
        //     //setSearchValue("All")
        // }else{
        //     setSelectedCategory(category)
        //     //setSearchValue(category)
        // }
        setSelectedCategory(category)
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, }}>

                {
                    categories.map((item, index) => (
                        <TouchableOpacity key={index}
                            style={selectedCategory === item.category ?
                                styles.filtersMenuView
                                :
                                [styles.filtersMenuView, { backgroundColor: "white", borderWidth: 1, borderColor: "#6B6C70" }]}
                            onPress={() => handleFilterPress(item.category)}
                        >
                            <Text style={selectedCategory === item.category ?
                                styles.filtersMenuText
                                : [styles.filtersMenuText, { color: "#92929d" }]}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    filtersMenuView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: "#0061FF",
        borderRadius: 50,
        marginHorizontal: 5,


    },
    filtersMenuText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 25,
        fontFamily: 'Rubik-Medium'

    }
})

export default Filters