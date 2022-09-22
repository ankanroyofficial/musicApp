import { View, Text, Pressable, Modal, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SoundPlayer from 'react-native-sound-player'
import { Normalize } from '../../helpers/Dimens'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { myContaxt } from '../../Constant/ContaxtPage';
import { storeAllSong, storeLastSongDetails, storeLastSongid } from '../../AsyncStore/AsyncStorePage';
import Header from '../../Components/Header';
import { Colors } from '../../Constant/Colors';
import Toast from 'react-native-simple-toast';
import { song } from '../../Constant/Constant';
import { musicPlay, musicStop } from './MusicControlFunc';
export default function MusicControlPage({ isPress, onpress, latestSong }) {

  const { allSong, setAllSong,
    lastSongDetails, setLastSongDetails,
    lastSongId, setLastSongId } = useContext(myContaxt)

  const musicLink = "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"

  const [play, setPlay] = useState(latestSong.isPlaying)
  const [pause, setPause] = useState(false)
  const [musicDetails, setMusicDetails] = useState({ "currentTime": 0 })
  const [show_currentTime, setShow_currentTime] = useState({ "currentTime": 0 })
  const [duration, setDuration] = useState(0)
  // console.log(latestSong)

  const playPause = () => {
    setPlay(!play)
    onPressPlayPause(latestSong)
  }
  const onPressPlayPause = async (val) => {
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
    storeLastSongid(val.sl_id)
  }
  const getMusicData = async () => {
    try {
      const info = await SoundPlayer.getInfo()
      // console.log(info)
      if (info == null) {
        setMusicDetails({ "currentTime": 0 })
        setDuration(0)
      } else {
        setMusicDetails({ "currentTime": info.currentTime })
        setDuration(info.duration)
      }
    } catch (error) {
      console.log("getMusicData---", error)
    }
  }
  useEffect(() => {
    if (play) {
      getMusicData()
    }
  })
  const secondToMinutes = (sec) => {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    if (seconds.toString().length == 1) seconds = "0" + seconds
    seconds = seconds
    return minutes + ":" + seconds;
  }
  const playMusic = async () => {
    try {
      playPause()
      setPlay(true)
      let info = await SoundPlayer.getInfo()
      // console.log(info)
      if (info == null) {
        // SoundPlayer.playUrl(musicLink)
        SoundPlayer.playSoundFile(latestSong.song, 'mp3')
      } else {
        SoundPlayer.resume()
      }
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }
  const pauseMusic = async () => {
    playPause()
    SoundPlayer.pause()
    setPlay(false)
  }
  const onslidingcomplete = (seek) => {
    setPlay(true)
    SoundPlayer.seek(seek)
    SoundPlayer.resume()
  }
  const onslidingstart = () => {
    setPlay(false)
    SoundPlayer.pause()
  }
  const onvaluechange = (val) => {
    setShow_currentTime({ "currentTime": val })
  }
  const nextButton = () => {
    let a = lastSongDetails.sl_id
    let b = makeUpTheLastId(a + 1)
    try {
      if (b >= allSong.length) {
        Toast.show("r nai")
      } else {
        // console.log(allSong[makeUpTheLastId(b)])
        musicStop()
        musicPlay(allSong[b].song)
        storeSlID(allSong[b].sl_id)
        storeLastsong(allSong[b])
      }
    } catch (error) {
      console.log("nextbutton---", error)
    }
  }
  const makeUpTheLastId = (val) => {
    return val - 1;
  }
  const makeUpTheLastIdInPrev = (val) => {
    return val - 2;
  }
  const prevButton = () => {
    let a = lastSongDetails.sl_id
    let b = makeUpTheLastIdInPrev(a)
    console.log("a-----",a)
    console.log("b-----",allSong[b].sl_id)
    if (a == 1) {
      Toast.show("r nai")
    } else {
    
      // musicStop()
      // musicPlay(allSong[b].song)
      storeSlID(allSong[b].sl_id)
      storeLastsong(allSong[b])
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


  return (
    <Modal
      animationType="slide"
      visible={isPress}
      onRequestClose={onpress}
      style={{ flex: 1 }}
    >
      <Header
        title={latestSong.title}
      />

      <View style={{ flex: 1, backgroundColor: Colors.violet }} >
        <View style={{ flex: 1, marginBottom: Normalize(70) }} >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)", margin: Normalize(30), borderRadius: Normalize(8), overflow: "hidden", justifyContent: "center", alignItems: "center" }} >
            {
              latestSong.image == "" || latestSong.image == undefined ?
                <Ionicons name="image" color={Colors.white} size={65} /> :
                <Image source={latestSong.image} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
            }
          </View>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: Normalize(5) }} >
              <Pressable
                onPress={prevButton}
              ><AntDesign name="stepbackward" color={"white"} size={50} /></Pressable>


              {
                (!play) ?
                  <Pressable
                    onPress={playMusic}
                    style={{ marginHorizontal: 20 }}
                  >
                    <AntDesign name="caretright" color={"white"} size={50} />
                  </Pressable>
                  :
                  <Pressable
                    onPress={pauseMusic}
                    style={{ marginHorizontal: 20 }}
                  >
                    <FontAwesome name="pause" color={"white"} size={50} />
                  </Pressable>
              }
              <Pressable
                onPress={nextButton}
              ><AntDesign name="stepforward" color={"white"} size={50} /></Pressable>
            </View>
            <Slider
              value={musicDetails.currentTime}
              minimumValue={0}
              maximumValue={duration}
              onValueChange={(a) => { onvaluechange(a) }}
              onSlidingStart={onslidingstart}
              onSlidingComplete={(a) => { onslidingcomplete(a) }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: Normalize(8) }}>
              <Text style={{ fontSize: Normalize(13), fontFamily: "Outfit-Medium", color: "white" }}>{secondToMinutes(show_currentTime.currentTime)}</Text>
              <Text style={{ fontSize: Normalize(13), fontFamily: "Outfit-Medium", color: "white" }}>{secondToMinutes(duration)}</Text>
            </View>
          </View>
        </View>


      </View>
    </Modal>
  )
}