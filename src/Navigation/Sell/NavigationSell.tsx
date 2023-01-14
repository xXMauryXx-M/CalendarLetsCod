import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Availability } from '../../Screens/AddScreens/Availability';

export const NavigationSell = () => {

    const Stack=createStackNavigator()
  return (
    <Stack.Navigator>
        <Stack.Screen name='Availability' component={Availability} />
    </Stack.Navigator>
  )
}
