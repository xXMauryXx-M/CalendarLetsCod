import React,{useState} from 'react'
import { View, Text, Modal, TextInput,TouchableOpacity,Switch } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';

interface ModalOpenClose{
    isModalVisible:boolean,
    toggleModal: () => void,
    paramsDay?:string,
    title?:string,
    hora?:string,
    message?:string
    botonName?:string,
    minute?:string
}

export const ModalAppointment = ({isModalVisible,toggleModal,paramsDay,title,hora,message,botonName,minute}:ModalOpenClose) => {
    
  console.log(hora)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
      const [inpuntMessage, setinpuntMessage] = useState(message)
    const [dateSelected, setdateSelected] = useState<Date>()
    const [isEnabled, setIsEnabled] = useState(false);
     const CurrenDate=new Date()
     const timestamp = firestore.Timestamp.fromDate(CurrenDate);


    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
      };
    const handleConfirm = (date:any) => {
      console.log(date)
        setdateSelected(date)
        hideDatePicker();
      };

      const UploadNote=()=>{

        firestore().collection('Users').doc(auth().currentUser?.email as any).collection("Citas").add({
            Hour:new Date(dateSelected!).getHours(),
            minute: new Date(dateSelected!).getMinutes(),
            message:inpuntMessage,
            notification:isEnabled,
            day:paramsDay,
            date:timestamp
      
          })
          .then(() => {
           toggleModal()
           setinpuntMessage("")
           setdateSelected<any>();
          });

      }
    return (
    <Modal
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
  <Animatable.View duration={1000} animation="fadeInDown" style={{flex:1}} >


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

       
          <Text style={{color:"black",fontSize:25,alignSelf:"center",position:"absolute",top:0,marginTop:20}} >{title?? "por defecto"}</Text>
            
            <View style={{marginTop:"10%", marginLeft:20}} >
              <TouchableOpacity onPress={showDatePicker} >

                {               
                  dateSelected ? 

                 <View>
                  <Text>Hora</Text>
                 <Text style={{fontWeight:"500",fontSize:25}} >
                  {new Date(dateSelected!).getHours()}:
                  <Text style={{fontWeight:"500",fontSize:25}} >{new Date(dateSelected!).getMinutes()}</Text></Text>
                  
                 </View> 
                  
                  :<Text style={{fontWeight:"500",fontSize:20}} >Select Hour</Text>
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
     
    <Text style={{textAlign:"right",marginTop:10}} >Do you want to active notification? </Text>
      <View style={{marginTop:15}} >
           
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        
    
      />
     
     </View>
    
       
    </View>
    


            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:"30%"}} >
             
               <TouchableOpacity onPress={()=>toggleModal()} >
                    <Text style={{fontSize:20}} >Cancelar  </Text>  
               </TouchableOpacity>
              
             
              <TouchableOpacity  onPress={()=>UploadNote()} >
                  <Text style={{fontSize:20}} >{botonName??"actulizar"}</Text>  
              </TouchableOpacity>

            </View>
            

      </View>
      

  </View>
  </Animatable.View>
    </Modal>
  )
}
