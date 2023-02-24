
import React,{useState,useEffect} from "react"
import { View, StyleSheet, Text, ActivityIndicator, useWindowDimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars"
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppointmentDataFirebase } from "../Componets/ShowTask";
import notifee from '@notifee/react-native';
import { UpCommingEvent } from "../Componets/UpCommingEvent";
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Ocubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';
export const CalendarioScreen=()=>{
    const navigation=useNavigation<any>()
    const [markedDatesd, setMarkedDates] = useState<any>();
    const[upEvent,setupEvent]=useState<AppointmentDataFirebase[]>([])
    const[isLoading,setisLoading]=useState<boolean>(true)
    const {width,height}=useWindowDimensions()
    const [urlimageFireabse, seturlimageFireabse] = useState("")
    useEffect(() => {
       getMarkedDatesAndDay()
       getUpcomminEvets()  
    }, [])
const getMarkedDatesAndDay =  () => {
   const unsubscribe = firestore().collection("Users").doc(auth().currentUser?.email as any).collection("Citas").onSnapshot(querySnapshot => {
    let newMarkedDates: { [date: string]: any } = {};
      querySnapshot.forEach((doc) => {
      const date = doc.data().date.toDate();
      const formattedDate = date.toISOString().slice(0,10);
      newMarkedDates[formattedDate] = { selected: true, marked: true };
      });
      const today = new Date();
      const formattedToday = today.toISOString().slice(0,10);
      newMarkedDates[formattedToday] = { selected: true, marked: true,selectedColor: 'orange' };
      setMarkedDates(newMarkedDates);
      setisLoading(false)      

// Para desuscribirte
 return()=> unsubscribe();

  })
}


useEffect(() => {
    
  
  const suscriber= firestore().collection("PhotoUser").doc(auth().currentUser?.email as any).collection("url").orderBy('fechaHoraSubida', 'desc')
  .limit(1).onSnapshot(snapshot=>{
     snapshot.forEach((snap)=>{
      console.log(snap)
      seturlimageFireabse(snap.data().URL)
 })
   })
 
   return ()=>suscriber()
  }, [])

  



const getUpcomminEvets=()=>{

   const suscriber=  firestore().collection("Users").doc(auth().currentUser?.email as any).collection("Citas").orderBy("date","asc"). onSnapshot(querySnapshot=>{
     const event:AppointmentDataFirebase[]=[]
     querySnapshot.forEach(documentSnapshot=>{
        event.push({
         day:documentSnapshot.data().day,
         message:documentSnapshot.data().message,
         key:documentSnapshot.data().key,
         date:documentSnapshot.data().date,
         color:documentSnapshot.data().color,
         HourAndMinute:documentSnapshot.data().HourAndMinute
        })
     })

     setupEvent(event)
     setisLoading(false)
   })
   return ()=> suscriber()
 }
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
      
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });  
  }
        return(
        <View style={style.container} >
        <Icon onPress={()=>navigation.openDrawer()} name="reorder-three-sharp" size={45} color="white" style={{position:"absolute",top:height*0.02}} />
        <TouchableOpacity onPress={()=>Alert.alert(" Disposible en Proximas Veriones!👌")} >
        <Image
                            source={{uri: urlimageFireabse? urlimageFireabse: "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"}}
                            style={{height:45,width:45,position:"absolute",top:36,right:10,borderRadius:20}}/>
        
        </TouchableOpacity>
        <Text style={[style.titleCalendar,{marginTop:height*0.1,}]} >Calendar</Text>
   {
          isLoading ? 
          <Loading />
          :  
          <>         
          <Calendar     
              style={[style.calendario,{  marginBottom:height*0.1,   height:height*0.5, marginTop:height*0.07}]}
              theme={style.AllCalendar}       
              onDayPress={(dia)=>{
                navigation.navigate("DaySelected",dia.day)
              }}
              markedDates={markedDatesd}                
              monthFormat={'MMM 2023'}
          /> 
     <Text style={style.upcomingEventTitle} >Upcoming Events</Text>
      <UpCommingEvent
       upEvent={upEvent}
      />

</>        
}
       
        </View>
    )
}


const style=StyleSheet.create({
    container:{
        flex:1,
         justifyContent:"center",
         backgroundColor:"#2A0D53"
    },
    titleCalendar:{
      color:"white", 
      alignSelf:"center", 
      fontSize:30,
      fontWeight:"700"
    },
    calendario:{
      fontWeight:"bold",
      shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:"#2A0D53",
    marginHorizontal:20,
    borderRadius:10,
    width:"90%",
    alignSelf:"center"
  },
    AllCalendar:{
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff ',
    textSectionTitleColor: 'white',
    textSectionTitleDisabledColor: 'red',
    selectedDayBackgroundColor: '#F6819F',
    selectedDayTextColor: 'white',
    todayTextColor: 'white',
    dayTextColor: 'white',   
    textDisabledColor:'grey',
    arrowColor: 'white',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'white',
    indicatorColor: 'white',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontSize: 16,
    textMonthFontSize: 25,
    textDayHeaderFontSize: 16,
  },
  upcomingEventTitle:{
    fontSize:20,
    fontWeight:"600",
    color:"white",
    position:"absolute",
    bottom:170,
    marginLeft:20,
    marginBottom:7
  }
    
})

/*** 
 * respositorio
 * modalAppiment mas rapido
 * ordenar citas en dayselected por hora 
 * agregar notificacion
 * refactorizar punto importates
 */


export const Loading=()=>{
  return(
    <View style={{flex:1}} >
      <ActivityIndicator  size={50} color={"#Fff"} style={{alignSelf:"center",marginTop:"40%"}  } />
      <Text style={{fontSize:30,color:"white",alignSelf:"center"}} >Cargando...</Text>
    </View>
  )
}