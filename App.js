import { View, Text } from 'react-native'
import React from 'react'
import MusicPlayPage from './src/Containers/MusicPlayPage'
import Test from './src/Containers/Test'
import Musiclist from './src/Containers/MyMusic/Musiclist'
import TabNavi from './src/Navigation/TabNavi'
import StackNavi from './src/Navigation/StackNavi'

export default function App() {
  return (
    //  <MusicPlayPage/>
    //  <Musiclist/>
    // <Test />
    <StackNavi/>
  )
}