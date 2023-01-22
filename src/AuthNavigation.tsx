import { View, Text, AppState } from 'react-native'
import React, { useEffect, useState } from 'react'

import auth from '@react-native-firebase/auth';
import { NavigationInto } from './Navigation/NavigationInto';
import { NavigationOut } from './Navigation/NavigationOut';



 export const AuthNavigation = () => {

    const [currentUser, setcurrentUser] = useState(null)
    const userHandler= (user:any)=>
    user? setcurrentUser(user) :setcurrentUser(null)
   
    useEffect(() => {
      //nos muetra el estado del suuario si esta logenado o no 
      auth().onAuthStateChanged(user=>userHandler(user))
    }, [])  
      return <>{currentUser ? <NavigationInto/> : <NavigationOut/> }</>
  
 
   }

