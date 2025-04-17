import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput, ToastAndroid, FlatList, ActivityIndicator } from "react-native";
import ApiInstance from "../config/APIs/ApiInstance";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";


export default function Home() {

    const navigation = useNavigation();
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [postData, setPostData] = useState([]);
    const [newIsOpen, setNewIsOpen] = useState(false);
    const [searchId, setSearchId] = useState("");


    const getData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get("/userRoute/studentData");
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show("No Data Found", ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.headerBtn}>
                    <Icon name="menu" size={26} color="black" />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const deleteCart = async (id) => {
        try {
            const res = await ApiInstance.delete(`/userRoute/studentData/${id}`);
            console.log('Data Successfully Deleted')
            setPostData(postData.filter(item => item._id !== id));
            ToastAndroid.show("Deleted Successfully", ToastAndroid.SHORT);
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Delete Failed", ToastAndroid.LONG);
        }
    };

    const postYourData = async () => {
        if (!model.stdName || !model.stdId || !model.city || !model.country) {
            return ToastAndroid.show('Validation error (Please provide are All fields)', ToastAndroid.LONG);
        }
        try {
            setLoading(true);
            await ApiInstance.post("/userRoute/studentData", model);
            Toast.show({
                type: "success",
                text1: "Submitted",
                text2: "Your form has been successfully submitted"
            });
            setModel({});
            setNewIsOpen(false);
            getData();
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Server error",
                text2: `Something went wrong ${error.message}`
            });
        } finally {
            setLoading(false);
        }
    };

    const filteredData = searchId
        ? postData.filter((item) =>
            item.stdId?.toLowerCase() === searchId.toLowerCase()
        )
        : postData;



    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Search */}

            <Modal transparent={true} visible={isOpen} onRequestClose={() => setIsOpen(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalBox, { height: "80%" }]}>
                        <TextInput
                            placeholder="Search by Student ID"
                            onChangeText={setSearchId}
                            style={[styles.input, { marginBottom: 10 }]}
                            placeholderTextColor="#888"
                        />

                        {loading ? (
                            <ActivityIndicator color="black" size={24} />
                        ) : (
                            <FlatList
                                data={filteredData}
                                keyExtractor={(item) => item._id}
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                keyboardShouldPersistTaps="handled"
                                renderItem={({ item }) => {
                                    const isHighlighted = item.stdId?.toLowerCase() === searchId.toLowerCase();

                                    return (
                                        <View style={[styles.card, isHighlighted && styles.highlightCard]}>
                                            <Text style={styles.cardDetail}>Name: {item.stdName}</Text>
                                            <Text style={styles.cardDetail}>ID: {item.stdId}</Text>
                                            <Text style={styles.cardDetail}>City: {item.city}</Text>
                                            <Text style={styles.cardDetail}>Country: {item.country}</Text>
                                            <TouchableOpacity
                                                style={styles.deleteBtn}
                                                onPress={() => deleteCart(item._id)}
                                            >
                                                <Text style={styles.deleteBtnText}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            />
                        )}

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                            <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeBtn}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setNewIsOpen(true)} style={styles.addBtn}>
                                <Text style={styles.addBtnText}>Post Your Data</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* Post Modal */}
            <Modal transparent={true} visible={newIsOpen} onRequestClose={() => setNewIsOpen(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <ScrollView keyboardShouldPersistTaps="handled">
                            <TextInput placeholder="Student Name" onChangeText={(e) => setModel({ ...model, stdName: e })} style={styles.input} />
                            <TextInput placeholder="Student ID" onChangeText={(e) => setModel({ ...model, stdId: e })} style={styles.input} />
                            <TextInput placeholder="City" onChangeText={(e) => setModel({ ...model, city: e })} style={styles.input} />
                            <TextInput placeholder="Country" onChangeText={(e) => setModel({ ...model, country: e })} style={styles.input} />
                            <TouchableOpacity onPress={postYourData} style={styles.addBtn}>
                                <Text style={styles.addBtnText}>Post</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setNewIsOpen(false)} style={styles.closeBtn}>
                                <Text style={styles.closeText}>Close Form</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/*Dashboard */}
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                    <Text style={styles.subHeader}>Welcome back! Here's your overview.</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>👤 Profile Summary</Text>

                    <View style={styles.profileRow}>
                        <Text style={styles.label}>Full Name:</Text>
                        <Text style={styles.value}>Johnathan Doe</Text>
                    </View>

                    <View style={styles.profileRow}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>john.doe@example.com</Text>
                    </View>

                    <View style={styles.profileRow}>
                        <Text style={styles.label}>Position:</Text>
                        <Text style={styles.value}>Productivity Manager</Text>
                    </View>

                    <View style={styles.profileRow}>
                        <Text style={styles.label}>Department:</Text>
                        <Text style={styles.value}>Project & Task Management</Text>
                    </View>

                    <View style={styles.profileRow}>
                        <Text style={styles.label}>Joined:</Text>
                        <Text style={styles.value}>March 15, 2023</Text>
                    </View>

                    <View style={styles.profileRow}>
                        <Text style={styles.label}>Last Active:</Text>
                        <Text style={styles.value}>2 hours ago</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}> Quick Shortcuts</Text>

                <View style={styles.shortcutGrid}>
                    <TouchableOpacity style={styles.shortcutCard} onPress={() => navigation.navigate('Profile')}>
                        <Text style={styles.shortcutText}>My Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shortcutCard}>
                        <Text style={styles.shortcutText}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shortcutCard}>
                        <Text style={styles.shortcutText}>Notifications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shortcutCard}>
                        <Text style={styles.shortcutText}>Support</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}> Recent Updates</Text>

                <View style={styles.activityCard}>
                    <View style={styles.activityItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.activityText}>You created 3 tasks today.</Text>
                    </View>
                    <View style={styles.activityItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.activityText}>Team review scheduled for tomorrow.</Text>
                    </View>
                    <View style={styles.activityItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.activityText}>Task reminder updated 2 hours ago.</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    container: {
        padding: 20,
        alignItems: "center",
    },
    header: {
        backgroundColor: "#000",
        width: "100%",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    subHeader: {
        color: "#ccc",
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        alignSelf: "flex-start",
        marginBottom: 10,
        marginTop: 20,
    },
    card: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
    },
    cardDetail: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
    },
    gridItem: {
        width: "48%",
        backgroundColor: "#e9e9e9",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: "center",
    },
    gridText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    activityCard: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 30,
    },
    activityText: {
        color: "#555",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
        color: "#000",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#000000aa",
        justifyContent: "center",
        padding: 20,
    },
    modalBox: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        height: "80%",
    },
    addBtn: {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 8,
    },
    addBtnText: {
        color: "white",
        fontWeight: "bold",
    },
    deleteBtn: {
        marginTop: 10,
        backgroundColor: "#b03a2e",
        padding: 10,
        borderRadius: 6,
    },
    deleteBtnText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    closeBtn: {
        marginTop: 10,
        backgroundColor: "#aaa",
        padding: 10,
        borderRadius: 6,
    },
    closeText: {
        color: "#fff",
        fontWeight: "600",
    },
    headerBtn: {
        marginRight: 15,
    },
    headerBtnText: {
        fontWeight: "bold",
        color: "black",
    },
    profileRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        fontWeight: "600",
        color: "#333",
    },
    value: {
        fontWeight: "400",
        color: "#555",
        maxWidth: "60%",
        textAlign: "right",
    },
    shortcutGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 10,
        width: "100%",
    },
    shortcutCard: {
        width: "48%",
        backgroundColor: "#ffffff",
        paddingVertical: 25,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 15,
        elevation: 2,
    },
    shortcutText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    activityItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    bullet: {
        fontSize: 20,
        marginRight: 8,
        color: "#444",
    },
    activityText: {
        fontSize: 14,
        color: "#555",
        flex: 1,
    },

});
