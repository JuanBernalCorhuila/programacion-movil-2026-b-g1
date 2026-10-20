import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../../features/auth/presentation/LoginScreen";
import { useAuth } from "../../features/auth/presentation/AuthContext";
import { StudentListScreen } from "../../features/students/presentation/StudentListScreen";
import { strings as studentStrings } from "../../features/students/presentation/strings";
import { theme } from "../theme/theme";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Auth is guarded centrally here, not inside individual screens — see
// docs/01-architecture/navigation.md.
// Stack pattern: Health Track has one main section (the trainer's students) and every other
// screen is reached from a student (detail, attendance), so a stack fits better than tabs.
// Authenticated screens share the native header so they all look and behave the same.
export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.color.surface },
          headerTintColor: theme.color.primary,
          headerTitleStyle: { ...theme.text.subtitle, color: theme.color.text },
          contentStyle: { backgroundColor: theme.color.background },
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen
            name="StudentList"
            component={StudentListScreen}
            options={{ title: studentStrings.screenTitle }}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
