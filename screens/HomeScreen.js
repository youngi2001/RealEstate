import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator
} from 'react-native'
import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { useState } from 'react'
//import * as Linking from 'expo-linking';
//import * as WebBrowser from 'expo-web-browser';

import SearchInput from '../components/SearchInput'
import { useGlobalContext } from '../context/GlobalContext'
import seed from '../lib/seed'

import icons from '../constants/icons'
import images from '../constants/images'
import { featuredCards, cards } from '../constants/data'

//importing appwrite functions
import { getCurrentUser } from '../lib/appwrite'
import { getFeaturedProperties, getProperties, getPropertiesByFilter } from '../lib/appwrite'



import { useAppwrite } from '../lib/useAppwrite'


const basicCard = [
  {
    key: 1,
    title: "Basic 1",
    location: "Location",
  },
  {
    key: 2,
    title: "Basic 1",
    location: "Location",
  },
  {
    key: 3,
    title: "Basic 1",
    location: "Location",
  },
  {
    key: 4,
    title: "Basic 1",
    location: "Location",
  }

]


import { FeaturedCardView, BasicView } from '../components/CardView'
import Filters from '../components/Filters'


export default function HomeScreen({ navigation, route }) {
  //const [homeSearchValue, setHomeSearchValue] = useState('')
  const { user, setUser, searchValue, selectedCategory, isLoggedIn} = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false);

  //name, type, description, address, price, area, bedrooms, bathrooms, rating, facilities, image, geolocation, agent, gallery, reviews
  const handlePropertyPress = (info) => {
    navigation.navigate('Details', { itemDetails: info })
  }

  //console.log(selectedCategory)



  const { data: latestProperties, refetch, loading: loadingLatestProperties } = useAppwrite({
    fn: getFeaturedProperties,
  })
  const { data: properties, refetch: refetchProperties, loading: loadingProperties } = useAppwrite({
    fn: getProperties,
    params: {
      filter: selectedCategory,
      query: searchValue,
      limit: 6
    },
    skip: true
  })

  //console.log(properties)

  useEffect(() => {
    refetchProperties({
      filter: selectedCategory,
      query: searchValue,
      limit: 6
    })
  }, [selectedCategory, searchValue])

  useEffect(()=>{
    if(!isLoggedIn){
      navigation.navigate("AuthStack")
    }
  })
  //console.log(selectedCategory)

  const onRefresh = async () => {
    setRefreshing(true);
    //refetch data and update list of videos
    await refetchProperties({
      filter: selectedCategory,
      query: searchValue,
      limit: 6
    })
    setRefreshing(false);
  };

  //console.log(properties)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={{}}>
            <BasicView data={item} moreDetails={() => { handlePropertyPress(item) }} />
          </View>
        )}
        numColumns={2}


        ListHeaderComponent={(
          <>
            <View style={styles.profileBar}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Image source={images.avatar} style={{ height: 50, width: 50, borderRadius: 50 }} resizeMode='cover' />
                <View style={{ marginLeft: 10, }}>
                  <Text style={{ textAlign: "left", fontSize: 13 }}>Good Morning</Text>
                  <Text style={{ textAlign: "left", fontSize: 14, fontFamily: 'Rubik-Medium' }}>{user.username}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image source={icons.bell} style={{ height: 25, width: 25, marginRight: 10 }} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchView}>
              <SearchInput />
            </View>

            <View style={styles.featuredView}>
              {loadingLatestProperties ? <ActivityIndicator size={"large"} color="#0061FF" style={{ marginTop: 100 }} /> :
                !latestProperties || latestProperties.length === 0 ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}>
                    <Image source={images.noResult} style={{ height: 200, width: 200 }} resizeMode='contain' />
                    <Text style={{ fontSize: 16, fontFamily: 'Rubik-Medium', color: '#6B6C70', marginTop: 10 }}>No Results Found</Text>
                  </View>
                  :
                  (
                    <>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, }}>
                        <Text style={{ color: '#000000', fontSize: 16, fontFamily: 'Rubik-Medium', }}>Featured</Text>
                        <Text style={{ color: '#0061FF', fontSize: 16, fontFamily: 'Rubik-Medium', }}> See All</Text>
                      </View>
                      <FlatList
                        data={latestProperties}
                        keyExtractor={(item) => item.$id}
                        renderItem={({ item }) => (
                          <FeaturedCardView data={item} moreDetails={() => { handlePropertyPress(item) }}/>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                      />
                    </>
                  )
              }


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, }}>
                <Text style={{ color: '#000000', fontSize: 16, fontFamily: 'Rubik-Medium', }}>Our Recommendations</Text>
                <Text style={{ color: '#0061FF', fontSize: 16, fontFamily: 'Rubik-Medium', }}> See All</Text>
              </View>

              <Filters />

            </View>
          </>
        )}

        //onRefresh={<RefreshControl onRefresh={onRefresh} />}

        ListEmptyComponent={(

          loadingProperties ? (<ActivityIndicator size="large" color="#0061FF" style={{ marginTop: 100 }} />)
            :
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}>
              <Image source={images.noResult} style={{ height: 200, width: 200 }} resizeMode='contain' />
              <Text style={{ fontSize: 16, fontFamily: 'Rubik-Medium', color: '#6B6C70', marginTop: 10 }}>No Results Found</Text>
            </View>)}


      />

      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    height: 65,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  searchView: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  featuredView: {
    marginTop: 10,
    paddingHorizontal: 10,
  }
})