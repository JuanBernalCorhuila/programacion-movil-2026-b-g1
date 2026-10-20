// See docs/01-architecture/navigation.md — this is meant to mirror the full route registry
// there (5 routes total), but only Login/StudentList are built this corte (HU5/HU6/HU7).
// StudentDetail, AttendanceForm, AttendanceHistory get added here when those HUs are built —
// adding their types now, with no screen behind them, would be dead code.
export type RootStackParamList = {
  Login: undefined;
  StudentList: undefined;
};
