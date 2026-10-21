/// <reference types="jest" />
import { renderHook, waitFor } from "@testing-library/react-native";
import { useStudentDetail } from "../useStudentDetail";
import { container } from "../../../../core/di/container";
import { NetworkError } from "../../../../core/errors";

jest.mock("../../../../core/di/container", () => ({
  container: { students: { getStudentById: { execute: jest.fn() } } },
}));

const getStudentById = container.students.getStudentById.execute as jest.Mock;

describe("useStudentDetail", () => {
  beforeEach(() => getStudentById.mockReset());

  it("loads the student with the id from the route", async () => {
    const student = { id: "1", name: "Ana Torres", documentNumber: "1082345678" };
    getStudentById.mockResolvedValue(student);

    const { result } = await renderHook(() => useStudentDetail("1"));

    await waitFor(() => expect(result.current.state).toEqual({ status: "loaded", student }));
    expect(getStudentById).toHaveBeenCalledWith("1");
  });

  it("reports notFound when no student has that id", async () => {
    getStudentById.mockResolvedValue(null);

    const { result } = await renderHook(() => useStudentDetail("does-not-exist"));

    await waitFor(() => expect(result.current.state).toEqual({ status: "notFound" }));
  });

  it("reports error when the request fails", async () => {
    getStudentById.mockRejectedValue(new NetworkError("No pudimos conectar con el servidor"));

    const { result } = await renderHook(() => useStudentDetail("1"));

    await waitFor(() => expect(result.current.state).toEqual({ status: "error" }));
  });
});
