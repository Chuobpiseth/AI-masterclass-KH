# Project Memory & Context

This file serves as a persistent memory and project context document for AI agents continuing work on this project. 

## Project Overview
**Name:** AI Masterclass KH
**Type:** Static Online Learning Platform (Next.js)
**Purpose:** A production-ready, localized online learning platform for an AI masterclass, featuring MDX-based lessons and no-backend local storage.

## Technology Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI & Styling:** React 19, Tailwind CSS v4, Framer Motion, shadcn/ui, lucide-react
- **Content:** MDX via `next-mdx-remote`, `gray-matter`
- **State Management:** Zustand (Local first state)
- **Deployment:** Completely static HTML export (`out/` directory)

## Architecture & Data Flow
1. **Static First:** No database or API needed. The platform reads MDX files at build time and exports static HTML.
2. **Local State:** Student progress and authentication are stored securely in local storage using Zustand. 
3. **MDX System:** Lessons are written in `.mdx` format in `src/content/lessons/` with support for custom components (`<YouTube>`, `<Callout>`, `<Prompt>`, `<PDFViewer>`, etc.).
4. **Data Management:** Configuration and curriculum structure are defined in JSON (`src/data/modules.json`, `src/data/students.json`).

## Project Structure
- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Modular React components grouped by feature (`auth/`, `dashboard/`, `lesson/`, `mdx/`, `shared/`, `ui/`).
- `src/content/`: MDX source files for lessons.
- `src/data/`: JSON data for curriculum and authentication mapping.
- `src/hooks/` & `src/lib/`: Utilities, authentication logic, and content parsing.
- `src/store/`: Zustand stores for local state persistence.
- `scripts/`: Utilities like `sync-modules.ts` run during `predev` and `prebuild` to synchronize JSON data.

## Key Instructions for AI Agents
1. **Static Export Constraint:** Do not introduce server-side APIs, database connections, or Next.js server actions. The project must maintain its static export capability (`next build` producing an `out/` folder).
2. **Content Updates:** When generating new lessons, place them in `src/content/lessons/` and ensure they are registered in `src/data/modules.json`.
3. **Tailwind v4:** Note the usage of Tailwind CSS v4 and its PostCSS integration. Avoid using deprecated Tailwind v3 features.
4. **React 19:** Follow React 19 standards and Next.js 15+ App router conventions.

## Current Status & Next Steps
- The platform is initialized with basic routing, components, and MDX processing.
- Awaiting updates to be pulled back from the remote repository.
