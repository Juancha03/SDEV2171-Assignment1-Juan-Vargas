import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StatCard from "../components/StatCard";

interface SleepEntry {
  id: number;
  date: string;
  bedTime: string;
  wakeTime: string;
  quality: number;
}

const API_URL = "http://10.0.2.2:3000/sleep-entries";

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export default function StatisticsScreen() {
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
      } catch {
        setErrorMessage("Could not load sleep statistics from the backend.");
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
        <Text style={styles.message}>Loading sleep statistics...</Text>
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

  const totalEntries = sleepEntries.length;

  const averageQuality =
    sleepEntries.reduce((total, entry) => total + entry.quality, 0) /
    totalEntries;

  const averageBedTime =
    sleepEntries.reduce(
      (total, entry) => total + timeToMinutes(entry.bedTime),
      0
    ) / totalEntries;

  const averageWakeTime =
    sleepEntries.reduce(
      (total, entry) => total + timeToMinutes(entry.wakeTime),
      0
    ) / totalEntries;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Statistics</Text>

      <Text style={styles.description}>
        Summary calculated from your sleep entries
      </Text>

      <View style={styles.grid}>
        <StatCard title="Total Sleep Entries" value={totalEntries.toString()} />

        <StatCard
          title="Average Sleep Quality"
          value={`${averageQuality.toFixed(1)} / 5`}
        />

        <StatCard
          title="Average Time to Bed"
          value={minutesToTime(averageBedTime)}
        />

        <StatCard
          title="Average Wake Time"
          value={minutesToTime(averageWakeTime)}
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