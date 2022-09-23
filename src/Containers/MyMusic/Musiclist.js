import { View, Text, FlatList, Image } from 'react-native'
import React, { useContext } from 'react'
import SingleMusicCart from '../../Components/SingleMusicCart'
import { myContaxt } from '../../Constant/ContaxtPage'
import { Normalize } from '../../helpers/Dimens'
import { fewConstant } from '../../Constant/FewConstant'
import { song } from '../../Constant/Constant'


export default function Musiclist() {
  const { allSong } = useContext(myContaxt)
  return (
    <View style={{ flex: 1, paddingHorizontal: fewConstant.horizantalGap }} >
      <FlatList
        numColumns={2}
        data={allSong}
        renderItem={({ item, index }) => {
          return (
            <View style={{ height: Normalize(200), width: "48%", marginVertical: 10, marginRight: index % 2 == 0 ? "2%" : 0, backgroundColor: "pink" }} >
              <Text>{item.image}</Text>
              <Image source={item.image} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
            </View>
          )
        }}
      />
    </View>
  )
}