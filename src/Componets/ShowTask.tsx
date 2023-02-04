import React,{useState,useEffect} from "react"
import { View, Text, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ListCitas} from './ListCitas';
import Icon from 'react-native-vector-icons/Ionicons';
export interface AppointmentDataFirebase {
    startTime?: string;
    endTime?: string;
    description?: string;
    key:string;
    day?:string
    message?:string,
    minute?:string,
    notification?:boolean,
    date?:any,
    Hour?:string
  }

export const ShowTask=({daySelected}:any)=>{
    const [appointmentData, setrtappointmentData] = useState<AppointmentDataFirebase[]>([])  
    useEffect(() => {
        loadappointment();
    },[])
    const loadappointment=()=>{
        const suscriber=  firestore().collection("Users").doc(auth().currentUser?.email as any).collection("Citas").orderBy("date","asc"). onSnapshot(querySnapshot=>{
            const appointment:AppointmentDataFirebase[]=[]
            querySnapshot.forEach(documentSnapshot=>{
                appointment.push({
                    startTime: documentSnapshot.data().startTime,
                    endTime: documentSnapshot.data().endTime,
                    description: documentSnapshot.data().description,
                    key:documentSnapshot.id,
                    day:documentSnapshot.data().day,
                    message:documentSnapshot.data().message,
                    minute:documentSnapshot.data().minute,
                    notification:documentSnapshot.data().notification,
                    date:documentSnapshot.data().date,
                    Hour:documentSnapshot.data().Hour
                    

                })
            })
    
            setrtappointmentData(appointment)      
        })
        return ()=>suscriber()
}
 const citasEnFechaSeleccionada = appointmentData.filter(cita=>cita.day==daySelected)
    
    return(
        < >
         {/* <Text style={{position:"absolute",top:0}} >Atras</Text> */}
            {
                    citasEnFechaSeleccionada.length >0 ?
                    <FlatList 
                    data={citasEnFechaSeleccionada}
                    renderItem={({item})=> <ListCitas infoCitas={item} />}
                    /> 
                    :
                    <View style={styles.containerDosentDates} >
                        <Text style={styles.titleDosentDate} >No hay Citas En este dia</Text>
                        <Icon 
                        name="calendar-outline" 
                        size={50} 
                        style={{alignSelf:"center",color:"white"}} />
                     </View>

            }
          
    </>
       
    )
}
const styles = StyleSheet.create({
    containerDosentDates:{
        flex:1,
        justifyContent:"center"

    },
    titleDosentDate:{
        fontSize:30,
        alignSelf:"center",
        color:"white"

    }
    
});