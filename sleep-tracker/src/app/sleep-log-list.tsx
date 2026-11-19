import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEntries } from "../context/EntriesContext";

export default function SleepLogListScreen() {
  const { entries, isLoading, errorMessage } = useEntries();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading sleep entries...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Log List</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No sleep entries found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>

            <Text style={styles.entryText}>
              Sleep Log: {item.title}
            </Text>

            <Text style={styles.entryText}>
              Sleep Duration: {item.value} hours
            </Text>

            <Text style={styles.entryText}>
              Sleep Quality: {item.rating}/5
            </Text>

            {item.details?.bedTime ? (
              <Text style={styles.entryText}>
                Time to Bed: {item.details.bedTime}
              </Text>
            ) : null}

            {item.details?.wakeTime ? (
              <Text style={styles.entryText}>
                Time Awake: {item.details.wakeTime}
              </Text>
            ) : null}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#475569",
    marginTop: 12,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 16,
    marginBottom: 16,
  },
  emptyText: {
    color: "#475569",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 10,
  },
  entryText: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 5,
  },
});