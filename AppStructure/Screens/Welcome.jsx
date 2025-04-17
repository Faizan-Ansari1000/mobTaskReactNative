import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/studying-concept-illustration_114360-1301.jpg?semt=ais_hybrid&w=740' }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Boost Your Productivity</Text>
                <Text style={styles.subtitle}>Track your goals. Stay on top. Every single day.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>

                <Text style={styles.loginLink}>Already have an account? <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text>Login</Text></TouchableOpacity></Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        padding: 20,
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 60,
    },
    image: {
        width: "100%",
        height: 250,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
        marginTop: 120,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    btn: {
        backgroundColor: "#000",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 15,
        width: "100%",
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    loginLink: {
        color: "#000",
        fontSize: 14,
        marginTop: 10,
    },
});
