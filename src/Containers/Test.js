import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import SoundPlayer from 'react-native-sound-player'
import { song } from '../Constant/Constant'
import Toast from 'react-native-simple-toast';
import { myContaxt } from '../Constant/ContaxtPage';
import { storeLastSongDetails, storeLastSongid } from '../AsyncStore/AsyncStorePage';
export default function Test() {
    const musicLink = "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"

    const { allSong, setAllSong,
        lastSongDetails, setLastSongDetails,
        lastSongId, setLastSongId } = useContext(myContaxt)

    const fromOnline = async () => {
        SoundPlayer.playUrl(musicLink)
    }
    const testpause = () => {
        SoundPlayer.pause()
    }
    const testresume = () => {
        SoundPlayer.resume()
    }
    const testStop = () => {
        SoundPlayer.stop()
    }
    const fromFile = async (val) => {
        try {

            if (lastSongDetails.song == undefined) {
                SoundPlayer.playSoundFile(song[0].song, 'mp3')
                next()
            } else {
                SoundPlayer.playSoundFile(val, 'mp3')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const prev = () => {
        if (lastSongId == 0 || lastSongDetails.song == undefined) {
            Toast.show("r nai")
        } else {
            setLastSongId(lastSongId - 1)
            setLastSongDetails(song[lastSongId - 1])

            storeLastSongid(lastSongId - 1)
            storeLastSongDetails(song[lastSongId - 1])

            fromFile(song[lastSongId - 1].song)
        }
    }
    const next = () => {

        if (lastSongDetails.song == undefined) {
            setLastSongId(0)
            setLastSongDetails(song[0])
            storeLastSongid(0)
            storeLastSongDetails(song[0])

            SoundPlayer.playSoundFile(song[0].song, 'mp3')
        } else {
            if (lastSongId == (song.length) - 1) {
                Toast.show("r nai")
            } else {
                setLastSongId(lastSongId + 1)
                setLastSongDetails(song[lastSongId + 1])
                storeLastSongid(lastSongId + 1)
                storeLastSongDetails(song[lastSongId + 1])

                fromFile(song[lastSongId + 1].song)
            }
        }
    }


    // console.log(lastSongId)
    // console.log(lastSongDetails.song)
    // console.log("----------------------")

    return (
        <View style={{ flex: 1, backgroundColor: "pink" }} >
            {lastSongDetails.title != undefined &&
                <>
                    <Text style={{ fontSize: 40, textAlign: "center" }} >{lastSongDetails.title}</Text>
                    <Text style={{ fontSize: 30, textAlign: "center" }} >Artist : {lastSongDetails.artist}</Text>
                </>
            }
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Text onPress={() => fromFile(lastSongDetails.song)} style={{ fontSize: 50 }} >play</Text>
                <View style={{ flexDirection: "row" }} >
                    <Text onPress={testpause} style={{ fontSize: 20 }} >pause  </Text>
                    <Text onPress={testresume} style={{ fontSize: 20 }} >resume  </Text>
                    <Text onPress={testStop} style={{ fontSize: 20 }} >stop</Text>
                </View>
                <View style={{ flexDirection: "row" }} >
                    <Text onPress={prev} style={{ fontSize: 50 }} >prev    </Text>
                    <Text onPress={next} style={{ fontSize: 50 }} >next</Text>
                </View>
            </View>
        </View>
    )
}