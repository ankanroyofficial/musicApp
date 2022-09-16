import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyMusicScreen from '../Containers/MyMusic';
import OnlineScreen from '../Containers/Online';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Normalize } from "../helpers/Dimens"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Colors } from '../Constant/Colors';
const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get('window')
export default function TabNavi() {


  function MyTabBar({ state, descriptors, navigation }) {
    // const navigation = useNavigation()
    return (
      <View style={{}} >
        <View style={{ height: Normalize(50), width: width, flexDirection: 'row' }} >
          <View style={{ flexDirection: 'row' }} >
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });
                // console.log(event)
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };
              const onLongPress = () => {
                Toast.show(label)
              };
              const style = StyleSheet.create({
                tabImage: { height: isFocused ? "38%" : 100, width: isFocused ? '38%' : 100 }
              })
              return (
                <TouchableOpacity
                  onPressIn={onPress}
                  onLongPress={onLongPress}
                  activeOpacity={1}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  style={{ height: Normalize(50), backgroundColor: Colors.blue }}
                  key={index}
                >
                  <View style={{ height: "100%", width: width / 2, backgroundColor: isFocused ? Colors.violet : Colors.white }} >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >

                      <View
                        style={{ height: Normalize(17), width: Normalize(17), marginBottom: Normalize(2) }} >
                        {
                          route.name == "OnlineScreen" ?
                            <FontAwesome name='music' color={isFocused ? Colors.white : Colors.violet} size={isFocused ? Normalize(17) : Normalize(15)} /> :
                            <Fontisto name='headphone' color={isFocused ? Colors.white : Colors.violet} size={isFocused ? Normalize(17) : Normalize(15)} />
                        }
                      </View>
                      <Text
                        style={{
                          fontSize: isFocused ? Normalize(11) : Normalize(10),
                          fontFamily: isFocused ? "Outfit-Medium" : 'Outfit-Regular',
                          color: isFocused ? Colors.white : Colors.violet,
                        }} >
                        {label}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  }


  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="MyMusicScreen" component={MyMusicScreen} options={{ tabBarLabel: "My Music", unmountOnBlur: true }} />
      <Tab.Screen name="OnlineScreen" component={OnlineScreen} options={{ tabBarLabel: "Online", unmountOnBlur: true }} />
    </Tab.Navigator>
  )
}