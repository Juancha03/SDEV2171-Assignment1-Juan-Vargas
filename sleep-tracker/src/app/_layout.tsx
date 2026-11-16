import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { EntriesProvider } from "../context/EntriesContext";

function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      {isAuthenticated ? (
        <>
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
        </>
      ) : (
        <>
          <Stack.Screen
            name="login"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="register"
            options={{ title: "Create Account" }}
          />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <EntriesProvider>
        <AppNavigator />
      </EntriesProvider>
    </AuthProvider>
  );
}