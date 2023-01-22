import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export const ChoseTemplate=()=>{

    const navigation= useNavigation<any>()

    return(
        <View style={style.container} >
            <Text style={{color:"black",fontSize:40,fontWeight:"700",marginTop:40,alignSelf:"center"}}>Agenda</Text>
             <Icon name="menu-sharp"  size={40} color={"black"} style={{position:"absolute", top:5,left:5}} />
             <TouchableOpacity onPress={()=>navigation.navigate("CalendarioScreen")} activeOpacity={0.8}  > 
             <View style={{width:350,height:150,borderWidth:1,borderColor:"grey",marginLeft:20, marginBottom:20,marginTop:20,backgroundColor:"black",borderRadius:10}}>
                <Icon name="calendar-sharp" size={70} color={"white"}  style={{alignSelf:"center",marginTop:30}} />
             </View>
              
             </TouchableOpacity>



             
           

            
        </View>
    )
}

const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    
    }
})