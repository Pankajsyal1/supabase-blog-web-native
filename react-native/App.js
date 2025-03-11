import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import MainNavigator from "./navigation/MainNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

function AppContent() {
  const { session, loading } = useAuth();

  if (loading)
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size={24} color={"red"} />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {session ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures it takes the full screen
    backgroundColor: "#fff", // Adjust background if needed
    paddingTop: 20
  },
});
