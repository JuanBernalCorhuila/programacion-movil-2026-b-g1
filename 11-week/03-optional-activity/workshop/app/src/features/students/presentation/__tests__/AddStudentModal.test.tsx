/// <reference types="jest" />
import { fireEvent, render, screen } from "@testing-library/react-native";
import { AddStudentModal } from "../AddStudentModal";
import { container } from "../../../../core/di/container";
import { ConflictError } from "../../../../core/errors";
import { strings } from "../strings";

jest.mock("../../../../core/di/container", () => ({
  container: { students: { createStudent: { execute: jest.fn() } } },
}));

const createStudent = container.students.createStudent.execute as jest.Mock;

async function fillAndSave(name: string, documentNumber: string) {
  await fireEvent.changeText(screen.getByLabelText(strings.modal.nameLabel), name);
  await fireEvent.changeText(screen.getByLabelText(strings.modal.documentLabel), documentNumber);
  await fireEvent.press(screen.getByRole("button", { name: strings.modal.saveButton }));
}

describe("AddStudentModal feedback", () => {
  beforeEach(() => createStudent.mockReset());

  it("shows the duplicate document message when the API answers 409", async () => {
    createStudent.mockRejectedValue(new ConflictError("duplicate"));
    await render(<AddStudentModal visible onClose={jest.fn()} onCreated={jest.fn()} />);

    await fillAndSave("Ana Torres", "1082345678");

    expect(await screen.findByText(strings.modal.duplicateDocumentError)).toBeTruthy();
  });

  it("passes the created student to onCreated", async () => {
    const student = { id: "1", name: "Ana Torres", documentNumber: "1082345678" };
    createStudent.mockResolvedValue(student);
    const onCreated = jest.fn();
    await render(<AddStudentModal visible onClose={jest.fn()} onCreated={onCreated} />);

    await fillAndSave("Ana Torres", "1082345678");

    expect(onCreated).toHaveBeenCalledWith(student);
  });
});
