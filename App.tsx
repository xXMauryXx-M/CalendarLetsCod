import 'react-native-gesture-handler';
import React,{useEffect} from "react"
import { AuthNavigation } from './src/AuthNavigation';
import SplashScreen from 'react-native-splash-screen';
export const App=()=>{
   useEffect(() => {
     SplashScreen.hide()
      }, [])
  return(
     <AuthNavigation/>    
   )
 }