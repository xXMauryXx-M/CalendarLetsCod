import React,{useState,useEffect} from "react"
import { View,StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars"
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



export const CalendarioScreen=()=>{
    const navigation=useNavigation<any>()
    const [markedDatesd, setMarkedDates] = useState<any>({});
  
    
const getMarkedDates =  () => {
 
  const unsubscribe = firestore().collection("Users").doc(auth().currentUser?.email as any).collection("Citas").onSnapshot(querySnapshot => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data().date)
      // Obtener la fecha del documento
      const dates = doc.data().date.toDate();
      // Convertir la fecha a una cadena en formato ISO
      const dateString = dates.toISOString();
      
      let cortar=dateString.slice(0,10)
      
      const newMarkedDates = {...markedDatesd};
      newMarkedDates[cortar] = { selected: true, marked: true };
      console.log("new marker dates"+ newMarkedDates)
      setMarkedDates(newMarkedDates);
    });
});

// Para desuscribirte
unsubscribe();

};





  useEffect(() => {
    getMarkedDates()

  }, [])




        return(
        <View style={style.container} >
           <Calendar 
    theme={{
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: 'black',
    todayTextColor: '#00adf5',
    dayTextColor: 'black',
    textDisabledColor: '#d9e1e8',
    arrowColor: 'black',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'black',
    indicatorColor: 'red',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 25,
    textDayHeaderFontSize: 16
  }}


             initialDate = { '2023-01-15' }
             minDate = { '2023-1-1' } 
            onDayPress={(day)=>{
              navigation.navigate("DaySelected",day)

            }}
              disabledArrowLeft = { true } 
               markedDates={markedDatesd}
          
           
           /> 

           
        </View>

        
        

    )
}


const style=StyleSheet.create({
    container:{
        flex:1,
         backgroundColor:"#ffffff",
    
    }
})