import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import images from '../constants/images'
import icons from '../constants/icons'
import { CommonActions } from '@react-navigation/native'

import { useGlobalContext } from '../context/GlobalContext'
import { signOut } from '../lib/appwrite'



export default function ProfileScreen({ navigation }) {

  const { isLoggedIn, setIsLoggedIn, user, setUser, setSelectedCategory } = useGlobalContext()

  const handleLogout = async () => {
    const response = await signOut()
    if (response) {
      setIsLoggedIn(false)
      setSelectedCategory("All")
      // navigation.dispatch(
      //   CommonActions.reset({
      //       index: 0,
      //       routes: [
      //           { name: 'Onboarding' }
      //       ]
      //   }));

      setUser(null)
    }

  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}>

        <View style={styles.profileBar}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ marginLeft: 10, }}>
              <Text style={{ textAlign: "left", fontSize: 21, fontFamily: "Rubik-Medium" }}>Profile</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={icons.bell} style={{ height: 25, width: 25, marginRight: 10 }} />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={images.avatar}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              elevation: 5, // Android shadow
              shadowColor: '#000', // iOS shadow
              shadowOffset: { width: 0, height: 2 }, // iOS shadow
              shadowOpacity: 0.25, // iOS shadow
              shadowRadius: 3.84, // iOS shadow
            }} resizeMode='cover' />
          <TouchableOpacity style={styles.editView} onPress={() => navigation.navigate("Home")}>
            <Image source={icons.edit} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>

          <Text style={{ textAlign: "left", fontSize: 21, fontFamily: "Rubik-Medium", marginTop: 10 }}>{user.username}</Text>
        </View>

        <View style={styles.profileMenu}>

          <View style={styles.itemSeparator}></View>

          <TouchableOpacity style={[styles.menuItem, { marginTop: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.calendar} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>My Bookings</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { marginBottom: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.wallet} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>Payments</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

          <View style={styles.itemSeparator}></View>

          <TouchableOpacity style={[styles.menuItem, { marginTop: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.person} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>Profile</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.bell} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>Notification</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.shield} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>Security</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.language} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>Language</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.info} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>Help Center</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { marginBottom: 3 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={icons.people} style={{ height: 25, width: 25 }} />
              <Text style={styles.itemText}>Invite Friends</Text>
            </View>
            <Image source={icons.rightArrow} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={[styles.menuItem, { justifyContent: 'flex-start', alignItems: 'center' }]}>
            <Image source={icons.logout} style={{ height: 25, width: 25 }} />
            <Text style={[styles.itemText, { color: "red" }]}>Logout</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 3,

  },
  profileBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  editView: {
    position: 'absolute',
    top: 70,
    right: 125,
    padding: 5,
    borderRadius: 50,
  },
  profileMenu: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  itemSeparator: {
    borderBottomColor: '#D3D6E3',
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Rubik-Medium",
    marginLeft: 15
  }
})