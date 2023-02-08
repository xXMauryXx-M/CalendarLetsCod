import React,{useState} from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import { DaySelected } from '../Screens/DaySelected';


interface ModalOpenClose{
    isModalVisible:boolean,
    toggleModal: () => void,
    paramsDay?:any,
    title?:string,
    hora?:string,
    message?:string
    botonName?:string,
    minute?:string
    type?:string
    doc?:string
   
}

export const ModalAppointment = ({isModalVisible,toggleModal,paramsDay,title,message,hora, botonName,minute,type,doc}:ModalOpenClose) => {    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [inpuntMessage, setinpuntMessage] = useState(message)
    const [dateSelected, setdateSelected] = useState<Date|null>()
    const [isEnabled, setIsEnabled] = useState(false);
    const [choseColor,setChosecolor] = useState("#2A0D53");
   

    const mes = new Date().getMonth()
    const spesificDate = new Date(2023,mes,paramsDay??0);
    const firebaseTimestamp = firestore.Timestamp.fromDate ( new Date(spesificDate))
    // const firebaseTimestamp = firestore.Timestamp.fromDate(spesificDate)
    

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
      };
    const handleConfirm = (date:any) => {
        setdateSelected(date)
        hideDatePicker();
      };

      
        
      const update=()=>{
        firestore()
        .collection('Users')   
        .doc(auth().currentUser?.email as any)
        .collection("Citas").
        doc(doc)
        .update({

          Hour:new Date(dateSelected!).getHours(),
          minute: new Date(dateSelected!).getMinutes(),
          message:inpuntMessage,   
        })
        .then(() => {
          toggleModal()
         setinpuntMessage("")
          setdateSelected(null);
        });
      }
  
     

      // console.log(firebaseTimestamp.toDate())       
      const UploadNote=()=>{


        firestore().collection('Users').doc(auth().currentUser?.email as any).collection("Citas").add({
            Hour:new Date(dateSelected!).getHours(),
            minute: new Date(dateSelected!).getMinutes(),
            message:inpuntMessage,
            notification:isEnabled,
            day:paramsDay,
            date:firebaseTimestamp,
            color:choseColor
      
          })
          .then(() => {
           toggleModal()
          setinpuntMessage("")
           setdateSelected(null);
          }).catch(()=>{
            Alert.alert("Error al subir la nota")
          })

      }
    return (
    <Modal
    style={{backgroundColor:"#2A0D53"}}
     animationType='fade'
     visible={isModalVisible}
     transparent={true}
    >

<DateTimePickerModal 
      isVisible={isDatePickerVisible}
      mode="time"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />

      
  
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
          backgroundColor:choseColor,
          width:340,
          height:420,
          justifyContent:"center",
          
          }} >

       
          <Text style={{color:"white",fontSize:25,alignSelf:"center",position:"absolute",top:0,marginTop:20}} >{title?? "por defecto"}</Text>
            
            <View style={{marginTop:"10%", marginLeft:20}} >
              <TouchableOpacity onPress={showDatePicker} >

                {   
                
                hora ?
                <View>
                    
                      <Text style={{fontWeight:"500",fontSize:25,color:"white"}} > <Text style={{color:"white"}} >Hora: </Text>{dateSelected? <Text> {new Date(dateSelected!).getHours()}:<Text>{new Date(dateSelected!).getMinutes()} </Text> </Text>    
                      :<Text style={{color:"white"}} >{hora}:{minute}</Text>}</Text>
                </View>
           
                
                :
                  dateSelected ? 
                     

                 <View>
                  <Text style={{color:"white"}} >Hora</Text>
                 <Text style={{fontWeight:"500",fontSize:25,color:"white"}} >
                  {new Date(dateSelected!).getHours()}:
                  <Text style={{fontWeight:"500",fontSize:25,color:"white"}} >{new Date(dateSelected!).getMinutes()}</Text></Text>
                  
                 </View> 
                  
                  :<Text style={{fontWeight:"500",fontSize:20,color:"white"}} >Select Hour</Text>
                 
             
               
                }
                
              </TouchableOpacity>
             
             
           
                                      
            </View>
          
            <View style={{flexDirection:"row", alignItems:"center",backgroundColor:"#faF4F9", marginHorizontal:16,marginTop:20}}>

            
            <TextInput
            placeholder="Note"
            focusable={true}
            blurOnSubmit={false}
            autoCorrect={false}
            value={inpuntMessage}
            onChangeText={(value)=>setinpuntMessage(value)}
             //para aumentar la altura del plce holder es el fontsize
            style={{ flex:1, fontWeight:"600", borderColor:"#faF4F9", borderWidth:5, backgroundColor:"#faF4F9", fontSize:15, color:"black" , padding:10, borderRadius:10 ,shadowColor: "#000",
 }}

  


/>



    </View>

    <View style={{marginRight:20}} >
   
     <View style={{flexDirection:"row",marginTop:10,alignSelf:"center"}} >
    
    <TouchableOpacity onPress={()=>setChosecolor("orange")} style={{backgroundColor:"orange",width:20,height:20,borderRadius:10,marginLeft:10}} >
      <View style={{backgroundColor:"red"}} ></View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>setChosecolor("#5B2AAF")} style={{backgroundColor:"#5B2AAF",width:20,height:20,borderRadius:10,marginLeft:10}} >
      <View style={{backgroundColor:"red"}} ></View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>setChosecolor("#1ABEED")} style={{backgroundColor:"#1ABEED",width:20,height:20,borderRadius:10,marginLeft:10}} >
      <View style={{backgroundColor:"red"}} ></View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>setChosecolor("red")} style={{backgroundColor:"red",width:20,height:20,borderRadius:10,marginLeft:10}} >
      <View style={{backgroundColor:"red"}} ></View>
    </TouchableOpacity>

    <TouchableOpacity  onPress={()=>setChosecolor("#F6819F")} style={{backgroundColor:"#F6819F",width:20,height:20,borderRadius:10,marginLeft:10}} >
      <View style={{backgroundColor:"red"}} ></View>
    </TouchableOpacity>
     </View>
   

      <View style={{marginTop:15}} >
      <Text style={{textAlign:"right",marginTop:10,color:"white"}} >Active notification? </Text> 
           
      <Switch
        trackColor={{false: '#767577', true: 'black'}}
        thumbColor={true ? 'white' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        
    
      />
     
     </View>
    
       
    </View>
    


            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:"30%"}} >
             
               <TouchableOpacity onPress={()=>toggleModal()} >
                    <Text style={{fontSize:20,color:"white"}} >Cancelar  </Text>  
               </TouchableOpacity>
              
             
              <TouchableOpacity  onPress={()=>{type =="subir"? UploadNote() :update()}} >
                  <Text style={{fontSize:20,color:"white"}} >{botonName??"Actualizar"}</Text>  
              </TouchableOpacity>

            </View>
            

      </View>
      

  </View>
 
    </Modal>
  )
}
