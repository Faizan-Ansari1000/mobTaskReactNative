import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ActivityIndicator, } from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/APIs/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const signUp = async () => {
        if (!model.name || !model.email || !model.password) {
            return Toast.show({ type: 'error', text1: 'Validation error', text2: 'All Fields are required' });
        }
        if (!model.email.includes('@')) {
            return ToastAndroid.show('@ is required in Email', ToastAndroid.LONG);
        }
        if (model.password.length < 6) {
            return ToastAndroid.show('Password should be 6+ characters', ToastAndroid.LONG);
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/authRoute/signUp', model);
            await AsyncStorage.setItem("userId", res.data.data._id);
            console.log(res.data)
            Toast.show({ type: 'success', text1: 'Registered', text2: 'Successfully Account created' });
            setModel({});
            navigation.navigate('Home');
            setLoading(false);
        } catch (error) {
            console.log(error);
            Toast.show({ type: 'error', text1: 'Server error', text2: error.response?.data?.message });
            setLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    {/* Top Section */}
                    <View style={styles.topDesign}>
                        <Text style={styles.topText}>Create Account</Text>
                        <Text style={styles.subText}>Sign up to get started with your journey</Text>
                    </View>

                    {/* Heading */}
                    <Text style={styles.heading}></Text>

                    {/* Info Para */}
                    <Text style={styles.infoText}>
                        Enter your details below to create your new account.
                    </Text>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="User Name"
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, name: e })}
                            value={model.name || ""}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, email: e })}
                            value={model.email || ""}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, password: e })}
                            value={model.password || ""}
                        />
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.button} disabled={loading} onPress={signUp}>
                        {loading ? (
                            <ActivityIndicator size={24} color={"#fff"} />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    {/* Account Line */}
                    <View style={styles.signUpButton}>
                        <Text style={styles.signupText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.signupLink}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
    },
    container: {
        width: "100%",
        alignItems: "center",
    },
    topDesign: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 160,
        backgroundColor: "black",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    topText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    subText: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        marginTop: 5,
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 160,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    inputContainer: {
        width: "90%",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#f5f5f5",
        color: "#000",
    },
    button: {
        width: "90%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    signupText: {
        color: "black",
    },
    signupLink: {
        paddingStart: 5,
        fontWeight: "bold",
        color: "black",
    },
    signUpButton: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
});
