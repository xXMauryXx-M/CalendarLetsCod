import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { CalendarioScreen } from '../Screens/CalendarioScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';


const Drawer=createDrawerNavigator()
export const DrawerCalendar=()=>{
    return( 
       <Drawer.Navigator
        drawerContent={(props)=> <MenuInterno {...props} /> }
        screenOptions={
        {
           headerShown:false,    
           drawerActiveTintColor:"white",
           drawerInactiveTintColor:"grey" ,    
        }
      }
       >
         <Drawer.Screen
           options={{title:"Calendar",drawerIcon:()=>(
           <Icon name='calendar-outline' size={20}  color={"white"}/>)}}
           name="CalendarioScreen" component={CalendarioScreen} />
        
        </Drawer.Navigator>

       
          )
}

const MenuInterno=(props:DrawerContentComponentProps)=>{
  const [uriTem,settempUri] = useState<any>(null)

const logout=()=>{
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}
  const PhthoGalery=()=>{
    launchImageLibrary({
      mediaType:"photo",
    },(resp)=>{
          if(resp.didCancel) return 
          if(!resp.assets![0].uri!) return
          settempUri(resp.assets![0].uri!)
            
    })
  }

  return(
    <View style={{flex:1,backgroundColor:"#2A0D53"}} >
                    <TouchableOpacity style={{height:250,width:"100%", justifyContent:"center",alignItems:"center"}}
                    onPress={()=>PhthoGalery()}
                    >
                        <Image
                            source={{uri:uriTem??"https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"}}
                            style={styles.avatar}/>
                    </TouchableOpacity>
                
                <DrawerContentScrollView
                  {...props}
                  >
                   <DrawerItemList {...props} />

              </DrawerContentScrollView>
              <DrawerItem
                  label=""
                  labelStyle={{color:"white"}}
                  style={{marginTop:30}}
                  onPress={()=>console.log("")}
                  icon={()=>(
                <TouchableOpacity onPress={()=>logout()}  >
                  <Icon name='log-out-outline' size={30} color={"white"}  />
                </TouchableOpacity>
                )}
              />
    </View>
  

  )
}


export const styles = StyleSheet.create({
   avatar:{
    width:150,
    height:150,
    borderRadius:100
  }
})