import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../../../shared/Button";
import { theme } from "../../../core/theme/theme";
import { RootStackParamList } from "../../../core/navigation/types";
import { useStudentDetail } from "./useStudentDetail";
import { strings } from "./strings";

type Props = NativeStackScreenProps<RootStackParamList, "StudentDetail">;

// See docs/01-architecture/screens/student-detail.md. "Registrar sesión" and "Ver historial"
// are shown disabled: AttendanceForm and AttendanceHistory (HU1-HU4) are not built yet.
export function StudentDetailScreen({ route, navigation }: Props) {
  const { studentId } = route.params;
  const { state, reload } = useStudentDetail(studentId);

  // Header shows the student's name once it is known; back comes from the native stack.
  useLayoutEffect(() => {
    if (state.status === "loaded") navigation.setOptions({ title: state.student.name });
  }, [navigation, state]);

  // Opened straight from a URL there is no screen behind, so "back" goes to the list.
  const backToList = () =>
    navigation.canGoBack() ? navigation.goBack() : navigation.replace("StudentList");

  if (state.status === "loading") {
    return (
      <View style={styles.content} accessible accessibilityLabel={strings.detail.loadingA11y}>
        <View style={styles.card}>
          <View style={[styles.skeletonLine, { width: "60%" }]} />
          <View style={[styles.skeletonLine, { width: "40%", marginTop: theme.space.md }]} />
        </View>
      </View>
    );
  }

  if (state.status === "error" || state.status === "notFound") {
    const notFound = state.status === "notFound";
    return (
      <View style={[styles.content, styles.centered]} accessibilityRole="alert">
        <Text style={styles.errorTitle}>
          {notFound ? strings.detail.notFoundTitle : strings.detail.errorMessage}
        </Text>
        <Text style={styles.muted}>{notFound ? strings.detail.notFoundHint : strings.errorHint}</Text>
        {!notFound && <Button label={strings.retryButton} onPress={reload} />}
        <Button
          label={strings.detail.backToList}
          onPress={backToList}
          variant={notFound ? "primary" : "text"}
        />
      </View>
    );
  }

  const { student } = state;
  return (
    <View style={styles.content}>
      <View style={styles.card}>
        <Text style={styles.label}>{strings.detail.nameLabel}</Text>
        <Text style={styles.value}>{student.name}</Text>
        <Text style={[styles.label, { marginTop: theme.space.md }]}>{strings.detail.documentLabel}</Text>
        <Text style={styles.value}>{student.documentNumber}</Text>
      </View>
      <Button label={strings.detail.registerSession} onPress={() => {}} disabled />
      <Button label={strings.detail.viewHistory} onPress={() => {}} variant="text" disabled />
      <Text style={[styles.muted, { textAlign: "center" }]}>{strings.detail.comingSoon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    maxWidth: theme.layout.maxContentWidth,
    alignSelf: "center",
    padding: theme.space.md,
    gap: theme.space.sm,
  },
  centered: { alignItems: "center", justifyContent: "center", padding: theme.space.lg },
  card: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.borderStrong,
    padding: theme.space.md,
    marginBottom: theme.space.sm,
  },
  label: { ...theme.text.caption, color: theme.color.textMuted },
  value: { ...theme.text.body, color: theme.color.text },
  muted: { ...theme.text.body, color: theme.color.textMuted, textAlign: "center" },
  errorTitle: { ...theme.text.subtitle, color: theme.color.error, textAlign: "center" },
  skeletonLine: { height: 14, borderRadius: theme.radius.sm, backgroundColor: theme.color.border },
});
