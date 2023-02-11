import React,{useState,useEffect} from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions, StyleSheet, Alert,ScrollView } from 'react-native';
import { ModalAppointment } from './ModalAppointment';
import { AppointmentDataFirebase } from './ShowTask';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
export const ListCitas = ({ infoCitas }: { infoCitas: AppointmentDataFirebase }) => {
  const [isModalVisible, setModalVisible] = useState(false); 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {width}= useWindowDimensions()

  const eliminarCita=(key:string, isChecked:boolean)=>{
  isChecked&&
firestore().collection('Users')
.doc(auth().currentUser?.email as any).collection("Citas").doc(key)
.delete()
.then(() => {
  console.log('cita deleted!');
})



  }

  

  

        

    return (
    <View style={{flex:1,}} >
         
          <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>toggleModal()}   
              style={[styles.bottomAdd,{ width:width/1.2}]}                            
        >
        
            <View style={[styles.container,{backgroundColor:infoCitas.color as any}]}>
            <BouncyCheckbox
            
            size={25}
            fillColor="#2A0D53"
            unfillColor="#FFFFFF"
            bounceEffectIn={0.7}
            text={infoCitas.message!.length>10 ? infoCitas.message?.substring(0,8) + "..." :infoCitas.message}
            iconStyle={{ borderColor: "blue" }}
           
            textStyle={{ fontFamily: "JosefinSans-Regular",marginTop:0,fontSize:18,color:"white" }}
              onPress={(isChecked: boolean) => {eliminarCita(infoCitas.key as any,isChecked)}}
/>
<Text style={{color:"white",position:"absolute",right:13,bottom:22,fontSize:20,fontWeight:"bold"}}>{infoCitas.HourAndMinute}</Text> 
             
            </View>
        </TouchableOpacity>  
        <TouchableOpacity onPress={()=>Alert.alert("borrar cita"+infoCitas.key)} style={{position:"absolute",right:70,top:50}} >
      

        </TouchableOpacity>
 
          <ModalAppointment 
             isModalVisible={isModalVisible}
             toggleModal={toggleModal}
             title={"Actualizacion"}
             HourAndMinute={infoCitas.HourAndMinute}
             message={infoCitas.message}
           
             type={"actualizar"}
             doc={infoCitas.key}
            
          />


     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

    borderRadius: 10,
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
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 18,
    marginHorizontal:30,
    
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginHorizontal:30
  },
  bottomAdd:{
    padding:10,
    alignSelf:"center", 
    fontSize:20

  }
});


/* 


import React,{useState,useEffect} from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions, StyleSheet, Alert,ScrollView } from 'react-native';
import { ModalAppointment } from './ModalAppointment';
import { AppointmentDataFirebase } from './ShowTask';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import BouncyCheckbox from "react-native-bouncy-checkbox";
export const ListCitas = ({ infoCitas}:any) => {
  const [isModalVisible, setModalVisible] = useState(false); 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {width}= useWindowDimensions()

  const eliminarCita=(key:string, isChecked:boolean)=>{
  isChecked&&
firestore().collection('Users')
.doc(auth().currentUser?.email as any).collection("Citas").doc(key)
.delete()
.then(() => {
  console.log('cita deleted!');
})



  }

 
  

  

        

    return (
    <ScrollView style={{flex:1}} >
          <Text style={{fontSize:25,alignSelf:"center",color:"white",fontWeight:"bold",marginBottom:20,}} >14 Septiembre</Text>
        
          <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>toggleModal()}   
              style={[styles.bottomAdd,{ width:width/1.2}]}                            
        >
         
            <View style={styles.container}>
            <BouncyCheckbox
             
              size={25}
              fillColor="grey"
              unfillColor="#FFFFFF"
              bounceEffectIn={0.7}
              text={infoCitas.message}
              iconStyle={{ borderColor: "blue" }}
             
              textStyle={{ fontFamily: "JosefinSans-Regular",marginTop:0,fontSize:18,color:"white" }}
              onPress={(isChecked: boolean) => {eliminarCita(infoCitas.key,isChecked)}}
/>
                 <Text style={{color:"white",position:"absolute",right:13,bottom:22,fontSize:20}}>{infoCitas.Hour}:{infoCitas.minute} PM</Text> 
             
            </View>
        </TouchableOpacity>  
    
 
          <ModalAppointment 
             isModalVisible={isModalVisible}
             toggleModal={toggleModal}
             title={"Actualizacion"}
             hora={infoCitas.Hour}
             message={infoCitas.message}
             minute={infoCitas.minute}
             type={"actualizar"}
             doc={infoCitas.key}
            
          />


     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'orange',
    borderRadius: 10,
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
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 18,
    marginHorizontal:30,
    
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginHorizontal:30
  },
  bottomAdd:{
    padding:10,
    alignSelf:"center", 
    fontSize:20

  }
});






*/