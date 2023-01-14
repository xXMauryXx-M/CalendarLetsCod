import 'react-native-gesture-handler';

import React from "react"
import{Text,View} from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { NavigationOut } from './src/Navigation/NavigationOut';

export const App=()=>{
  return(
<NavigationContainer>
  <NavigationOut/>
</NavigationContainer>
  

 
 )
}