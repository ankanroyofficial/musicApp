import { View, Text, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Normalize } from '../helpers/Dimens';
import { Colors } from '../Constant/Colors';
import { images } from '../Constant/Images';
import { myContaxt } from '../Constant/ContaxtPage';
export default function SingleMusicCart({ details, onPressfav,onPressPlay }) {
    return (
        <View
            style={{ height: Normalize(36), width: "100%", flexDirection: "row", marginTop: Normalize(5) }} >
            <View style={{ height: "100%", width: Normalize(36), backgroundColor: Colors.lightViolet, justifyContent: "center", alignItems: "center", borderRadius: Normalize(5), overflow: "hidden" }} >
                {
                    details.image == undefined || details.image == "" ?
                        <Ionicons name="image" color={Colors.white} size={35} />
                        :
                        <Image source={details.image} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                }
            </View>
            <View style={{ flex: 1, paddingLeft: Normalize(8), paddingVertical: Normalize(5), flexDirection: "row" }} >
                <View style={{ flex: 1 }} >
                    <Text numberOfLines={1} style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color: Colors.violet, letterSpacing: Normalize(1) }} >{details.title}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: Normalize(3) }} >
                        <Octicons name="book" color={Colors.violet} size={12} />
                        <Text numberOfLines={1} style={{ fontSize: Normalize(10), fontFamily: "Outfit-Regular", color: Colors.violet, marginLeft: Normalize(3), letterSpacing: Normalize(1) }} >Artist: {details.artist}</Text>
                    </View>
                </View>

                {/* ****************fav******** */}

                <Pressable
                    onPress={() => onPressfav(details)}
                    style={{ height: "100%", width: Normalize(20), justifyContent: "center", alignItems: "center", marginRight: Normalize(8) }} >
                    <MaterialIcons name={details.isfav ? "favorite" : "favorite-border"} color={details.isfav ? "red" : Colors.lightGrey} size={20} />
                </Pressable>


                {/* **********isplaying******** */}

                <Pressable
                    onPress={() => onPressPlay(details)}
                    style={{ height: "100%", width: Normalize(30), justifyContent: "center", alignItems: "center", marginRight: Normalize(5) }} >
                    {
                        !details.isPlaying ?
                            <FontAwesome5 name="play" color={Colors.violet} size={Normalize(13)} />
                            :
                            <View style={{ height: Normalize(18), width: Normalize(18), justifyContent: "center", alignItems: "center" }} >
                                <Image source={images.playing} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                            </View>
                    }
                </Pressable>
            </View>
        </View>
    )
}