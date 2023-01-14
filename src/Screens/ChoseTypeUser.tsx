import React from 'react'
import{View,Text,StyleSheet,TouchableOpacity,useWindowDimensions} from "react-native"
import { useNavigation } from '@react-navigation/native';
export const ChoseTypeUser = () => {
    const{height, width}=useWindowDimensions()
const navigation = useNavigation<any>()
    return (
    <View style={styles.container} >
        <Text style={{fontSize:30,color:"black",fontWeight:"700"}} >Lets code Thogether</Text>
        <Text style={{fontSize:15,color:"grey"}} >Hola! elija una opcion</Text>
       <View style={{justifyContent:"center",height:height/2,alignItems:"center"}} >
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.BotonChose,{width:width/3.8,marginVertical:50}]}
            onPress={()=>navigation.navigate("NavigationAdd")}
            >
                <Text style={styles.TextBottom} >Vender</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
            style={[styles.BotonChose,{width:width/3.3}]}
            onPress={()=>console.log("precionado en agendador")}
            >
                <Text style={styles.TextBottom} >Agendar</Text>
            </TouchableOpacity>
       </View>
        
    </View>
  )
}


const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:"white"
    },
    BotonChose:{
    backgroundColor:"black",
    padding:8,
    borderRadius:10
  
    
    },
    TextBottom:{
        color:"white",
        fontSize:25,
        fontWeight:"600"
    }
});