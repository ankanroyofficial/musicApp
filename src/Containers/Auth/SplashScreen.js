import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { myContaxt } from '../../Constant/ContaxtPage'
import { song } from '../../Constant/Constant'
import SoundPlayer from 'react-native-sound-player'
// import Lottie from 'lottie-react-native';

export default function SplashScreen() {

  const { allSong, setAllSong,
    setLastSongDetails,
    setLastSongId
  } = useContext(myContaxt)

  const navigation = useNavigation()


  const getallSongDetails = async () => {
    let jsonValue = await AsyncStorage.getItem('@allsong')
    if (jsonValue != null) {
      let songPlaying = await isSongPlaying()
      if (songPlaying) {
        setAllSong(JSON.parse(jsonValue))
      } else {
        pauseAllSong(JSON.parse(jsonValue))
      }
    } else {
      setAllSong(song)
    }
  }

  const pauseAllSong = (val) => {
    let oldarr = val
    let newArr = []
    oldarr.map((item) => {
      item.isPlaying = false
      newArr.push(item)
    })
    setAllSong(newArr)
  }
  const getLastSongDetails = async () => {
    let jsonValue = await AsyncStorage.getItem('@lastsong')
    // console.log(jsonValue)
    if (jsonValue != null) {
      setLastSongDetails(JSON.parse(jsonValue))
    }
  }
  const getLastSongid = async () => {
    let value = await AsyncStorage.getItem('@lastsongSerialNo')
    if (value != null) {
      setLastSongId(parseInt(value))
    }
  }
  useEffect(() => {
    getallSongDetails()
    getLastSongDetails()
    getLastSongid()
  }, [])


  const isSongPlaying = async () => {
    let a = await SoundPlayer.getInfo()
    return a == null ? false : true
  }

  const delayOrNot = async () => {
    let songPlaying = await isSongPlaying()

    console.log(songPlaying)

    if (songPlaying) {
      notDelay()
    } else {
      isDelay()
    }
  }

  const notDelay = () => {
    navigation.replace("home")
  }

  const isDelay = () => {
    setTimeout(() => {
      navigation.replace("home")
      // navigation.replace("Test")
    }, 3000)
  }



  useEffect(() => {
    delayOrNot()
  }, [])




  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash Screen</Text>
      {/* <Lottie source={require('../../../assets/lottie/splashScreen.json')} autoPlay loop={false} /> */}
    </View>
  )
}