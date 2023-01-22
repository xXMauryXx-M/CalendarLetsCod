import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from '../Screens/LoginScreen';
import { RegisterScreen } from "../Screens/RegisterScreen";
import { CalendarioScreen } from '../Screens/CalendarioScreen';
import { ChoseTemplate } from "../Screens/ChoseTemplate";
import { DaySelected } from '../Screens/DaySelected';
import { NavigationContainer } from '@react-navigation/native';
const Stack=createStackNavigator()

export const NavigationOut=()=>{
    return(
        <NavigationContainer>
   <Stack.Navigator
    
    >
        <Stack.Screen  name="LoginScreen" component={LoginScreen} />
         <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
   
     </Stack.Navigator>
        </NavigationContainer>
       
    )
}