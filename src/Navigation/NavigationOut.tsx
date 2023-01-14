import { createStackNavigator } from "@react-navigation/stack";
import { ChoseTypeUser } from '../Screens/ChoseTypeUser';
import { NavigationAdd } from './Add/NavigationAdd';

const Stack=createStackNavigator()

export const NavigationOut=()=>{
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name="ChoseTypeUser" component={ChoseTypeUser}  />
            <Stack.Screen name="NavigationAdd" component={NavigationAdd}  />
       
        </Stack.Navigator>
    )
}