import React from 'react'
import { Formik ,ErrorMessage} from 'formik';
import { View,Text,StyleSheet,TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from "yup"
import { TexCustomInput } from '../Componets/TexCustomInput';
import auth from "@react-native-firebase/auth"
import { useNavigation } from '@react-navigation/native';
export const LoginScreen = () => {
   const {width}= useWindowDimensions()
const navigation=useNavigation<any>()
   const AuthLogin=(email:string,Password:string)=>{
    
    auth().signInWithEmailAndPassword(email,Password).
    then(()=>{
     Alert.alert("Usuario Creado")
       
    }).catch((error)=>{
         if(error.code=="auth/email-already-in-use"){
            Alert.alert("Email ya ha sido registrado")
         }else{
           console.log(error)
         }
    })
    
   }


  return (
    <View style={styles.container} >    
       <Text style={[styles.LoginTitle]} >Hello</Text>
       <Text style={{fontSize:20, alignSelf:"center",fontWeight:"700",marginBottom:40}} >Sign in to your Account</Text>
      
      <View>
    
            <Formik
            initialValues={{
            email:"",
            password:"",
        
            }}

            onSubmit={(values)=>{
           AuthLogin(values.email,values.password)
            }}

            validationSchema={
            Yup.object({
                email:Yup.string().email("ingresa un correo electronico válido").required("nesesario"),
                password:Yup.string().min(5, "La contraseña debe tener almenos 5 caracateres").required("nesesario"),
            })
            }>
   
     {
        ({handleBlur, values, handleChange, handleSubmit,errors})=>(
       
   <>
           <TexCustomInput
           focus={false}
           placeholder="Correo electrónico"
           errors={errors}
           type="email-address"
           value={values.email}
           name='email'
           handleBlur={handleBlur}
           nameIcon="mail"
           handleChange={handleChange}
           values={values.email} />
           
           <Text style={styles.ErrorMessage}>
                  <ErrorMessage name="email" />
           </Text>
           <TexCustomInput
           focus={false}
           placeholder="Contraseña"
           errors={errors}
           type="visible-password"
           value={values.password}
           name='password'
           handleBlur={handleBlur}
           nameIcon="lock-closed"
           handleChange={handleChange}
           values={values.password} />

           <Text style={styles.ErrorMessage}>
                <ErrorMessage name="password" />
           </Text>



    <View>

        <TouchableOpacity 
           onPress={()=>handleSubmit()}
           style={[styles.bottom,{alignSelf:"center"}]}
           activeOpacity={0.8}
        >
           <Text style={{fontSize:23, color:"white",alignSelf:"center"}} > Siguiente </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("RegisterScreen")} >
       <Text style={{color:"grey",alignSelf:"center",fontSize:15,marginTop:20}}>Registro</Text>
   </TouchableOpacity>

       

   </View>   

</>
)}
    </Formik>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center"
    },
    LoginTitle:{
        fontSize:45,
        fontWeight:"900",
        color:"#000",
        marginTop:40,
        alignItems:"center",

        alignSelf:"center"
    },
    bottom:{
       backgroundColor:"black",
       width:200,
       borderRadius:10,
       padding:8,
   },
   ErrorMessage:{
       color:"#FF3733",
       marginLeft:20,
       fontWeight:"900"
   }
});