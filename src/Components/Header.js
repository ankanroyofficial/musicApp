import { View, Text, StatusBar, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from "../Constant/Colors"
import { Normalize } from "../helpers/Dimens"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
export default function Header({ title, back, notification, noOfNotification }) {

    const navigation = useNavigation()
    const toStringConvert = (val) => {
        return val.toString()
    }
    return (
        <View style={{ height: Normalize(50), backgroundColor: Colors.violet, flexDirection: "row" }} >
            <StatusBar backgroundColor={Colors.violet} barStyle={"light-content"} />
            <Pressable
                disabled={!back}
                onPress={() => navigation.goBack()}
                style={styles.iconBox} >
                {back && <Octicons name='chevron-left' color={Colors.white} size={Normalize(22)} />}
            </Pressable>
            <View style={styles.titleBox} >
                {
                    title != undefined && title.length > 0 &&
                    <Text numberOfLines={1} style={{ fontSize: Normalize(14), color: Colors.white, fontFamily: "Outfit-Medium", letterSpacing: Normalize(1) }} >{title}</Text>
                }
            </View>
            <Pressable
                disabled={!notification}
                style={styles.iconBox} >
                {notification && <Ionicons name='notifications' color={Colors.white} size={Normalize(19)} />}
                {noOfNotification != undefined && notification &&

                    ((noOfNotification > 0 && toStringConvert(noOfNotification) != "") &&
                        <View style={{ height: Normalize(11), width: Normalize(11), borderRadius: Normalize(11) / 2, backgroundColor: "red", position: "absolute", top: Normalize(15), right: Normalize(14), justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ color: Colors.white, fontSize: Normalize(6.5), fontFamily: "Outfit-Regular" }} >{noOfNotification > 99 ? 99 : noOfNotification}</Text>
                        </View>)}
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    titleBox: { flex: 1, justifyContent: "center", alignItems: "center" },
    iconBox: { height: "100%", width: Normalize(50), justifyContent: "center", alignItems: "center" }
})