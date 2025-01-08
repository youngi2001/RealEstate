import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext';


export default function ReviewsPopup({ visible, onclose }) {
    const [visibility, setVisibility] = useState(visible)


    const reviews = [
        { id: '1', reviewer: 'John Doe', text: 'Amazing app!' },
        { id: '2', reviewer: 'Jane Smith', text: 'Very useful, highly recommend.' },
        { id: '3', reviewer: 'Bob Brown', text: 'Good experience overall.' },
    ];



    const renderReview = ({ item }) => (
        <View style={styles.reviewItem}>
            <Text style={styles.reviewer}>{item.reviewer}</Text>
            <Text style={styles.reviewText}>{item.text}</Text>
        </View>
    );
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisibility(false)}

        >

            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Reviews</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setVisibility(false)}
                        >
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>

                    {/* List of Reviews */}
                    <FlatList
                        data={reviews}
                        keyExtractor={(item) => item.id}
                        renderItem={renderReview}
                        contentContainerStyle={styles.reviewList}
                    />
                </View>
            </View>

        </Modal >

        // <Modal
        //     transparent={true}
        //     visible={visible}
        //     animationType="fade"
        //     onRequestClose={onDismiss}
        // >
        //     <View style={styles.overlay}>
        //         <View style={styles.alertContainer}>
        //             <View style={{ flexDirection: "row", alignItems: "center" }}>
        //                 {/* <Ionicons name="alert-circle-sharp" size={30} color="#FFA300" /> */}
        //                 <Text style={styles.alertTextHeading}>In progress</Text>
        //             </View>
        //             <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
        //                 {/* <ActivityIndicator size="Large" color="#333" animating={visible} style={{paddingLeft: 15}}/> */}
        //                 <Text style={styles.alertText}>{message}</Text>
        //             </View>
        //             {/* <Text>Hello</Text> */}
        //         </View>
        //     </View>
        // </Modal>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 20,
    },
    closeButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    reviewList: {
        paddingBottom: 20,
    },
    reviewItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    reviewer: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    reviewText: {
        color: '#555',
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "15%",
    },
    alertContainer: {
        width: 250,
        height: "auto",
        padding: 20,
        backgroundColor: "#FFF",
        overflow: "hidden",

    },
    alertTextHeading: {
        fontSize: 20,
        color: "#333",
        paddingLeft: 15,
        fontWeight: "bold"
    },
    alertText: {
        fontSize: 15,
        color: "#333",
        paddingLeft: 25

    }

})