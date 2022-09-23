import { View, Text, StatusBar, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from "../../Constant/Colors"
import { Normalize } from "../../helpers/Dimens";
import Header from '../../Components/Header';
import { fewConstant } from '../../Constant/FewConstant';
import { images } from '../../Constant/Images';
import SingleMusicCart from '../../Components/SingleMusicCart';
import { song } from '../../Constant/Constant';
import { myContaxt } from '../../Constant/ContaxtPage';
import { storeAllSong, storeLastSongDetails, storeLastSongid } from '../../AsyncStore/AsyncStorePage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MusicControlPage from '../ForAll/MusicControlPage';
import SoundPlayer from 'react-native-sound-player';
import { musicPause, musicPlay, musicResume, musicStop } from '../ForAll/MusicControlFunc';
export default function MyMusic() {
  const { allSong, setAllSong,
    lastSongDetails, setLastSongDetails,
    lastSongId, setLastSongId } = useContext(myContaxt)
  const [isControlPage, setIsControlPage] = useState(false)
  const onPressControlPage = () => {
    setIsControlPage(!isControlPage)
  }
  const addRemoveFavList = (val) => {
    let prevArr = allSong
    let newArr = []
    prevArr.map((item) => {
      if (item.sl_id == val.sl_id) {
        item.isfav = !item.isfav
        newArr.push(item)
      } else {
        newArr.push(item)
      }
    })
    storeSong(newArr)
    storeLastSongid(val.sl_id)
  }
  const onPressPlay1 = (val) => {
    storeLastsong(val)
    setLastSongId(val.sl_id)
    musicStop()
    let prevArr = allSong
    let newArr = []
    prevArr.map((item) => {

      if (item.sl_id == val.sl_id) {
        item.isPlaying = !item.isPlaying
        newArr.push(item)
      } else {
        item.isPlaying = false
        newArr.push(item)
      }
    })
    storeSong(newArr)
    storeLastSongid(val.sl_id)

    musicPlay(val.song)
    onPressControlPage()
  }
  const onPressPlay = async (val) => {
    let a = await SoundPlayer.getInfo()
    if (a == null || val.sl_id != lastSongId) {
      storeLastsong(val)
      musicStop()
      let prevArr = allSong
      let newArr = []
      prevArr.map((item) => {
        if (item.sl_id == val.sl_id) {
          item.isPlaying = !item.isPlaying
          newArr.push(item)
        } else {
          item.isPlaying = false
          newArr.push(item)
        }
      })
      storeSong(newArr)
      storeSlID(val.sl_id)

      musicPlay(val.song)
      onPressControlPage()
    } else {
      onPressControlPage()
    }
  }


  
  const storeSlID = (val) => {
    setLastSongId(val)
    storeLastSongid(val)
  }
  const storeSong = (val) => {
    setAllSong(val)
    storeAllSong(val)
  }
  const storeLastsong = (val) => {
    storeLastSongDetails(val)
    setLastSongDetails(val)
  }
  const whichFuncInlastSongCard = (item) => {
    if (item.isPlaying) {
      pauseonIcon(item)
    } else {
      playonIcon(item)
    }
  }
  const pauseonIcon = async (val) => {
    musicPause()
    pausePlayIconChange(val)
  }
  const playonIcon = async (val) => {
    // console.log(val.isPlaying)
    let a = await SoundPlayer.getInfo()
    // console.log(a)
    if (a == null || val.sl_id != lastSongId) {
      storeLastsong(val)

      storeSlID(val.sl_id)

      musicStop()
      pausePlayIconChange(val)
      musicPlay(val.song)
    } else {
      pausePlayIconChange(val)
      musicResume()
    }
  }
  const pausePlayIconChange = (val) => {
    let prevArr = allSong
    let newArr = []
    prevArr.map((item) => {
      if (item.sl_id == val.sl_id) {
        item.isPlaying = !item.isPlaying
        newArr.push(item)
      } else {
        item.isPlaying = false
        newArr.push(item)
      }
    })
    storeSong(newArr)
    storeSlID(val.sl_id)
  }
  const LastSongCard = ({ item, image, title, artist, isPlaying }) => {
    return (
      <View style={{ paddingHorizontal: Normalize(8), paddingVertical: Normalize(5), backgroundColor: "#f0ecf9", marginVertical: Normalize(3) }} >
        <View
          style={{ height: Normalize(36), width: "100%", flexDirection: "row" }} >
          <View style={{ height: "100%", width: Normalize(36), backgroundColor: Colors.lightViolet, justifyContent: "center", alignItems: "center", borderRadius: Normalize(5), overflow: "hidden" }} >
            <Ionicons name="image" color={Colors.white} size={35} />
            {
              (image != undefined || image != "") &&
              <View style={{ height: "100%", width: Normalize(36), position: "absolute" }} >
                <Image source={image} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
              </View>
            }
          </View>
          <View style={{ flex: 1, paddingLeft: Normalize(8), paddingVertical: Normalize(5), flexDirection: "row" }} >
            <Pressable
              onPress={onPressControlPage}
              style={{ flex: 1 }} >
              <Text numberOfLines={1} style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color: Colors.violet, letterSpacing: Normalize(1) }} >{title}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: Normalize(3) }} >
                <Octicons name="book" color={Colors.violet} size={12} />
                <Text numberOfLines={1} style={{ fontSize: Normalize(10), fontFamily: "Outfit-Regular", color: Colors.violet, marginLeft: Normalize(3), letterSpacing: Normalize(1) }} >Artist: {artist}</Text>
              </View>
            </Pressable>
            {/* **********isplaying******** */}
            <Pressable
              onPress={() => whichFuncInlastSongCard(item)}
              style={{ height: "100%", width: Normalize(30), justifyContent: "center", alignItems: "center", marginRight: Normalize(5) }} >
              {
                !isPlaying ?
                  <FontAwesome5 name="play" color={Colors.violet} size={Normalize(13)} />
                  :
                  <FontAwesome5 name="pause" color={Colors.violet} size={Normalize(13)} />
              }
            </Pressable>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.shade }}>
      <Header
        title={"My Music"}
        // back
        notification
        noOfNotification={0}
      />
      <View style={{ flex: 1, paddingHorizontal: fewConstant.horizantalGap }} >
        <FlatList
          data={allSong}
          renderItem={({ item, index }) => {
            return (
              <SingleMusicCart
                details={item}
                onPressfav={addRemoveFavList}
                onPressPlay={onPressPlay}
                forControlPage={onPressControlPage}
                iscontrolPage={isControlPage}
              />
            )
          }}
        />
      </View>
      {/* last song card */}
      {
        allSong.map((item, index) => {
          return (
            <View key={index}>
              {item.sl_id == lastSongId &&
                <LastSongCard
                  item={item}
                  image={item.image}
                  title={item.title}
                  artist={item.artist}
                  isPlaying={item.isPlaying}
                />}
            </View>
          )
        })
      }
      {
        isControlPage &&
        <MusicControlPage
          onpress={onPressControlPage}
          isPress={isControlPage}
          latestSong={lastSongDetails}
        />
      }
    </View>
  )
}