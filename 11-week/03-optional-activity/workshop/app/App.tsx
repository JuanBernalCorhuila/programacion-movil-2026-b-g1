import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/features/auth/presentation/AuthContext";
import { RootNavigator } from "./src/core/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
