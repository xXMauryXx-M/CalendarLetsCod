import React,{useState,useEffect} from "react"
import { View, StyleSheet, Text, TouchableOpacity,Alert } from 'react-native';
import { Calendar,LocaleConfig } from "react-native-calendars"
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from "react-native-gesture-handler";
import { AppointmentDataFirebase } from "../Componets/ShowTask";
import { date } from "yup";
//coas que hacer 
 // repositorio
 //logout
// datetime picker funcione correctamnete con el dia acutal de otro color
//modalApoitemnt mas rapido(optimizar)
//agregar Loading a todas las partes 
//ordernar las citas dependiendo de la mas reciente
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
export const CalendarioScreen=()=>{
    const navigation=useNavigation<any>()
    const [markedDatesd, setMarkedDates] = useState<any>();
  const[upEvent,setupEvent]=useState<AppointmentDataFirebase[]>([])
    
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
         minute:documentSnapshot.data().minute

        })
     })

     setupEvent(event)
   })
   return ()=> suscriber()
 }



  useEffect(() => {
    getMarkedDates()
    getUpcomminEvets()
  }, [])


  // useEffect(() => {
  //   const today = new Date();
  //   setMarkedDates({
  //     [today.toISOString().split('T')[0]]: {
  //       selected: true,
  //       selectedColor: 'rgba(42, 159, 211, 0.9)',
  //     },
  //   });
  // }, []);
  

        return(
        <View style={style.container} >

<Icon onPress={()=>navigation.openDrawer()} name="reorder-three-sharp" size={40} color="white" style={{position:"absolute",top:10}} />

<Text style={{color:"white", alignSelf:"center", marginTop:80,fontSize:30,fontWeight:"700"}} >Calendar</Text>
{/* <Text style={{color:"white",fontWeight:"600",fontSize:25,marginLeft:100}} >2020</Text>
   */}
  
           <Calendar 
           
           style={[style.calendario, {marginBottom:100,backgroundColor:"white",marginHorizontal:30,borderRadius:10,height:400,marginTop:10,width:"70%",alignSelf:"center"}]}
    theme={{
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff ',
    textSectionTitleColor: 'black',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#4D4AC4',
    selectedDayTextColor: 'white',
    todayTextColor: 'black',
    dayTextColor: 'black',
    textDisabledColor:'#d9e1e8',
    arrowColor: 'black',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: '#4D4AC4',
    indicatorColor: 'red',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 25,
    textDayHeaderFontSize: 16,
  }}

            
             
          
            onDayPress={(dia)=>{
              navigation.navigate("DaySelected",dia)
            }}
              disabledArrowLeft = { true } 
              markedDates={markedDatesd}
              
          hideArrows={true}
           hideDayNames
          
          
           /> 


<Text style={{fontSize:20,fontWeight:"600",color:"white",position:"absolute",bottom:170,marginLeft:20}} >Upcoming Events</Text>

<View style={{marginBottom:100}} >
<FlatList 
showsHorizontalScrollIndicator={false}
data={upEvent} 
renderItem={({item})=>
<TouchableOpacity onPress={()=>Alert.alert("levando a citas")} >
<View style={{backgroundColor:"white",height:65,width:150,marginLeft:25,borderRadius:10}} >
<Text style={{marginLeft:10,color:"red",fontWeight:"500",marginTop:4}} >Day:{item.day} </Text>
  <Text style={{marginLeft:10,fontSize:14,fontWeight:"400"}} >{item.message}</Text>
 
 <Text  style={{marginLeft:10,color:"grey"}} >{`${item.Hour}:${item.minute}`}</Text>


 
</View>  
</TouchableOpacity>

}
horizontal

/>
</View>


        </View>

        
        

    )
}


const style=StyleSheet.create({
    container:{
        flex:1,
         justifyContent:"center",
         marginHorizontal:0,
         backgroundColor:"rgba(42, 159, 211, 0.9)"
         
    
    },
    calendario:{
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
    
})