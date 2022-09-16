import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import { images } from './Images'

export const myContaxt = createContext()


export default function ContaxtPage(props) {

  const [allSong, setAllSong] = useState([])
  const [lastSongDetails, setLastSongDetails] = useState({})
  const [lastSongId, setLastSongId] = useState(0)

  return (
    <myContaxt.Provider value={{
      allSong, setAllSong,
      lastSongDetails, setLastSongDetails,
      lastSongId, setLastSongId
    }} >
      {props.children}
    </myContaxt.Provider>
  )
}