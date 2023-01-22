import React from "react"
import { ErrorMessage, Formik } from "formik";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import * as Yup from 'yup';
import { TexCustomInput } from "../Componets/TexCustomInput";
import auth from '@react-native-firebase/auth';
import{useNavigation} from "@react-navigation/native"
export const RegisterScreen=()=>{
const Navigation = useNavigation<any>()
    const AuthRegister=(email:string,password:string)=>{

        auth().createUserWithEmailAndPassword(email,password).
        then(()=>{
            Alert.alert("usuario creado")
        }).catch((error)=>{
              Alert.alert(error)
        })
    }
     const {width}= useWindowDimensions()
    return(

<View style={styles.container} >    
       <Text style={[styles.LoginTitle]} >Register</Text>
      <View>
    
            <Formik
            initialValues={{
            name:"",
            email:"",
            password:"",
        
            }}

            onSubmit={(values)=>{
                AuthRegister(values.email,values.password)
            }}

            validationSchema={
            Yup.object({
                name:Yup.string().required("necesario") ,
                email:Yup.string().email("ingresa un correo electronico válido").required("nesesario"),
                password:Yup.string().min(5, "La contraseña debe tener almenos 5 caracateres").required("nesesario"),
            })
            }>
   
     {
        ({handleBlur, values, handleChange, handleSubmit,errors})=>(
       
   <>

        <TexCustomInput
           focus={false}
           placeholder="Nombre"
           errors={errors}
           type="visible-password"
           value={values.password}
           name='name'
           handleBlur={handleBlur}
           nameIcon="person-circle-sharp"
           handleChange={handleChange}
           values={values.name} />

           <Text style={styles.ErrorMessage}>
                <ErrorMessage name="name" />
           </Text>




           <TexCustomInput
           focus={false}
           placeholder="Email-address"
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
           <Text style={{fontSize:20, color:"white",alignSelf:"center"}} > Siguiente </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>Navigation.navigate("LoginScreen")} >
       <Text style={{color:"grey",alignSelf:"center",fontSize:15,marginTop:20}}>  don`t you have any count?</Text>
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
        marginVertical:30,
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
        

})