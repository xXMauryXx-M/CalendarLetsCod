import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { CalendarioScreen } from '../Screens/CalendarioScreen';
import { ChoseTemplate } from '../Screens/ChoseTemplate';
import { DaySelected } from '../Screens/DaySelected';



const Drawer=createDrawerNavigator()


export const NavigationInto=()=>{
    return(
        <NavigationContainer>
       <Drawer.Navigator>
         <Drawer.Screen name="CalendarioScreen" component={CalendarioScreen} />
         <Drawer.Screen name="ChoseTemplate" component={ChoseTemplate} />
         <Drawer.Screen name="DaySelected" component={DaySelected} />  
        </Drawer.Navigator>

        </NavigationContainer>
                )
}



