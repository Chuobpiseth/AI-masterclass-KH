# AI Masterclass KH | វគ្គ AI masterclass

A modern, static, production-ready online learning platform designed specifically for an AI masterclass. Built with Next.js 15, React, Tailwind CSS, Framer Motion, and MDX. 

This platform uses a completely static architecture with no backend required, making it incredibly fast, secure, and free to host on Vercel or GitHub Pages.

## Features

- **Next.js 15 App Router:** Leveraging the latest Next.js features with Turbopack.
- **Static First Architecture:** Fully static HTML export (`out/` directory). No database or API needed.
- **MDX Content System:** Write lessons in Markdown/MDX with custom interactive components (YouTube embeds, PDFs, Prompt boxes, Code blocks).
- **Access Code Authentication:** Simple, secure student login using pre-generated static access codes.
- **Local First State:** Student progress and authentication state are securely persisted in local storage using Zustand.
- **Premium Apple-Inspired Design:** Beautiful UI with glassmorphism, animated gradients, smooth Framer Motion transitions, and a dark/light mode toggle.
- **Command Palette Search:** Instantly search through all lessons and topics using `Cmd+K`.
- **Khmer Typography:** First-class support for Noto Sans Khmer font.

## Project Structure

```
├── .env.example              # Environment variables template
├── next.config.ts            # Next.js configuration (static export enabled)
├── src/
│   ├── app/                  # Next.js App Router (pages, layouts)
│   ├── components/           # React Components
│   │   ├── auth/             # Login forms
│   │   ├── dashboard/        # Dashboard widgets (progress, continue learning)
│   │   ├── layout/           # Sidebar, Header
│   │   ├── lesson/           # Lesson viewer, navigation, reading progress
│   │   ├── mdx/              # Custom MDX components
│   │   ├── shared/           # Search, Theme toggle
│   │   └── ui/               # shadcn/ui base components
│   ├── content/              # MDX files containing all lessons
│   ├── data/                 # JSON data (students, modules)
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities, auth logic, content loading
│   ├── store/                # Zustand state management
│   └── types/                # TypeScript definitions
```

## How to Manage Content

Everything is managed via local files. You do not need to touch any React code to add students or update lessons.

### 1. Adding a Student
Open `src/data/students.json` and add a new entry:
```json
{
  "id": "s_003",
  "name": "Jane Smith",
  "code": "XYZ123AB",
  "status": "active"
}
```

### 2. Creating a Lesson
1. Go to `src/content/lessons/`
2. Create a new folder for the module (if it doesn't exist).
3. Create a `.mdx` file for the lesson (e.g., `my-lesson.mdx`).
4. Write your content using standard markdown or custom components like `<Callout>`, `<YouTube>`, `<Prompt>`, etc.

### 3. Updating the Curriculum
Open `src/data/modules.json` and map your new lesson into the curriculum structure:
```json
{
  "id": "mod_1",
  "title": "Module Title",
  "slug": "module-slug",
  "order": 1,
  "lessons": [
    {
      "slug": "my-lesson",
      "title": "My Lesson Title",
      "description": "Short description",
      "duration": "10 min",
      "order": 1,
      "keywords": ["ai", "prompt"]
    }
  ]
}
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 
Use the access code `A7K9X2P4` to log in as a test student.

## Deployment

Because this project is completely static, it can be hosted anywhere.

### Vercel (Recommended)
1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js.
4. Set the build command to `npm run build`.
5. Deploy.

### GitHub Pages
1. Push the code to GitHub.
2. Go to Settings > Pages.
3. Choose GitHub Actions as the source.
4. Use the Next.js workflow to build and deploy your static export.

## Custom MDX Components Available

You can use these directly in your `.mdx` files:
- `<Callout type="info|warning|success|danger">`
- `<YouTube id="video_id" />`
- `<Prompt>`
- `<Audio src="/path/to/audio.mp3" />`
- `<PDFViewer url="/path/to/pdf.pdf" />`
- `<CodeBlock language="python">`
- `<Grid>` and `<Card>`
