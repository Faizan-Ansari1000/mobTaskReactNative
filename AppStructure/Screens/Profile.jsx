import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import ApiInstance from "../config/APIs/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";

export default function Profile() {
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getData = async () => {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
            Toast.show({
                type: "error",
                text1: "Oops!",
                text2: "No user ID found.",
            });
            return;
        }
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/authRoute/signUp/${userId}`);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "No Profile Found",
                text2: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const logOut = async () => {
        await AsyncStorage.removeItem("userId");
        navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
        });
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{ marginTop: 10 }}>Loading your profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <Text style={styles.greetingText}>
                Hello, {postData.name?.split(" ")[0] || "User"} 
            </Text>

            {/* Profile Card */}
            <View style={styles.profileCard}>
                <Image
                    source={{
                        uri: postData.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s",
                    }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{postData.name || "Unknown User"}</Text>
                <Text style={styles.email}>{postData.email || "Not Available"}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('forgotPassword')}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            {/* Account */}
            <View style={styles.extraSection}>
                <Text style={styles.sectionTitle}>Settings & Preferences</Text>
                <Text style={styles.sectionSubtext}>Manage notifications, privacy, and support</Text>
            </View>

            {/* Small Para */}
            <View style={styles.motivationBox}>
                <Text style={styles.quote}>"Every great task begins with a simple step."</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    greetingText: {
        fontSize: 22,
        fontWeight: "600",
        color: "#333",
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    profileCard: {
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f8f9fa",
        padding: 20,
        borderRadius: 14,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 4,
    },
    email: {
        fontSize: 15,
        color: "#666",
    },
    buttons: {
        width: "100%",
        marginTop: 30,
    },
    button: {
        backgroundColor: "#333",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    logoutButton: {
        backgroundColor: "#a93226",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontWeight: "600",
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#eee",
        marginVertical: 30,
    },
    extraSection: {
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#444",
    },
    sectionSubtext: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
    motivationBox: {
        marginTop: 25,
        padding: 15,
        backgroundColor: "#fefefe",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    quote: {
        fontStyle: "italic",
        color: "#444",
        textAlign: "center",
    },
});
