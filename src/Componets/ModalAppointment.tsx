import React,{useState,useEffect} from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity, Switch, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
interface ModalOpenClose{
    isModalVisible:boolean,
    toggleModal: () => void,
    paramsDay?:any,
    title?:string,
    HourAndMinute?:string
    message?:string
    botonName?:string,
    type?:string
    doc?:string

}
export const ModalAppointment = ({isModalVisible,toggleModal,paramsDay,title,message, botonName,type,doc,HourAndMinute}:ModalOpenClose) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [inpuntMessage, setinpuntMessage] = useState("")
    const [dateSelected, setdateSelected] = useState<Date|null>()
    const [isEnabled, setIsEnabled] = useState(false);
    const [choseColor,setChosecolor] = useState("#2A0D53");
    const [isLoading, setIsLoading] = useState(false);
    const mes = new Date().getMonth()
    const spesificDate = new Date(2023,mes,paramsDay??0);
    const firebaseTimestamp = firestore.Timestamp.fromDate (new Date(spesificDate))
    let hour = HourAndMinute?.split(':')[0];
    let minute = HourAndMinute?.split(':')[1];
    let horaminute= new Date(dateSelected!).getHours()+ ":" +new Date(dateSelected!).getMinutes()
const [disable, setdisable] = useState(true)
    const confiramacion=()=>{
     if(inpuntMessage !== "undefined" ){
      setdisable(!disable)
     }

    }

    useEffect(() => {
      confiramacion()
    }, [inpuntMessage])


  const botonquehago=()=>{

    if(dateSelected && inpuntMessage){
      if(type=="subir"){
        UploadNote()
        toggleModal()
      }else{
        update()
        toggleModal()

      }

    }else{
      toggleModal()
      Alert.alert("debes colocar un mensaje y hora")
    }


  }


    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
      };
    const handleConfirm = (date:any) => {
      console.log("configrmacion")
        setdateSelected(date)
        hideDatePicker();
      };

      const update=()=>{
         try {
          setIsLoading(true)
          firestore()
          .collection('Users')
          .doc(auth().currentUser?.email as any)
          .collection("Citas").
           doc(doc)
          .update({
            HourAndMinute:horaminute,
            message:inpuntMessage,
            color:choseColor
          })
          .then(() => {
            setIsLoading(false)
            setinpuntMessage("")
            setdateSelected(null);
          }).catch(()=>{
            Alert.alert("Error al Actualizar Nota")
          })
         } catch (error) {
          Alert.alert("Error al Actualizar Nota")
         }


      }


      const UploadNote=async()=>{
        setIsLoading(true)
      try {
     await firestore().collection('Users').doc(auth().currentUser?.email as any).collection("Citas").add({
        HourAndMinute:horaminute,
        message:inpuntMessage,
        notification:isEnabled,
        day:paramsDay,
        date:firebaseTimestamp,
        color:choseColor
  })
  .then(() => {

   setIsLoading(false)
   setinpuntMessage("")
   setdateSelected(null);

  }).catch(()=>{
    Alert.alert("Error al subir la nota")
  setIsLoading(false)
  })
} catch (error:any) {
  Alert.alert(error)
  setIsLoading(false)
}


      }

      if(isLoading){
        return <Text></Text>;
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

  <View style={styles.shadowModal}>

     {/* contenido del modal */}

      <View style={[styles.modalContainer,{backgroundColor:choseColor}]} >
          <Text style={styles.title}>{title}</Text>
            <View style={styles.positionHourAndSelectHour} >
              <TouchableOpacity onPress={showDatePicker} >
                  {
                  hour?
                      <View>
                            <Text style={{color:"white"}} >Hora:</Text>
                            {
                              dateSelected?
                              <Text style={{color:"white",fontSize:25}} >{new Date(dateSelected!).getHours()}
                              :<Text style={{color:"white",fontSize:25}} >{new Date(dateSelected!).getMinutes()} </Text>
                              </Text>

                              :<Text style={{color:"white",fontSize:25}} >{hour}:{minute}</Text>
                            }
                      </View>
                  :
                    dateSelected ?
                              <View>
                                  <Text style={{color:"white"}} >Hora:</Text>
                                  <Text style={{fontWeight:"500",fontSize:25,color:"white"}} >
                                  {new Date(dateSelected).getHours()}:
                                  <Text style={{fontWeight:"500",fontSize:25,color:"white"}} >
                                    {new Date(dateSelected).getMinutes()}
                                    </Text>
                                  </Text>
                              </View>

                    :
                    <Text style={{fontWeight:"500",fontSize:20,color:"white"}} >Select Hour</Text>
                  }

              </TouchableOpacity>
           </View>

                <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Nota"
                      focusable={true}
                      blurOnSubmit={false}
                      autoCorrect={false}
                      value={message}
                      onChangeText={(value)=>setinpuntMessage(value)}
                      style={styles.input}
                      />
                </View>

    <View style={{marginRight:20}} >
     <View style={styles.contianerCircle} >
      <TouchableOpacity onPress={()=>setChosecolor("orange")} style={[styles.circleColor,{backgroundColor:"orange"}]} />
      <TouchableOpacity onPress={()=>setChosecolor("#5B2AAF")} style={[styles.circleColor,{backgroundColor:"#5B2AAF"}]} />
      <TouchableOpacity onPress={()=>setChosecolor("#1ABEED")} style={[styles.circleColor,{backgroundColor:"#1ABEED"}]} />
      <TouchableOpacity onPress={()=>setChosecolor("red")} style={[styles.circleColor,{backgroundColor:"red"}]} />
      <TouchableOpacity  onPress={()=>setChosecolor("#F6819F")} style={[styles.circleColor,{backgroundColor:"#F6819F"}]} />
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
                    <Text style={{fontSize:20,color:"white"}} >Cancelar</Text>
               </TouchableOpacity>


              <TouchableOpacity  onPress={()=>{botonquehago()}} >
                  <Text style={{fontSize:20,color:"white"}} >{botonName??"Actualizar"}</Text>
              </TouchableOpacity>

            </View>


      </View>


  </View>

    </Modal>
  )
}


const styles=StyleSheet.create({
  modalContainer:{
    borderRadius:10,
    width:340,
    height:420,
    justifyContent:"center",
  },
  shadowModal:{
      flex:1,
      backgroundColor:"rgba(0,0,0,0.5)",
      justifyContent:"center",
      alignItems:"center"
  },
  title:{
    color:"white",
    fontSize:25,
    alignSelf:"center",
    position:"absolute",
    top:0,
    marginTop:20
  },
  positionHourAndSelectHour:{
    marginTop:"10%",
    marginLeft:20
  },
  inputContainer:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#faF4F9",
    marginHorizontal:16,
    marginTop:20
  },
  input:{
    flex:1,
    fontWeight:"600",
    borderColor:"#faF4F9",
    borderWidth:5,
    backgroundColor:"#faF4F9",
    fontSize:15,
    color:"black",
    padding:10,
    borderRadius:10,
    shadowColor:"#000"
  },
  circleColor:{
    width:20,
    height:20,
    borderRadius:10,
    marginLeft:10
  },
  contianerCircle:{
    flexDirection:"row",
    marginTop:10,
    alignSelf:"center"
  }
})