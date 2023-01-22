import React from "react"
import { View,StyleSheet,Text } from "react-native"
import { Calendar,Agenda } from "react-native-calendars"
import { useNavigation } from '@react-navigation/native';
export const CalendarioScreen=()=>{
    //crear agenda o por default 
    //tener un apartado donde elgue  template 
    const navigation=useNavigation<any>()
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
              //las citas estaran en un reducer para que sea mas legible
             //esto dependera primero si tiene cita el usurio si no tiene no se mostrara nada de lo contrario las citas
              markedDates={{
                '2023-01-16': {selected: true, marked: true, selectedColor: '#00adf5'},
                '2023-01-17': {marked: true},
                '2023-01-18': {selected: true, marked: true, selectedColor: '#00adf5'},
                '2023-01-19': {selected: true, marked: true, selectedColor: '#00adf5'}
              }}

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