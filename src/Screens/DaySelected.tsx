import React,{useState} from "react"
import { View, Text, TouchableOpacity, Alert, useWindowDimensions, Button, Modal, StatusBar, TextInput } from 'react-native';
import  Icon  from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ShowTask } from "../Componets/ShowTask";
import { TexCustomInput } from "../Componets/TexCustomInput";
import { ModalAppointment } from "../Componets/ModalAppointment";
import * as Animatable from 'react-native-animatable';
export const DaySelected=(day:any)=>{
   const paramsDay:string=day.route.params.day

    const navigation= useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    

    return(
        <View style={{flex:1,backgroundColor:"white"}} >
             {/* si usuario tiene citas mostrar las citas de lo contrario un mensaje de no citas   */}
            {/* el unico problmea que tengo es que tengo que cuardar las citas que creo
            en este componeten en ese dia  si el dia ==dia entonces mostraemos las citas de ese dia  */}
              <Icon
                 onPress={()=>navigation.goBack()}
                 color={"black"} name="chevron-back-outline" size={30} 
                /> 
             
                <TouchableOpacity
                 style={{position:"absolute",right:0,top:0}}
                 onPress={()=>toggleModal()} >          
                    <Icon name="add-circle-sharp" size={50} color={"black"}  />
              </TouchableOpacity>
         
           
                {/* muestra las citas */}
                <ShowTask
                 paramsDay={paramsDay} 
                />  
                {/* modal */}
                <ModalAppointment
                paramsDay={paramsDay}
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                title={"cita"}
                 botonName={"Aceptar"}
                />
                  


            

        </View> 
    )
}