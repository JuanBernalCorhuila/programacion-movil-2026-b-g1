// See docs/01-architecture/navigation.md — this is meant to mirror the full route registry
// there (5 routes total). Login, StudentList and StudentDetail are built; AttendanceForm and
// AttendanceHistory get added here when those HUs are built — adding their types now, with
// no screen behind them, would be dead code.
export type RootStackParamList = {
  Login: undefined;
  StudentList: undefined;
  // An identifier, not the whole Student: the detail screen loads it again (navigation.md rules).
  StudentDetail: { studentId: string };
};
