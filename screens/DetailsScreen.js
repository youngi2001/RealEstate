import { View, Text, SafeAreaView, StyleSheet, StatusBar, Platform, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'

import { useGlobalContext } from '../context/GlobalContext'
import React from 'react'

import icons from '../constants/icons'
import images from '../constants/images'
import { facilitiesImg } from '../constants/data'

const dataSource = [
    {
        $collectionId: "677692a9000c44fc60e6",
        $createdAt: "2025-01-02T15:30:33.205+00:00",
        $databaseId: "6772ac7a002296b7a76b",
        $id: "6776b119000a94cce00c",
        $permissions: [
            "read(\"user:6772cdae00111ca255aa\")",
            "update(\"user:6772cdae00111ca255aa\")",
            "delete(\"user:6772cdae00111ca255aa\")"
        ],
        $updatedAt: "2025-01-04T15:40:09.272+00:00",
        image: "https://unsplash.com/photos/comfort-room-with-white-bathtub-and-brown-wooden-cabinets-CMejBwGAdGk"
    },
    {
        $collectionId: "677692a9000c44fc60e6",
        $createdAt: "2025-01-02T15:30:34.159+00:00",
        $databaseId: "6772ac7a002296b7a76b",
        $id: "6776b11a000750775478",
        $permissions: [
            "read(\"user:6772cdae00111ca255aa\")",
            "update(\"user:6772cdae00111ca255aa\")",
            "delete(\"user:6772cdae00111ca255aa\")"
        ],
        $updatedAt: "2025-01-04T15:40:09.279+00:00",
        image: "https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        $collectionId: "677692a9000c44fc60e6",
        $createdAt: "2025-01-02T15:30:34.396+00:00",
        $databaseId: "6772ac7a002296b7a76b",
        $id: "6776b11a0015e5d005a7",
        $permissions: [
            "read(\"user:6772cdae00111ca255aa\")",
            "update(\"user:6772cdae00111ca255aa\")",
            "delete(\"user:6772cdae00111ca255aa\")"
        ],
        $updatedAt: "2025-01-04T15:40:09.284+00:00",
        image: "https://images.unsplash.com/photo-1635108198979-9806fdf275c6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

import ReviewsPopup from '../components/ReviewsPopup'



import { facilities } from '../constants/data'

export default function DetailsScreen({ navigation, route }) {
    const { allReviewsVisible, setAllReviewsVisible } = useState(false)

    const getLastReview = (reviews) => {
        const lastReview = reviews[reviews.length - 1];
        return lastReview;
    }

    const getLastReviewerName = (reviews) => {
        const lastReview = reviews[reviews.length - 1];
        return lastReview;
    }

    const { itemDetails } = route.params;


    const propertyReviews = itemDetails.reviews.map(item => item.review);
    const propertyReviewerNames = itemDetails.reviews.map(item => item.name);

    //console.log(getLastReview(propertyReviews));

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={{ uri: itemDetails.image }} style={{ width: "100%", height: 300, }} >
                <View style={styles.topRow}>
                    <Image source={icons.backArrow} style={{ width: 25, height: 25, tintColor: "#FFF" }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={icons.heart} style={{ width: 25, height: 25, tintColor: "#FFF", marginRight: 10 }} />
                        <Image source={icons.send} style={{ width: 25, height: 25, tintColor: "#FFF" }} />
                    </View>
                </View>

            </ImageBackground>
            <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
                <Text style={styles.titleText}>{itemDetails.name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.typeText}>{itemDetails.type.toUpperCase()}</Text>
                    <Image source={icons.star} style={{ width: 18, height: 18, marginLeft: 10 }} />
                    <Text style={{ marginLeft: 5, color: "#6e809c", fontFamily: "Rubik-Medium", fontSize: 13 }}>{itemDetails.rating}
                        <Text>  ({itemDetails.reviews.length} reviews)</Text>
                    </Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>

                    <View style={styles.bedIconView}>
                        <Image source={icons.bed} style={styles.bedIcon} />
                    </View>
                    <Text style={[styles.textDefault, { marginLeft: 10, marginRight: 15 }]}>{itemDetails.bedrooms} Beds</Text>

                    <View style={styles.bedIconView}>
                        <Image source={icons.bath} style={styles.bedIcon} />
                    </View>
                    <Text style={[styles.textDefault, { marginLeft: 10, marginRight: 15 }]}>{itemDetails.bathrooms} bath</Text>

                    <View style={styles.bedIconView}>
                        <Image source={icons.area} style={styles.bedIcon} />
                    </View>
                    <Text style={[styles.textDefault, { marginLeft: 10, marginRight: 15 }]}>{itemDetails.area} sqft</Text>
                </View>

                <View style={styles.itemSeparator}></View>

                <View style={styles.agentView}>
                    <Text style={[styles.textDefault, { fontSize: 18 }]}>Agent</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={images.avatar} style={{ width: 65, height: 65, borderRadius: 50, }} resizeMode='cover' />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={[styles.textDefault, { fontSize: 16, textAlign: "left", width: 120 }]}>{itemDetails.agent.name}</Text>
                            <Text style={{ color: "#6e809c", fontFamily: "Rubik-Medium", fontSize: 13, textAlign: "left" }}>Owner</Text>
                        </View>
                        <Image source={icons.chat} style={{ width: 25, height: 25, marginLeft: 50 }} />
                        <Image source={icons.phone} style={{ width: 25, height: 25, marginLeft: 25 }} />
                    </View>
                </View>

                <View style={styles.overviewView}>
                    <Text style={[styles.textDefault, { fontSize: 18 }]}>Overview</Text>
                    <Text style={{ color: "#666876", fontFamily: "Rubik-Medium", fontSize: 15, textAlign: "left" }}>{itemDetails.description}</Text>

                </View>

                <View style={styles.facilitiesView}>
                    <Text style={[styles.textDefault, { fontSize: 18 }]}>Facilities</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                        {itemDetails.facilities.map((facility, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', marginRight: 10, }}>
                                    <View style={styles.facilitiesItemView}>
                                        <View style={styles.facilitiesIconView}>
                                            <Image source={facilitiesImg(facility)} style={{ width: 18, height: 18 }} />
                                        </View>
                                        <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.textDefault, { fontSize: 12, width: 72, textAlign: "center" }]}>{facility}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View style={styles.galleryView}>
                    <Text style={[styles.textDefault, { fontSize: 18 }]}>Gallery</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        {itemDetails.gallery.map((item, index) => {
                            return (
                                <Image key={index} source={{ uri: item.image }} style={{ width: 120, height: 120, borderRadius: 10, marginRight: 10 }} resizeMode='cover' />
                            )
                        })}
                    </ScrollView>

                </View>

                <View style={styles.locationView}>
                    <Text style={[styles.textDefault, { fontSize: 18 }]}>Location</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Image source={icons.location} style={{ width: 20, height: 20, marginRight: 10 }} resizeMode='cover' />
                        <Text style={{ color: "#666876", fontFamily: "Rubik-Medium", fontSize: 15, textAlign: "left" }}>{itemDetails.address}</Text>
                    </View>
                    <Image source={images.map} style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 10, }} resizeMode='contain' />
                </View>

                <View style={styles.reviewsView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={icons.star} style={{ width: 18, height: 18, }} />
                            <Text style={{ color: "#000", fontFamily: "Rubik-Medium", fontSize: 18, textAlign: "left", marginLeft: 10, fontWeight: "800" }}>{itemDetails.rating}
                                <Text>  ({itemDetails.reviews.length} reviews)</Text>
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setAllReviewsVisible(true)}>
                            <Text style={{ color: "#0061FF", fontFamily: "Rubik-Medium", fontSize: 16, textAlign: "left", marginRight: 10, fontWeight: "800" }}>
                                Sell All</Text>
                        </TouchableOpacity>

                        <ReviewsPopup visible={allReviewsVisible}  />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={images.avatar} style={{ width: 40, height: 40, borderRadius: 50, }} resizeMode='cover' />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={[styles.textDefault, { fontSize: 16, textAlign: "left", width: 120 }]}>
                                {
                                    getLastReviewerName(propertyReviewerNames)
                                }
                            </Text>
                        </View>

                    </View>
                    <Text style={{ color: "#666876", fontFamily: "Rubik-Medium", fontSize: 15, textAlign: "left", marginTop: 10 }}>
                        {

                            //const propertyReviews = itemDetails.reviews.map(item => item.review)
                            getLastReview(propertyReviews)
                        }
                    </Text>
                </View>

                <View style={styles.payView}>
                    <View style={{ width: "40%", }}>
                        <Text style={{ color: "#666876", fontFamily: "Rubik-Medium", fontSize: 12, textAlign: "left", marginLeft: 20 }}>PRICE</Text>
                        <Text style={{ color: "#0061FF", fontFamily: "Rubik-Medium", fontSize: 22, textAlign: "left", marginLeft: 20, marginTop: -5 }}>$ {itemDetails.price}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.payButton}>Booking Now</Text>
                    </View>

                </View>


            </View>

            <StatusBar style="auto" />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    },
    titleText: {
        fontSize: 17,
        textAlign: 'left',
        fontFamily: 'Rubik-Bold',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 65,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    typeText: {
        color: "#0061FF",
        backgroundColor: "#edf1f7",
        width: 90,
        borderRadius: 20,
        fontFamily: 'Rubik-Bold',
        textAlign: 'center',
        fontSize: 11
    },
    textDefault: {
        color: "#000",
        fontWeight: "600",
        fontFamily: 'Rubik-Medium',
        //textAlign: 'center',
        fontSize: 14,
        //marginLeft: 12
    },
    bedIcon: {
        width: 15,
        height: 15,
    },
    bedIconView: {
        backgroundColor: "#edf1f7",
        borderRadius: 50,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemSeparator: {
        borderBottomColor: '#D3D6E3',
        borderBottomWidth: 1,
        marginHorizontal: 5,
        marginTop: 20,
    },
    agentView: {
        marginTop: 15,
    },
    overviewView: {
        marginTop: 20,
    },
    facilitiesView: {
        marginTop: 20,
    },
    payView: {
        marginTop: 20,
        marginBottom: -10,
        height: 80,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#edf1f7",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 10,
        margin: -20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewsView: {
        marginTop: 20
    },
    galleryView: {
        marginTop: 20,
    },
    locationView: {
        marginTop: 20,
    },
    facilitiesIconView: {
        alignItems: 'center',
        backgroundColor: "#edf1f7",
        borderRadius: 50,
        padding: 15,
    }
    ,
    facilitiesItemView: {
        alignItems: 'center',
        //padding: 5,
        // marginRight: 10,
        marginBottom: 10,
        // borderWidth: 1,
        // borderColor: "#edf1f7",
    }, payButton: {
        color: "#FFFFFF",
        backgroundColor: "#0061FF",
        padding: 10,
        borderRadius: 50,
        width: 200,
        textAlign: 'center',
        fontFamily: 'Rubik-Bold',
        fontSize: 16,
        marginTop: 10
    }

})