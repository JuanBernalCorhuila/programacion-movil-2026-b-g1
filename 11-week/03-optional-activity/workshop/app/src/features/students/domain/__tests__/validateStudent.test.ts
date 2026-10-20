/// <reference types="jest" />
import { validateDocumentNumber, validateName } from "../validateStudent";

describe("validateName", () => {
  it.each([
    ["", "required"],
    ["   ", "required"],
    ["Ana3", "invalidCharacters"],
    ["Al", "tooShort"],
    ["A".repeat(61), "tooLong"],
  ])("rejects %j with %s", (value, expected) => {
    expect(validateName(value)).toBe(expected);
  });

  it("accepts names with accents, ñ and spaces", () => {
    expect(validateName("  María José Peña ")).toBeNull();
  });
});

describe("validateDocumentNumber", () => {
  it.each([
    ["", "required"],
    ["1.082.345", "notDigits"],
    ["10823 45678", "notDigits"],
    ["12345", "badLength"],
    ["10823456789", "badLength"],
  ])("rejects %j with %s", (value, expected) => {
    expect(validateDocumentNumber(value)).toBe(expected);
  });

  it("accepts 6 to 10 digits", () => {
    expect(validateDocumentNumber("1082345678")).toBeNull();
    expect(validateDocumentNumber("123456")).toBeNull();
  });
});
