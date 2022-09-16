import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Online from './Online';
const Stack = createNativeStackNavigator();
export default function OnlineScreen() {
    return (
        <Stack.Navigator
        screenOptions={{headerShown:false}}
        >
            <Stack.Screen name="online" component={Online} />
        </Stack.Navigator>
    )
}