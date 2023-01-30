import React,{useState} from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions, StyleSheet, Alert } from 'react-native';
import { ModalAppointment } from './ModalAppointment';

import { AppointmentDataFirebase } from './ShowTask';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const ListCitas = ({ infoCitas }: { infoCitas: AppointmentDataFirebase }) => {
  console.log(infoCitas.key)
  const [isModalVisible, setModalVisible] = useState(false); 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {width}= useWindowDimensions()

  const eliminarCita=(key:string)=>{
    
firestore().collection('Users')
.doc(auth().currentUser?.email as any).collection("Citas").doc(key)
.delete()
.then(() => {
  console.log('User deleted!');
});
  }

  
  const showAlert=(infocitas:AppointmentDataFirebase)=>{
    Alert.alert(
        "Borrar Cita",
       `Estas seguro que quieres borrar la cita con la hora ${infocitas.Hour}:${infoCitas.minute} `,
        [
            {
                text:"cancelar",
                onPress:()=>console.log("cancel presses"),
                style:"cancel"
                
            },
            {text:"delete",  onPress:()=>eliminarCita(infoCitas.key) }
        ]
        ,{
            //puedes hacer click afuera para cerrarlo 
            cancelable:true,
            onDismiss:()=>console.log("onDesmiss")
    
        }
    )
        }

    return (
    <View style={{flex:1}} >
          <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>toggleModal()}
              onLongPress={()=>showAlert(infoCitas)}
              style={[styles.bottomAdd,{ width:width/1.2}]}                            
        >
            <View style={styles.container}>
                <Text style={styles.title}>{infoCitas.Hour}:{infoCitas.minute}</Text>
                <Text style={styles.subtitle}>{infoCitas.message}</Text>
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
    fontSize: 18,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: 'gray'
  },
  bottomAdd:{
    padding:20,
    alignSelf:"center", 

  }
});

