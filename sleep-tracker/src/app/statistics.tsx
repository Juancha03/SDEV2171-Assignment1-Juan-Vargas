import { StyleSheet, Text, View } from "react-native";
import StatCard from "../components/StatCard";


export default function StatisticsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sleep Statistics</Text>

            <Text style={styles.description}>Summary of your sleep patterns</Text>

            <View style={styles.grid}>
                <StatCard title="Last 7 Days Sleep Duration" value="7h 30m" />

                <StatCard title="Average Sleep Quality" value="Good" />
                
                <StatCard title="Longest Sleep Duration" value="9h 15m" />

                <StatCard title="Shortest Sleep Duration" value="5h 45m" />

                <StatCard title="Average Time to Bed" value="10:30 PM" />

                <StatCard title="Average Wake Time" value="6:45 AM" />

            </View>
        </View>
    );
}

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
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20
    }
});
