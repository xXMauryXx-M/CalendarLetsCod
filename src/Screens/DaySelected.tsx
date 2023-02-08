import React,{useState} from "react"
import { View, TouchableOpacity, Text } from 'react-native';
import  Icon  from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import { ShowTask } from "../Componets/ShowTask";
import { ModalAppointment } from "../Componets/ModalAppointment";
export const DaySelected=(dia:any)=>{
   const paramsDay=dia.route.params
console.log( typeof( paramsDay))
    const navigation= useNavigation<any>()
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    

    return(
        <View style={{flex:1, backgroundColor:"#2A0D53"}} >
              <Icon
                 onPress={()=>navigation.navigate("DrawerCalendar")}
                 color={"white"} name="chevron-back-outline" size={40} 
                 style={{marginTop:20}}
                /> 
                 <Text style={{fontSize:25,alignSelf:"center",color:"white",fontWeight:"bold",marginBottom:20,}} >14 Septiembre</Text>
            
         
           
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
                 style={{ position:"absolute", bottom:40,right:160,}}
                 onPress={()=>toggleModal()} >          
                    <Icon name="add-circle-sharp" size={70} color={"#F6819F"}  />
              </TouchableOpacity>

        </View> 
    )
}