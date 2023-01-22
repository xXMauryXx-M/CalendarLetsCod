import React,{useState} from "react"
import { View, Text, TouchableOpacity, Alert, useWindowDimensions ,Button,Modal,StatusBar} from 'react-native';
import  Icon  from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
// import Modal from "react-native-modal";

export const DaySelected=(day:any)=>{
    
    const  params2=day
    let days= params2.route.params.day
    const {width}=useWindowDimensions()
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
           color={"black"} name="chevron-back-outline" size={30} /> 
             <TouchableOpacity

             style={{position:"absolute",right:0,top:0}}
             onPress={()=>toggleModal()} >
              
                 <Icon name="add-circle-sharp" size={50} color={"black"}  />
                  
                 
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>Alert.alert("quieres editar o borrar")}
              style={{borderRadius:10, borderWidth:1.3,borderColor:"black",padding:20,width:width/1.2,alignSelf:"center", marginTop:"20%"}} > 
                      <View>
                      <Text style={{color:"black",fontSize:20,fontWeight:"bold"}} >12:30</Text>
                      <Text>hacer los deberes de la casa</Text>
                      </View>
                       
                  </TouchableOpacity>

                  <Modal
        animationType='fade'
        visible={isModalVisible}
        transparent={true}
        >

                {/* bacround negro */}
                <View style={{
                    flex:1,
                    backgroundColor:"rgba(0,0,0,0.5)",
                    justifyContent:"center",
                    alignItems:"center"
                }} >

                
                   {/* contenido del modal */}
                    <View style={{
                        borderRadius:10,
                        backgroundColor:"white",
                        width:340,
                        height:420,
                        justifyContent:"center",
                        
                        }} >
                     
                        <Text style={{color:"black",fontSize:25,alignSelf:"center",position:"absolute",top:0,marginTop:20}} >Agendar Cita</Text>
                          
                          <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:350}} >
                           
                             <TouchableOpacity onPress={()=>toggleModal()} >
                                  <Text style={{fontSize:20}} >Cancelar  </Text>  
                             </TouchableOpacity>
                            
                           
                            <TouchableOpacity>
                                <Text style={{fontSize:20}} >Agendar</Text>  
                            </TouchableOpacity>

                            <StatusBar hidden={false} />
                          </View>
                          

                    </View>

                </View>

        </Modal>

        </View> 
    )
}