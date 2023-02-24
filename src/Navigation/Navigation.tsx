import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import { DaySelected } from '../Screens/DaySelected';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerCalendar } from './DrawerCalendar';
import { UpCommingEvent } from "../Componets/UpCommingEvent";
export const NavigationInto=()=>{
 
    const stack=createStackNavigator()

    const configuracion={
      
    }

    return(
        <NavigationContainer>
            <stack.Navigator
            screenOptions={{
                headerShown:false,
                 
            }}
            >
                <stack.Screen name="DrawerCalendar" component={DrawerCalendar} />
                <stack.Screen name="DaySelected" 
                 options={{transitionSpec: {
                 open: {
                 animation: 'timing',
                config: {
                  duration: 500,
                },
               },
                 close: {
                  animation: 'timing',
                  config: {
                  duration: 400,
          },  
    },
  },}}  component={DaySelected} />
                <stack.Screen name="UpCommingEvent" component={UpCommingEvent} />
            </stack.Navigator>
        </NavigationContainer>
       
    )
    
}