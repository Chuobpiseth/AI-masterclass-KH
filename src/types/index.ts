// ============================================================
// Student Types
// ============================================================

export interface Student {
  name: string;
  code: string;
  status: "active" | "inactive" | "suspended";
}

// ============================================================
// Course Content Types
// ============================================================

export interface LessonMeta {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  moduleSlug: string;
  order: number;
  duration: string; // e.g., "15 min"
  type: "video" | "reading" | "mixed";
  thumbnail?: string;
}

export interface Lesson extends LessonMeta {
  content: string; // raw MDX content
  readingTime: number; // in minutes
}

export interface Module {
  id: string;
  title: string;
  titleKh?: string;
  description: string;
  slug: string;
  order: number;
  icon?: string;
  lessons: LessonReference[];
}

export interface LessonReference {
  title: string;
  titleKh?: string;
  slug: string;
  description: string;
  keywords: string[];
  duration: string;
  type: "video" | "reading" | "mixed";
  order: number;
}

// ============================================================
// Progress Types
// ============================================================

export interface LessonProgress {
  lessonSlug: string;
  moduleSlug: string;
  completed: boolean;
  completedAt?: string; // ISO date string
  lastAccessedAt: string;
}

export interface CourseProgress {
  completedLessons: Record<string, LessonProgress>; // key: `${moduleSlug}/${lessonSlug}`
  currentLesson?: {
    moduleSlug: string;
    lessonSlug: string;
  };
  lastAccessedAt?: string;
}

// ============================================================
// Auth Types
// ============================================================

export interface AuthState {
  isAuthenticated: boolean;
  studentName: string | null;
  studentCode: string | null;
}

// ============================================================
// Search Types
// ============================================================

export interface SearchResult {
  title: string;
  description: string;
  moduleSlug: string;
  lessonSlug: string;
  moduleTitle: string;
  keywords: string[];
}

// ============================================================
// MDX Component Props
// ============================================================

export interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export interface PDFViewerProps {
  driveId: string;
  title?: string;
  height?: string;
}

export interface AudioPlayerProps {
  src: string;
  title?: string;
}

export interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CalloutProps {
  type: "info" | "warning" | "tip" | "note" | "important";
  title?: string;
  children: React.ReactNode;
}

export interface PromptExampleProps {
  prompt: string;
  label?: string;
  platform?: string;
}

export interface DownloadButtonProps {
  href: string;
  filename: string;
  label?: string;
}

export interface HomeworkProps {
  title?: string;
  children: React.ReactNode;
}

export interface QuizProps {
  title?: string;
  children: React.ReactNode;
}
