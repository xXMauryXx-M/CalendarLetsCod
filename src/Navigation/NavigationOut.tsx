import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from '../Screens/LoginScreen';
const Stack=createStackNavigator()

export const NavigationOut=()=>{
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen  name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}