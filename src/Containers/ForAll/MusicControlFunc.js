import SoundPlayer from "react-native-sound-player"

export const fromOnline = async () => {
    // SoundPlayer.playUrl(musicLink)
}
export const musicPause = () => {
    SoundPlayer.pause()
}
export const musicResume = () => {
    SoundPlayer.resume()
}
export const musicStop = () => {
    SoundPlayer.stop()
}
export const musicPlay = (val) => {
    SoundPlayer.playSoundFile(val,"mp3")
}