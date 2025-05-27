import { StyleSheet,  View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();
import Screen1 from "./pages/login";
import Screen2 from "./pages/cadastro";
import Screen3 from "./pages/pagContratacao";
import Screen4 from "./pages/usuario";
import Screen5 from "./pages/contratoChat";
import Screen6 from "./pages/pagPerfilUsuarioContrato";
import Screen7 from "./pages/pagContrato";
import Screen8 from "./pages/pagConfig";
import Screen9 from "./pages/listaContrato";
import Screen10 from "./pages/visualizarContrato";
import AuthContextProvider from "./tokens/auth-context";

const App = () => {
    return (
        <AuthContextProvider>
            <NavigationContainer>
           <Stack.Navigator initialRouteName='login'>
                    <Stack.Screen
                        name='login'
                        component={Screen1}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="cadastro"
                        component={Screen2}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="pagContratacao"
                        component={Screen3}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="usuario"
                        component={Screen4}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="contratoChat"
                        component={Screen5}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="pagPerfilUsuarioContrato"
                        component={Screen6}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="pagContrato"
                        component={Screen7}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="pagConfig"
                        component={Screen8}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="listaContrato"
                        component={Screen9}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="visualizarContrato"
                        component={Screen10}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
          
           </NavigationContainer>
        </AuthContextProvider>
         
           
           
          
      
    );
}
export default App; 
const styles = StyleSheet.create({
    imgfundo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dcedfa",
    },
});
