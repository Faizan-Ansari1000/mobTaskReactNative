import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../../Auth/Login";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";
import SignUp from "../../Auth/SignUp";
import forgotPassword from "../../Auth/forgotPassword";
import Home from "../../Screens/Home";
import Profile from "../../Screens/Profile";
import Welcome from "../../Screens/Welcome";

export default function AppNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                    <Stack.Screen name="forgotPassword" options={{ headerShown: false }} component={forgotPassword} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
                </Stack.Navigator>
                <Toast />
            </NavigationContainer>
        </>
    )
}