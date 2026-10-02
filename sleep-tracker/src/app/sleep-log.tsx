import { Text, StyleSheet, TextInput, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#f0f0f0"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#172554",
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        color: "#172554",
        marginBottom: 8
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        marginBottom: 20,
    },
    note: {
        fontSize: 10,
        color: "#6b7280",
        marginTop: 14,
        textAlign: "center",
    },
});


const previousNightSleep = new Date();
previousNightSleep.setDate(previousNightSleep.getDate() - 1);


export default function SleepLogScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log Your Sleep</Text>
            <Text style={styles.label}>Date</Text>
            <TextInput
                style={styles.input}
                defaultValue={previousNightSleep.toLocaleDateString()}/>
            <Text style={styles.label}>Time to Bed</Text>
            <TextInput
                style={styles.input}
                defaultValue="10:00 PM"/>

            <Text style={styles.label}>Time Awake</Text>
            <TextInput
                style={styles.input}
                defaultValue="7:00 AM"/>

            <Text style={styles.label}>Sleep Quality</Text>
            <TextInput
                style={styles.input}
                defaultValue="Good"/>

            <Text style={styles.note}>Note: This is a mockup screen. The data entered here will not be saved.</Text>
        </View>
    );
}    