import React from "react"
import { View, FlatList, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AppointmentDataFirebase } from './ShowTask';

export const UpCommingEvent=({upEvent}:any)=>{
    const navigation=useNavigation<any>()
    const {width,height}=useWindowDimensions()
  const limitLENGTH = 8;

    return(
        <View style={{marginBottom:100}} >
 {
     upEvent && upEvent.length > 0 ?
     <FlatList
     
   showsHorizontalScrollIndicator={false}
   data={upEvent} 
   renderItem={({item})=>
        <TouchableOpacity onPress={()=>navigation.navigate("DaySelected",item.day)} >
            <View style={{backgroundColor:"#5B2AAF",height:80,width:170,marginLeft:25,borderRadius:10}} >
                <Text style={{marginLeft:15,color:"#F6819F",fontWeight:"500",marginTop:4,fontSize:17}} >Day:{item.day} </Text>
                <Text style={{marginLeft:7,fontSize:18,fontWeight:"400",color:"#F6819F"}}> <Text style={{color:"white"}} >Nota:</Text> {item.message.length>limitLENGTH ?`${item.message.substring(0, 8)}...` :item.message}</Text>

            <View style={{backgroundColor:item.color, marginLeft:20 , width:30,height:10,position:"absolute",right:20}}/>

            <Text  style={{marginLeft:10,color:"white",position:"absolute",right:10,top:19}} >{`${item.HourAndMinute}`}</Text>
            </View>  
        </TouchableOpacity>

}
horizontal

/>

:
<View>
<Text style={{alignSelf:"center",fontSize:20,color:"white"}}>No hay Citas Aun</Text>
<Icon name="receipt-outline" size={40}color={"white"} style={{alignSelf:"center"}} />
</View>


 }

</View>
    )
}