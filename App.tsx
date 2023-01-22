import 'react-native-gesture-handler';
import React from "react"
import{Text,View} from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { NavigationOut } from './src/Navigation/NavigationOut';
import { NavigationInto } from './src/Navigation/NavigationInto';
import { AuthNavigation } from './src/AuthNavigation';

export const App=()=>{
  return(
     <AuthNavigation />    
   )
 }