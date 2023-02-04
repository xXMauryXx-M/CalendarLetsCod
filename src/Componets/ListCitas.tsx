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
  console.log('User deleted!');
})



  }

  useEffect(() => {
    
  }, [])
  

  

        

    return (
    <View style={{flex:1, }} >
         
          <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>toggleModal()}   
              style={[styles.bottomAdd,{ width:width/1.2}]}                            
        >
        
            <View style={styles.container}>
            <BouncyCheckbox
              style={{position:"absolute",top:30,left:10}}
              size={25}
              fillColor="black"
              unfillColor="#FFFFFF"
              bounceEffectIn={0.7}
              text={infoCitas.message}
              iconStyle={{ borderColor: "white" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: "JosefinSans-Regular",marginTop:15,fontSize:18 }}
              onPress={(isChecked: boolean) => {eliminarCita(infoCitas.key,isChecked)}}
/>
                <Text style={styles.title}>{infoCitas.Hour}:{infoCitas.minute}</Text>
             
            </View>
        </TouchableOpacity>  
        <TouchableOpacity onPress={()=>Alert.alert("borrar cita"+infoCitas.key)} style={{position:"absolute",right:70,top:50}} >
      

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


     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
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
    padding:20,
    alignSelf:"center", 
    fontSize:20

  }
});

