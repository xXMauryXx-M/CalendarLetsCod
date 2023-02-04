import React,{useState} from "react"
import { View,  TouchableOpacity } from 'react-native';
import  Icon  from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import { ShowTask } from "../Componets/ShowTask";
import { ModalAppointment } from "../Componets/ModalAppointment";
export const DaySelected=(dia:any)=>{
   const paramsDay=dia.route.params.day
console.log( typeof( paramsDay))
    const navigation= useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    

    return(
        <View style={{flex:1, backgroundColor:"rgba(42, 159, 211, 0.9)"}} >
              <Icon
                 onPress={()=>navigation.goBack()}
                 color={"white"} name="chevron-back-outline" size={40} 
                 style={{marginTop:20}}
                /> 
             
            
         
           
                {/* muestra las citas */}
                 <ShowTask
                 daySelected={paramsDay} 
                />   
                {/* modal */}
                <ModalAppointment
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                paramsDay={paramsDay}
                title={"cita"}
                 botonName={"Aceptar"}
                 type={"subir"}
                />

<TouchableOpacity
                 style={{ position:"absolute", bottom:20,right:0}}
                 onPress={()=>toggleModal()} >          
                    <Icon name="add-circle-sharp" size={60} color={"black"}  />
              </TouchableOpacity>

        </View> 
    )
}