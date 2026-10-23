import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Tracker</Text>

      <Text style={styles.description}>
        Track your sleep habits and view your weekly sleep information.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/sleep-log")}
      >
        <Text style={styles.buttonText}>Add Sleep Log</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/sleep-log-list")}
      >
        <Text style={styles.buttonText}>View Sleep Log List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/statistics")}
      >
        <Text style={styles.buttonText}>View Sleep Statistics</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#172554",
  },
  description: {
    fontSize: 18,
    marginBottom: 32,
    color: "#475569",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});