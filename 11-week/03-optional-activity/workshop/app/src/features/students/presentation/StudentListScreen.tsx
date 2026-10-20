import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../../../shared/Button";
import { theme } from "../../../core/theme/theme";
import { useAuth } from "../../auth/presentation/AuthContext";
import { useConnectivity } from "../../../core/network/useConnectivity";
import { useStudentList } from "./useStudentList";
import { AddStudentModal } from "./AddStudentModal";
import { strings } from "./strings";
import { Student } from "../domain/Student";
import { RootStackParamList } from "../../../core/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "StudentList">;

// See docs/01-architecture/screens/student-list.md for the full spec this implements.
//
// SCOPE NOTE for this corte: tapping a student card is a documented action ("Navigate to
// StudentDetail with studentId") but StudentDetail isn't built yet — HU5/HU6/HU7 only. The
// tap is wired to nothing for now rather than crashing on a missing route; it becomes real
// navigation once StudentDetail exists.
export function StudentListScreen({ navigation }: Props) {
  const { logout } = useAuth();
  const { state, reload } = useStudentList();
  const isConnected = useConnectivity();
  const [modalVisible, setModalVisible] = useState(false);

  const showOfflineBanner = state.isOffline || !isConnected;

  // Header actions live in the stack header: "Cerrar sesión" on the left, away from the
  // primary "+" action on the right (see docs/01-ux-audit.md, finding 1).
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={strings.logoutButtonA11y}
          onPress={logout}
          hitSlop={8}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>{strings.logoutButtonA11y}</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={strings.addStudentCta}
          onPress={() => setModalVisible(true)}
          disabled={showOfflineBanner}
          hitSlop={8}
          style={[styles.headerButton, showOfflineBanner && styles.iconButtonDisabled]}
        >
          <Text style={styles.iconButtonLabel}>+</Text>
        </Pressable>
      ),
    });
  }, [navigation, logout, showOfflineBanner]);

  return (
    <View style={styles.container}>
      {showOfflineBanner && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{strings.offlineBanner}</Text>
        </View>
      )}

      {state.status === "loading" && <SkeletonList />}

      {state.status === "empty" && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>{strings.emptyMessage}</Text>
          <Button label={strings.addStudentCta} onPress={() => setModalVisible(true)} />
        </View>
      )}

      {state.status === "error" && (
        <View style={styles.centered} accessibilityRole="alert">
          <Text style={styles.errorTitle}>{strings.errorMessage}</Text>
          <Text style={styles.emptyText}>{strings.errorHint}</Text>
          <Button label={strings.retryButton} onPress={reload} />
        </View>
      )}

      {state.status === "loaded" && (
        <FlatList
          data={state.students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StudentCard student={item} />}
          refreshControl={<RefreshControl refreshing={false} onRefresh={reload} />}
        />
      )}

      <AddStudentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreated={reload}
      />
    </View>
  );
}

function StudentCard({ student }: { student: Student }) {
  return (
    // See SCOPE NOTE above — no-op until StudentDetail exists.
    <Pressable accessible accessibilityRole="button" accessibilityLabel={student.name} style={styles.card}>
      <Text style={styles.cardText}>{student.name}</Text>
      <Text style={styles.cardCaption}>
        {strings.documentPrefix} {student.documentNumber}
      </Text>
    </Pressable>
  );
}

// Same shape as StudentCard (name line + document line) so the layout does not jump when
// the data arrives.
function SkeletonList() {
  return (
    <View accessible accessibilityLabel={strings.loadingA11y} accessibilityRole="progressbar">
      {[0, 1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.card}>
          <View style={[styles.skeletonLine, { width: "55%" }]} />
          <View style={[styles.skeletonLine, styles.skeletonCaption]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.color.background },
  headerButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.pill,
  },
  iconButtonDisabled: { opacity: 0.4 },
  iconButtonLabel: { fontSize: 22, color: theme.color.primary },
  headerButtonText: { ...theme.text.body, color: theme.color.secondary },
  banner: { backgroundColor: theme.color.border, padding: theme.space.sm },
  bannerText: { ...theme.text.caption, color: theme.color.text, textAlign: "center" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", gap: theme.space.md, padding: theme.space.lg },
  emptyText: { ...theme.text.body, color: theme.color.textMuted, textAlign: "center" },
  card: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    marginHorizontal: theme.space.md,
    marginVertical: theme.space.xs,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.borderStrong,
  },
  cardText: { ...theme.text.body, color: theme.color.text },
  cardCaption: { ...theme.text.caption, color: theme.color.textMuted },
  errorTitle: { ...theme.text.subtitle, color: theme.color.error, textAlign: "center" },
  skeletonLine: {
    height: 14,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.color.border,
  },
  skeletonCaption: { width: "35%", height: 10, marginTop: theme.space.xs },
});
