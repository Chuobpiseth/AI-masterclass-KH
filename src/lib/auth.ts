"use server";

import studentsData from "@/data/students.json";
import type { Student } from "@/types";

const students: Student[] = studentsData as Student[];

/**
 * Validate a student access code via Google Sheets API.
 * Returns the student if found and active, or null.
 */
export async function validateAccessCode(code: string, deviceName: string = "Unknown Device"): Promise<Student | null> {
  const normalizedCode = code.trim().toUpperCase();
  const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API;

  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_GOOGLE_SHEETS_API is not set. Falling back to local students.json");
    const student = students.find(
      (s) => s.code === normalizedCode && s.status === "active"
    );
    return student || null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: normalizedCode, deviceName }),
    });

    const data = await response.json();
    if (data.success && data.student) {
      return data.student as Student;
    }
    return null;
  } catch (error) {
    console.error("Error validating code via Google Sheets:", error);
    return null;
  }
}

/**
 * Check if an access code exists (regardless of status)
 */
export async function codeExists(code: string): Promise<boolean> {
  const normalizedCode = code.trim().toUpperCase();
  return students.some((s) => s.code === normalizedCode);
}

/**
 * Get student by code (Check if code exists regardless of status)
 */
export async function getStudentByCode(code: string): Promise<Student | null> {
  const normalizedCode = code.trim().toUpperCase();
  const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API;

  if (!apiUrl) {
    return students.find((s) => s.code === normalizedCode) || null;
  }

  // If using live API, we rely on validateAccessCode to give us the exact error.
  // For UI purposes, we can just return a dummy inactive student if we want to show the "inactive" message, 
  // but the API handles the exact error. For now, fallback to local if needed or return null.
  return students.find((s) => s.code === normalizedCode) || null;
}
