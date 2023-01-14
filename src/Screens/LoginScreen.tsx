import React from 'react'
import { Formik ,ErrorMessage} from 'formik';
import { View,Text,StyleSheet,TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from "yup"
import { TexCustomInput } from '../Componets/TexCustomInput';


export const LoginScreen = () => {
   const {width}= useWindowDimensions()
  return (
    <View style={styles.container} >    
       <Text style={[styles.LoginTitle]} >Inicia Seccion</Text>
      <View>
    
            <Formik
            initialValues={{
            email:"",
            password:"",
        
            }}

            onSubmit={(values)=>{
            console.log(values)
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
           style={[styles.bottom,{marginHorizontal:width/1.5}]}
           activeOpacity={0.8}
        >
           <Text style={{fontSize:20, color:"white"}} > Siguiente </Text>
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
        fontSize:25,
        fontWeight:"900",
        color:"#000",
        marginTop:40,
        alignItems:"center",
        marginVertical:30,
        alignSelf:"center"
    },
    bottom:{
       backgroundColor:"black",
       width:120,
       borderRadius:10,
       padding:8,
   },
   ErrorMessage:{
       color:"#FF3733",
       marginLeft:20,
       fontWeight:"900"
   }
});