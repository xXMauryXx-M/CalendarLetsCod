/*** 
 * respositorio
 * modalAppiment mas rapido
 * Loading en Upcomign event
 * ordernar citas por hora en upcomign evet
 * ordenar citas en dayselected por hora 
 */
import React,{useState,useEffect} from "react"
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars"
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from "react-native-gesture-handler";
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
    const fechaAcutal=new Date()
    let fechaAhora=` ${fechaAcutal.getFullYear()} ${fechaAcutal.getMonth()+1} ${fechaAcutal.getDate()}`
    useEffect(() => {
      getMarkedDates()
      getUpcomminEvets()  
    }, [])
const getMarkedDates =  () => {
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

const getUpcomminEvets=()=>{

   const suscriber=  firestore().collection("Users").doc(auth().currentUser?.email as any).collection("Citas").orderBy("date","asc"). onSnapshot(querySnapshot=>{
     const event:AppointmentDataFirebase[]=[]
     querySnapshot.forEach(documentSnapshot=>{
        event.push({
         day:documentSnapshot.data().day,
         message:documentSnapshot.data().message,
         Hour:documentSnapshot.data().Hour,
         key:documentSnapshot.data().key,
         minute:documentSnapshot.data().minute,
         date:documentSnapshot.data().date,
         color:documentSnapshot.data().color
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
        <Icon onPress={()=>navigation.openDrawer()} name="reorder-three-sharp" size={40} color="white" style={{position:"absolute",top:10}} />
        <Text style={{color:"white", alignSelf:"center", marginTop:80,fontSize:30,fontWeight:"700"}} >Calendar</Text>
   {
          isLoading ? 
          <Loading />
          :  
          <>         
          <Calendar     
              style={[style.calendario, {marginBottom:100,backgroundColor:"#2A0D53",marginHorizontal:20,borderRadius:10,height:400,marginTop:10,width:"90%",alignSelf:"center"}]}
              theme={style.AllCalendar}       
              onDayPress={(dia)=>{
                navigation.navigate("DaySelected",dia.day)
              }}

              markedDates={markedDatesd}                
              monthFormat={'MMM 2023'}
          /> 


<Text style={{fontSize:20,fontWeight:"600",color:"white",position:"absolute",bottom:170,marginLeft:20,marginBottom:7}} >Upcoming Events</Text>
{/* <Text onPress={()=>onDisplayNotification()} >probar notification</Text> */}
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
         marginHorizontal:0,
         backgroundColor:"#2A0D53"
         
    
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
    marginBottom: 16
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
   
 
  }
    
})


export const Loading=()=>{
  return(
    <View style={{flex:1}} >
      <ActivityIndicator  size={50} color={"#Fff"} style={{alignSelf:"center",marginTop:"40%"}  } />
      <Text style={{fontSize:30,color:"white",alignSelf:"center"}} >Cargando...</Text>
    </View>
  )
}