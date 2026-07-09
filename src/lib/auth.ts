import studentsData from "@/data/students.json";
import type { Student } from "@/types";

const students: Student[] = studentsData as Student[];

/**
 * Validate a student access code.
 * Returns the student if found and active, or null.
 */
export function validateAccessCode(code: string): Student | null {
  const normalizedCode = code.trim().toUpperCase();
  const student = students.find(
    (s) => s.code === normalizedCode && s.status === "active"
  );
  return student || null;
}

/**
 * Check if an access code exists (regardless of status)
 */
export function codeExists(code: string): boolean {
  const normalizedCode = code.trim().toUpperCase();
  return students.some((s) => s.code === normalizedCode);
}

/**
 * Get student by code
 */
export function getStudentByCode(code: string): Student | null {
  const normalizedCode = code.trim().toUpperCase();
  return students.find((s) => s.code === normalizedCode) || null;
}
