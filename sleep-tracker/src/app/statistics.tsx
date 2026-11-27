import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StatCard from "../components/StatCard";
import { useEntries } from "../context/EntriesContext";

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  const roundedMinutes = Math.round(totalMinutes);
  const hours = Math.floor(roundedMinutes / 60) % 24;
  const minutes = roundedMinutes % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export default function StatisticsScreen() {
  const { entries, isLoading, errorMessage } = useEntries();

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.message}>
          Loading sleep statistics...
        </Text>
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

  const totalEntries = entries.length;

  const averageQuality =
    totalEntries > 0
      ? entries.reduce(
          (total, entry) => total + entry.rating,
          0
        ) / totalEntries
      : 0;

  const bedTimes = entries
    .map((entry) => entry.details?.bedTime)
    .filter((time): time is string => Boolean(time));

  const wakeTimes = entries
    .map((entry) => entry.details?.wakeTime)
    .filter((time): time is string => Boolean(time));

  const averageBedTime =
    bedTimes.length > 0
      ? bedTimes.reduce(
          (total, time) => total + timeToMinutes(time),
          0
        ) / bedTimes.length
      : 0;

  const averageWakeTime =
    wakeTimes.length > 0
      ? wakeTimes.reduce(
          (total, time) => total + timeToMinutes(time),
          0
        ) / wakeTimes.length
      : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Statistics</Text>

      <Text style={styles.description}>
        Summary calculated from your sleep entries
      </Text>

      <View style={styles.grid}>
        <StatCard
          title="Total Sleep Entries"
          value={totalEntries.toString()}
        />

        <StatCard
          title="Average Sleep Quality"
          value={
            totalEntries > 0
              ? `${averageQuality.toFixed(1)} / 5`
              : "N/A"
          }
        />

        <StatCard
          title="Average Time to Bed"
          value={
            bedTimes.length > 0
              ? minutesToTime(averageBedTime)
              : "N/A"
          }
        />

        <StatCard
          title="Average Wake Time"
          value={
            wakeTimes.length > 0
              ? minutesToTime(averageWakeTime)
              : "N/A"
          }
        />
      </View>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333333",
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});