"use server";

import studentsData from "@/data/students.json";
import type { Student } from "@/types";

const students: Student[] = studentsData as Student[];

/**
 * Validate a student access code.
 * Returns the student if found and active, or null.
 */
export async function validateAccessCode(code: string): Promise<Student | null> {
  const normalizedCode = code.trim().toUpperCase();
  const student = students.find(
    (s) => s.code === normalizedCode && s.status === "active"
  );
  return student || null;
}

/**
 * Check if an access code exists (regardless of status)
 */
export async function codeExists(code: string): Promise<boolean> {
  const normalizedCode = code.trim().toUpperCase();
  return students.some((s) => s.code === normalizedCode);
}

/**
 * Get student by code
 */
export async function getStudentByCode(code: string): Promise<Student | null> {
  const normalizedCode = code.trim().toUpperCase();
  return students.find((s) => s.code === normalizedCode) || null;
}
