import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Button } from "../../../shared/Button";
import { theme } from "../../../core/theme/theme";
import { useAuth } from "../../auth/presentation/AuthContext";
import { useConnectivity } from "../../../core/network/useConnectivity";
import { useStudentList } from "./useStudentList";
import { AddStudentModal } from "./AddStudentModal";
import { strings } from "./strings";
import { Student } from "../domain/Student";

// See docs/01-architecture/screens/student-list.md for the full spec this implements.
//
// SCOPE NOTE for this corte: tapping a student card is a documented action ("Navigate to
// StudentDetail with studentId") but StudentDetail isn't built yet — HU5/HU6/HU7 only. The
// tap is wired to nothing for now rather than crashing on a missing route; it becomes real
// navigation once StudentDetail exists.
export function StudentListScreen() {
  const { logout } = useAuth();
  const { state, reload } = useStudentList();
  const isConnected = useConnectivity();
  const [modalVisible, setModalVisible] = useState(false);

  const showOfflineBanner = state.isOffline || !isConnected;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.screenTitle}</Text>
        <View style={styles.headerActions}>
          <Pressable
            accessible
            accessibilityRole="button"
            accessibilityLabel={strings.addStudentCta}
            onPress={() => setModalVisible(true)}
            disabled={showOfflineBanner}
            hitSlop={8}
            style={[styles.iconButton, showOfflineBanner && styles.iconButtonDisabled]}
          >
            <Text style={styles.iconButtonLabel}>+</Text>
          </Pressable>
          <Pressable
            accessible
            accessibilityRole="button"
            accessibilityLabel={strings.logoutButtonA11y}
            onPress={logout}
            hitSlop={8}
            style={styles.iconButton}
          >
            <Text style={styles.iconButtonLabel}>⎋</Text>
          </Pressable>
        </View>
      </View>

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
        <View style={styles.centered}>
          <Text style={styles.emptyText}>{strings.errorMessage}</Text>
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
    </Pressable>
  );
}

function SkeletonList() {
  return (
    <View style={{ padding: theme.space.md }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.skeletonRow} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.color.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.space.md,
  },
  title: { ...theme.text.title, color: theme.color.text },
  headerActions: { flexDirection: "row", gap: theme.space.sm },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.pill,
  },
  iconButtonDisabled: { opacity: 0.4 },
  iconButtonLabel: { fontSize: 22, color: theme.color.primary },
  banner: { backgroundColor: theme.color.border, padding: theme.space.sm },
  bannerText: { ...theme.text.caption, color: theme.color.text, textAlign: "center" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", gap: theme.space.md, padding: theme.space.lg },
  emptyText: { ...theme.text.body, color: theme.color.textMuted, textAlign: "center" },
  card: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: theme.space.md,
    marginHorizontal: theme.space.md,
    marginVertical: theme.space.xs,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.border,
  },
  cardText: { ...theme.text.body, color: theme.color.text },
  skeletonRow: {
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.color.border,
    marginBottom: theme.space.sm,
  },
});
