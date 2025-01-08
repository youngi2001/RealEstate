import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native'
import React, { use } from 'react'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import { useGlobalContext } from '../context/GlobalContext';

import Ionicons from '@expo/vector-icons/Ionicons';
import icons from '../constants/icons';

const SearchInput = ({ onSearch, }) => {
    const [search, setSearch] = useState("");
    const { setSearchValue, searchValue } = useGlobalContext()

    const debouncedSearch = useDebouncedCallback((value) => {
        setSearchValue(value)
     }, 800);

    const handleSearch = (text) => {
        debouncedSearch(text)
        setSearch(text)
    };

    // console.log(searchValue)

    

    return (
        <View style={styles.searchView} >

            <TouchableOpacity
                onPress={onSearch}
                style={styles.searchButton}
            >
                <Ionicons name="search" size={25} color="#92929d" />
            </TouchableOpacity>
            <TextInput
                placeholder='Search something'
                placeholderTextColor="#CDCDE0"
                style={styles.searchInput}
                onChangeText={handleSearch}
                value={search}
                returnKeyType='search'
                onSubmitEditing={onSearch}

            />
            <TouchableOpacity style={styles.filterButton}>
                <Image source={icons.filter} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    searchView: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 10,
        height: 55,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#D3D6E3",
        flexDirection: "row",
        alignItems: "center",

    },
    searchInput: {
        color: "#92929d",
        fontSize: 18,
        width: "70%",
        height: "100%",

    },
    searchButton: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "#494855",
        height: "100%",
    },
    filterButton: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "#494855",
        height: "100%",
    }
})


export default SearchInput