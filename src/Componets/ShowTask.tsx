import React,{useState,useEffect} from "react"
import { View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ListCitas} from './ListCitas';
import Icon from 'react-native-vector-icons/Ionicons';
export interface AppointmentDataFirebase {
    startTime?: string;
    endTime?: string;
    description?: string;
    key?:string;
    day?:string
    message?:string,
    minute?:string,
    notification?:boolean,
    date?:any,
    Hour?:string,
    color:String
  }

export const ShowTask=({daySelected}:any)=>{
 
console.log("showtask",daySelected)
  
    const [appointmentData, setrtappointmentData] = useState<AppointmentDataFirebase[]>([])  
    const [isLoading, setisLoading] = useState<boolean>(true)  
   
    useEffect(() => {
    
        loadappointment();
    },[])
    const loadappointment=()=>{
        const suscriber=  firestore().collection("Users").doc(auth().currentUser?.email as any).collection("Citas").where("day","==",daySelected).onSnapshot(querySnapshot=>{
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
                    Hour:documentSnapshot.data().Hour,
                    color:documentSnapshot.data().color

                })
            })
       
            setrtappointmentData(appointment)      
            setisLoading(false)
        })
        return ()=>suscriber()
}

    return(
        < >
         {/* <Text style={{position:"absolute",top:0}} >Atras</Text> */}
            {
                isLoading?
                <ActivityIndicator  size={50} color={"white"}  style={{marginTop:"30%"}} />

                :
                    appointmentData.length >0 ?
                    <FlatList 
                    data={appointmentData}
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