import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import SoundPlayer from 'react-native-sound-player'
import { Normalize } from '../helpers/Dimens'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
export default function MusicPlayPage() {

  const musicLink = "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"

  const [play, setPlay] = useState(false)
  const [pause, setPause] = useState(false)
  const [musicDetails, setMusicDetails] = useState({ "currentTime": 0 })
  const [show_currentTime, setShow_currentTime] = useState({ "currentTime": 0 })
  const [duration, setDuration] = useState(0)


  const playPause = () => {
    setPlay(!play)
  }

  const getMusicData = async () => {
    try {
      const info = await SoundPlayer.getInfo()
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
    if (!pause) {
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
      setPause(false)
      let info = await SoundPlayer.getInfo()
      // console.log(info)


      if (info == null) {
        // SoundPlayer.playUrl(musicLink)
        SoundPlayer.playSoundFile('on_my_way', 'mp3')
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
    setPause(true)
  }
  const onslidingcomplete = (seek) => {
    setPause(false)
    SoundPlayer.seek(seek)
    SoundPlayer.resume()
  }
  const onslidingstart = () => {
    setPause(true)
    SoundPlayer.pause()
  }
  const onvaluechange = (val) => {
    setShow_currentTime({ "currentTime": val })
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#370066" }} >
      <View style={{ backgroundColor: "white", height: Normalize(40) }} ></View>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
        <AntDesign name="stepbackward" color={"white"} size={50} />
        {
          (!play || pause) ?
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
        <AntDesign name="stepforward" color={"white"} size={50} />
      </View>
      <Slider
        value={musicDetails.currentTime}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={(a) => { onvaluechange(a) }}
        onSlidingStart={onslidingstart}
        onSlidingComplete={(a) => { onslidingcomplete(a) }}
      />
      <Text style={{ fontSize: 20, color: "white" }}>{secondToMinutes(show_currentTime.currentTime)} / {secondToMinutes(duration)}</Text>
    </View>
  )
}
