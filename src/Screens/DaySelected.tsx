import React,{useState} from "react"
import { View,  TouchableOpacity } from 'react-native';
import  Icon  from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import { ShowTask } from "../Componets/ShowTask";
import { ModalAppointment } from "../Componets/ModalAppointment";
export const DaySelected=(day:any)=>{
   const paramsDay:string=day.route.params.day
console.log(paramsDay)
    const navigation= useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    

    return(
        <View style={{flex:1,backgroundColor:"white"}} >
              <Icon
                 onPress={()=>navigation.goBack()}
                 color={"black"} name="chevron-back-outline" size={30} 
                /> 
             
            
         
           
                {/* muestra las citas */}
                <ShowTask
                 daySelected={paramsDay} 
                />  
                {/* modal */}
                <ModalAppointment
                paramsDay={paramsDay}
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
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