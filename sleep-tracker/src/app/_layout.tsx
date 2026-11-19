import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { EntriesProvider } from "../context/EntriesContext";

function AppNavigator() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const onAuthScreen =
      segments[0] === "login" || segments[0] === "register";

    if (!isAuthenticated && !onAuthScreen) {
      router.replace("/login");
    }

    if (isAuthenticated && onAuthScreen) {
      router.replace("/");
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="register"
        options={{ title: "Create Account" }}
      />

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

export default function RootLayout() {
  return (
    <AuthProvider>
      <EntriesProvider>
        <AppNavigator />
      </EntriesProvider>
    </AuthProvider>
  );
}