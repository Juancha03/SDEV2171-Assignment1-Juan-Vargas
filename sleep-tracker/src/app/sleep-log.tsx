import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

function getPreviousNightDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return date.toLocaleDateString("en-CA");
}

export default function SleepLogScreen() {
  const [date, setDate] = useState(getPreviousNightDate());
  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [quality, setQuality] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit() {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
    const qualityNumber = Number(quality);

    if (!date || !bedTime || !wakeTime || !quality) {
      setErrorMessage("Please complete all of the sleep log fields.");
      return;
    }

    if (!datePattern.test(date)) {
      setErrorMessage("Please enter the date as YYYY-MM-DD.");
      return;
    }

    if (!timePattern.test(bedTime) || !timePattern.test(wakeTime)) {
      setErrorMessage("Please enter both times using the HH:MM format.");
      return;
    }

    if (qualityNumber < 1 || qualityNumber > 5) {
      setErrorMessage("Sleep quality must be a number from 1 to 5.");
      return;
    }

    setErrorMessage("");

    Alert.alert(
      "Sleep log saved",
      "Your sleep log was submitted successfully. This assignment does not save it permanently."
    );

    setDate(getPreviousNightDate());
    setBedTime("");
    setWakeTime("");
    setQuality("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Your Sleep</Text>

      <Text style={styles.description}>
        Enter your sleep information for the previous night.
      </Text>

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Time to Bed</Text>
      <TextInput
        style={styles.input}
        value={bedTime}
        onChangeText={setBedTime}
        placeholder="Example: 22:30"
      />

      <Text style={styles.label}>Time Awake</Text>
      <TextInput
        style={styles.input}
        value={wakeTime}
        onChangeText={setWakeTime}
        placeholder="Example: 06:45"
      />

      <Text style={styles.label}>Sleep Quality</Text>
      <TextInput
        style={styles.input}
        value={quality}
        onChangeText={setQuality}
        placeholder="Enter a number from 1 to 5"
        keyboardType="numeric"
      />

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Sleep Log</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  error: {
    color: "#b91c1c",
    fontSize: 15,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});