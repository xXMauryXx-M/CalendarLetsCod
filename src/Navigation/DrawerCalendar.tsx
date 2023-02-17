import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { CalendarioScreen } from '../Screens/CalendarioScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
  const [uriTem,settempUri] = useState<null>(null)
  const [imageUrl, setimageUrl] = useState<any>(null)
  const [isvalid, setisvalid] = useState(false)  
  const timestamp = firebase.firestore.Timestamp.now();

  const saubirImagenUserFireStorage=async(imageUri:any)=>{
      console.log(imageUri)
    let parts = imageUri?.split("rn");
      let newUrl = "rn" + parts[parts.length - 1];
      const reference = 
      storage()
      .ref(`PhotoUser/${auth().currentUser?.email}/${newUrl}`);
    
    try {
      const snapshot = await reference.putFile(imageUri);
    console.log(snapshot)
      console.log("imagen subida correctamnete")
    let nn= await  reference.getDownloadURL()
    console.log(nn)
   setimageUrl(nn)
  
      firestore().collection("PhotoUser").doc(auth().currentUser?.email as any).collection("url").add({
        URL:nn,
        fechaHoraSubida:timestamp
      })
    } catch (error) {
      console.error('Error uploading file:', error);
    }
       
    
    // console.log(reference)
  
  
  }
  
   useEffect(() => { 
   const suscriber= firestore().collection("PhotoUser").doc(auth().currentUser?.email as any).collection("url").orderBy('fechaHoraSubida', 'desc')
   .limit(1).onSnapshot(snapshot=>{
    if(snapshot){
      snapshot.forEach((snap)=>{
        console.log(snap,"tiene algo")
        settempUri(snap.data().URL)
      setisvalid(false)
  })
    }else{
    return;
    }
   
    })
  
    return ()=>suscriber()
   }, [])

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
          saubirImagenUserFireStorage(resp.assets![0].uri!)
          // setimageUrl(resp.assets![0].uri!)
            
    })
  }

  console.log("uritemp",uriTem)

  return(
    <View style={{flex:1,backgroundColor:"#2A0D53"}} >
                    <TouchableOpacity style={{height:250,width:"100%", justifyContent:"center",alignItems:"center"}}
                    onPress={()=>PhthoGalery()}
                    >
                        <Image
                            source={{uri: uriTem? uriTem : "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"}}
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