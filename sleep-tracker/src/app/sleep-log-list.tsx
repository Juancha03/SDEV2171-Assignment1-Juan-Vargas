import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface SleepEntry {
  id: number;
  date: string;
  bedTime: string;
  wakeTime: string;
  quality: number;
}


const API_URL = "http://10.0.2.2:3000/sleep-entries";


export default function SleepLogListScreen() {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getSleepEntries() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not get sleep entries.");
        }

        const data = await response.json();
        setSleepEntries(data);
      } catch (error) {
        setErrorMessage("Could not load sleep entries from the backend.");
      } finally {
        setIsLoading(false);
      }
    }

    getSleepEntries();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.message}>Loading sleep entries...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Log List</Text>

      <FlatList
        data={sleepEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.entryText}>Time to bed: {item.bedTime}</Text>
            <Text style={styles.entryText}>Time awake: {item.wakeTime}</Text>
            <Text style={styles.entryText}>Sleep quality: {item.quality}/5</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f0f0f0",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: "#b91c1c",
    textAlign: "center",
  },
  entryCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 8,
  },
  entryText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 4,
  },
});