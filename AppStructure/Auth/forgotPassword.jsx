import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/APIs/ApiInstance";

export default function ForgotPassword() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const forgot = async () => {
        if (!model.email || !model.newPassword) {
            return Toast.show({
                type: 'error',
                text1: 'Validation error',
                text2: 'Email and New Password are required',
            });
        }

        if (!model.email.includes('@')) {
            return ToastAndroid.show('@ is required in Email', ToastAndroid.LONG);
        }

        if (model.newPassword.length < 6) {
            return ToastAndroid.show('Password should be at least 6 characters', ToastAndroid.LONG);
        }

        try {
            setLoading(true);
            const res = await ApiInstance.post('/authRoute/forgotPassword', model);
            Toast.show({
                type: 'success',
                text1: 'Congrats',
                text2: 'Password successfully updated',
            });
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Server error',
                text2: 'Please try again',
            });
        } finally {
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
                    {/* Top Design */}
                    <View style={styles.topDesign}>
                        <Text style={styles.topText}>Reset Password</Text>
                        <Text style={styles.subText}>Enter your email and new password</Text>
                    </View>

                    {/* Heading */}
                    <Text style={styles.heading}></Text>

                    {/* Info Text */}
                    <Text style={styles.infoText}>
                        Please enter your registered email and set a new password to reset access to your account.
                    </Text>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, email: e })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, newPassword: e })}
                        />
                    </View>

                    {/* Reset Password */}
                    <TouchableOpacity style={styles.button} disabled={loading} onPress={forgot}>
                        {loading ? (
                            <ActivityIndicator size={24} color={"#fff"} />
                        ) : (
                            <Text style={styles.buttonText}>Reset Password</Text>
                        )}
                    </TouchableOpacity>

                    {/* Back Button */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.forgotPassword}>Back</Text>
                    </TouchableOpacity>
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
    forgotPassword: {
        marginTop: 10,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
});
