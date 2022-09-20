import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import { images } from './Images'

export const myContaxt = createContext()


export default function ContaxtPage(props) {

  const [allSong, setAllSong] = useState([])
  const [lastSongDetails, setLastSongDetails] = useState({})
  const [lastSongId, setLastSongId] = useState(0)
  const [musicDetails, setMusicDetails] = useState({ "currentTime": 0 })
  const [show_currentTime, setShow_currentTime] = useState({ "currentTime": 0 })

  return (
    <myContaxt.Provider value={{
      allSong, setAllSong,
      lastSongDetails, setLastSongDetails,
      lastSongId, setLastSongId,
      musicDetails, setMusicDetails,
      show_currentTime, setShow_currentTime
    }} >
      {props.children}
    </myContaxt.Provider>
  )
}