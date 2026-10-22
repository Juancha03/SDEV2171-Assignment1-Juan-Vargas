import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Sleep Tracker" }}
      />

      <Stack.Screen
        name="sleep-log"
        options={{ title: "Sleep Log Entry" }}
      />

      <Stack.Screen
        name="sleep-log-list"
        options={{ title: "Sleep Log List" }}
      />

      <Stack.Screen
        name="statistics"
        options={{ title: "Sleep Statistics" }}
      />
    </Stack>
  );
}