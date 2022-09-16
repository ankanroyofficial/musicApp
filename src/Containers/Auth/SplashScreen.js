import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { myContaxt } from '../../Constant/ContaxtPage'
import { song } from '../../Constant/Constant'
// import Lottie from 'lottie-react-native';

export default function SplashScreen() {

  const { allSong, setAllSong,
    lastSongDetails, setLastSongDetails,
    lastSongId, setLastSongId } = useContext(myContaxt)

  const navigation = useNavigation()


  const getallSongDetails = async () => {
    let jsonValue = await AsyncStorage.getItem('@allsong')
    if (jsonValue != null) {
      setAllSong(JSON.parse(jsonValue))
    } else {
      setAllSong(song)
    }
  }


  const getLastSongDetails = async () => {
    let jsonValue = await AsyncStorage.getItem('@lastsong')
    if (jsonValue != null) {
      setLastSongDetails(JSON.parse(jsonValue))
    }
  }

  const getLastSongid = async () => {
    let value = await AsyncStorage.getItem('@lastsongSerialNo')

    // console.log("id-----------", value)

    if (value != null) {
      setLastSongId(parseInt(value))
    }
  }
  useEffect(() => {
    getallSongDetails()
    getLastSongDetails()
    getLastSongid()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("home")
      // navigation.replace("Test")
    }, 3000)
  }, [])




  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash Screen</Text>
      {/* <Lottie source={require('../../../assets/lottie/splashScreen.json')} autoPlay loop={false} /> */}
    </View>
  )
}