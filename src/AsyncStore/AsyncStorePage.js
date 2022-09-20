import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeLastSongDetails = async (val) => {
    let jsonValue = JSON.stringify(val)
    await AsyncStorage.setItem('@lastsong', jsonValue)
}
export const storeAllSong = async (val) => {
    let jsonValue = JSON.stringify(val)
    await AsyncStorage.setItem('@allsong', jsonValue)
}
export const storeLastSongid = async (val) => {
    let id = val.toString()
    await AsyncStorage.setItem('@lastsongSerialNo', id)
}
export const storemusicDetails = async (val) => {
    let jsonValue = JSON.stringify(val)
    await AsyncStorage.setItem('@musicDetails', jsonValue)
}
export const storeshow_currentTime = async (val) => {
    let jsonValue = JSON.stringify(val)
    await AsyncStorage.setItem('@show_currentTime', jsonValue)
}