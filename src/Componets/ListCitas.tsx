import React,{useState} from 'react'
import { View, Text, TouchableOpacity, Alert, useWindowDimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalAppointment } from './ModalAppointment';

 export interface PropsFirebaseCitas{
    hour:string,
    day:string,
    message:string,
    minute:string,
    notification:string
}

export const ListCitas = ({  infoCitas,paramsDay}:any) => {
  console.log(infoCitas.minute)
    const {width,height}= useWindowDimensions()
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    return (
    <View style={{flex:1}} >
        {/* si el dia que selecionate tiene cita  */}
   
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={()=>toggleModal()}

    style={{padding:20,width:width/1.2,alignSelf:"center", marginTop:"20%"}}                            
   >
  <View style={styles.container}>
   <Text style={styles.title}>{infoCitas.Hour}</Text>
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
  }
});

