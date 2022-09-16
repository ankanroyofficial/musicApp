import { View, Text, StatusBar, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Colors } from "../../Constant/Colors"
import { Normalize } from "../../helpers/Dimens";
import Header from '../../Components/Header';
import { fewConstant } from '../../Constant/FewConstant';
import { images } from '../../Constant/Images';
import SingleMusicCart from '../../Components/SingleMusicCart';
import { song } from '../../Constant/Constant';
import { myContaxt } from '../../Constant/ContaxtPage';
import { storeAllSong } from '../../AsyncStore/AsyncStorePage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function MyMusic() {
  const { allSong, setAllSong,
    lastSongDetails, setLastSongDetails,
    lastSongId, setLastSongId } = useContext(myContaxt)

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

    setAllSong(newArr)
    storeAllSong(newArr)
  }

  const onPressPlay = (val) => {
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
    setAllSong(newArr)
    storeAllSong(newArr)
  }


  const LastSongCard = () => {
    return (
      <View style={{ paddingHorizontal: Normalize(8),paddingVertical: Normalize(5), backgroundColor: "#f0ecf9",marginVertical:Normalize(3) }} >
        <View
          style={{ height: Normalize(36), width: "100%", flexDirection: "row" }} >
          <View style={{ height: "100%", width: Normalize(36), backgroundColor: Colors.lightViolet, justifyContent: "center", alignItems: "center", borderRadius: Normalize(5), overflow: "hidden" }} >
            {
              lastSongDetails.image == undefined || lastSongDetails.image == "" ?
                <Ionicons name="image" color={Colors.white} size={35} />
                :
                <Image source={lastSongDetails.image} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
            }
          </View>
          <View style={{ flex: 1, paddingLeft: Normalize(8), paddingVertical: Normalize(5), flexDirection: "row" }} >
            <View style={{ flex: 1 }} >
              <Text numberOfLines={1} style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color: Colors.violet, letterSpacing: Normalize(1) }} >{lastSongDetails.title}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: Normalize(3) }} >
                <Octicons name="book" color={Colors.violet} size={12} />
                <Text numberOfLines={1} style={{ fontSize: Normalize(10), fontFamily: "Outfit-Regular", color: Colors.violet, marginLeft: Normalize(3), letterSpacing: Normalize(1) }} >Artist: {lastSongDetails.artist}</Text>
              </View>
            </View>


            {/* **********isplaying******** */}

            <Pressable
              style={{ height: "100%", width: Normalize(30), justifyContent: "center", alignItems: "center", marginRight: Normalize(5) }} >
              <FontAwesome5 name="play" color={Colors.violet} size={Normalize(13)} />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }



  // useEffect(() => {
  //   console.log(lastSongDetails.image)
  // }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.shade }}>
      <Header
        title={"My Music"}
        // back
        notification
        noOfNotification={0}
      />

      <View style={{ flex: 1, paddingHorizontal: fewConstant.horizantalGap }} >

        {
          allSong.map((item, index) => {
            return (
              <View
                key={index} >
                <SingleMusicCart
                  details={item}
                  onPressfav={addRemoveFavList}
                  onPressPlay={onPressPlay}
                />
              </View>
            )
          })
        }



        {/* <FlatList
          data={allSong}
          renderItem={({ item, index }) => {
            return (
              <SingleMusicCart
                details={item}
                onPressfav={addRemoveFavList}
                onPressPlay={onPressPlay}
              />
            )
          }}
        /> */}








      </View>
      {
        (lastSongDetails.song != undefined && lastSongId != 0) &&
        <LastSongCard />
      }

    </View>
  )
}

