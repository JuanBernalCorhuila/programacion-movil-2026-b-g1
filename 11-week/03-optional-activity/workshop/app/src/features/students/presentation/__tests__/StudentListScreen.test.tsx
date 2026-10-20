/// <reference types="jest" />
import { fireEvent, render, screen } from "@testing-library/react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StudentListScreen } from "../StudentListScreen";
import { container } from "../../../../core/di/container";
import { NetworkError } from "../../../../core/errors";
import { RootStackParamList } from "../../../../core/navigation/types";
import { strings } from "../strings";

jest.mock("../../../../core/di/container", () => ({
  container: {
    students: {
      getStudents: { execute: jest.fn() },
      createStudent: { execute: jest.fn() },
    },
  },
}));
jest.mock("../../../auth/presentation/AuthContext", () => ({
  useAuth: () => ({ logout: jest.fn() }),
}));
jest.mock("../../../../core/network/useConnectivity", () => ({
  useConnectivity: () => true,
}));

type Props = NativeStackScreenProps<RootStackParamList, "StudentList">;

const getStudents = container.students.getStudents.execute as jest.Mock;
const props = {
  navigation: { setOptions: jest.fn() },
  route: { key: "StudentList", name: "StudentList" },
} as unknown as Props;

describe("StudentListScreen error state", () => {
  beforeEach(() => getStudents.mockReset());

  it("shows the error message when the students cannot be loaded", async () => {
    getStudents.mockRejectedValue(new NetworkError("No pudimos conectar con el servidor"));

    await render(<StudentListScreen {...props} />);

    expect(await screen.findByText(strings.errorMessage)).toBeTruthy();
    expect(screen.getByRole("button", { name: strings.retryButton })).toBeTruthy();
  });

  it("asks for the students again when Reintentar is pressed", async () => {
    getStudents
      .mockRejectedValueOnce(new NetworkError("No pudimos conectar con el servidor"))
      .mockResolvedValueOnce({
        students: [{ id: "1", name: "Ana Torres", documentNumber: "1082345678" }],
        fromCache: false,
      });

    await render(<StudentListScreen {...props} />);
    await fireEvent.press(await screen.findByRole("button", { name: strings.retryButton }));

    expect(await screen.findByText("Ana Torres")).toBeTruthy();
    expect(getStudents).toHaveBeenCalledTimes(2);
  });
});
