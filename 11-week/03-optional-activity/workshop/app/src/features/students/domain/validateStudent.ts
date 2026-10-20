// Field rules for the "Add student" form. The API only rejects blank values
// (docs/03-api-and-data/api-contract.md, E-02); these rules are stricter on purpose and live
// in the app. Why each rule exists: 11-week workshop docs/06-forms.md.
export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 60;
export const DOCUMENT_MIN_LENGTH = 6;
export const DOCUMENT_MAX_LENGTH = 10;

const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;
const DOCUMENT_PATTERN = /^\d+$/;

export type NameError = "required" | "invalidCharacters" | "tooShort" | "tooLong";
export type DocumentError = "required" | "notDigits" | "badLength";

export function validateName(raw: string): NameError | null {
  const value = raw.trim();
  if (value.length === 0) return "required";
  if (!NAME_PATTERN.test(value)) return "invalidCharacters";
  if (value.length < NAME_MIN_LENGTH) return "tooShort";
  if (value.length > NAME_MAX_LENGTH) return "tooLong";
  return null;
}

export function validateDocumentNumber(raw: string): DocumentError | null {
  const value = raw.trim();
  if (value.length === 0) return "required";
  if (!DOCUMENT_PATTERN.test(value)) return "notDigits";
  if (value.length < DOCUMENT_MIN_LENGTH || value.length > DOCUMENT_MAX_LENGTH) return "badLength";
  return null;
}
