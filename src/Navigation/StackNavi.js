import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavi from './TabNavi';
import SplashScreen from '../Containers/Auth/SplashScreen';
import ContaxtPage from '../Constant/ContaxtPage';
import Test from '../Containers/Test';
import Musiclist from '../Containers/MyMusic/Musiclist';
const Stack = createNativeStackNavigator();
export default function StackNavi() {
    return (
        <ContaxtPage>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="Musiclist" component={Musiclist} />
                    
                    <Stack.Screen name="Test" component={Test} />
                    <Stack.Screen name="home" component={TabNavi} />
                </Stack.Navigator>
            </NavigationContainer>
        </ContaxtPage>
    )
}