import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface LessonData {
  slug: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  keywords: string[];
  type: "video" | "reading" | "mixed";
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  slug: string;
  order: number;
  icon?: string;
  lessons: LessonData[];
}

function syncModules() {
  const contentDir = path.join(process.cwd(), "src", "content", "lessons");
  const outputFile = path.join(process.cwd(), "src", "data", "modules.json");

  if (!fs.existsSync(contentDir)) {
    console.error(`[sync-modules] Directory not found: ${contentDir}`);
    return;
  }

  const modules: ModuleData[] = [];
  const moduleDirs = fs.readdirSync(contentDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

  moduleDirs.forEach((modDir, index) => {
    const modSlug = modDir.name;
    const modPath = path.join(contentDir, modSlug);
    
    // Default module values
    let modTitle = modSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    let modDescription = "";
    let modOrder = index + 1;
    let modIcon = "BookOpen";

    // Read optional _meta.json for module
    const metaPath = path.join(modPath, "_meta.json");
    if (fs.existsSync(metaPath)) {
      try {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
        if (meta.title) modTitle = meta.title;
        if (meta.description) modDescription = meta.description;
        if (meta.order !== undefined) modOrder = meta.order;
        if (meta.icon) modIcon = meta.icon;
      } catch (e) {
        console.error(`[sync-modules] Failed to parse _meta.json in ${modSlug}`);
      }
    }

    const lessons: LessonData[] = [];
    const lessonFiles = fs.readdirSync(modPath).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    lessonFiles.forEach((file) => {
      const lessonSlug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(modPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      
      const { data } = matter(fileContent);
      
      lessons.push({
        slug: lessonSlug,
        title: data.title || lessonSlug,
        description: data.description || "",
        duration: data.duration || "10 min",
        order: data.order || 99,
        keywords: data.keywords || [],
        type: data.type || "reading",
      });
    });

    // Sort lessons by order
    lessons.sort((a, b) => a.order - b.order);

    modules.push({
      id: `mod_${modSlug}`,
      title: modTitle,
      description: modDescription,
      slug: modSlug,
      order: modOrder,
      icon: modIcon,
      lessons,
    });
  });

  // Sort modules by order
  modules.sort((a, b) => a.order - b.order);

  fs.writeFileSync(outputFile, JSON.stringify(modules, null, 2));
  console.log(`[sync-modules] Successfully synced ${modules.length} modules to modules.json`);
}

syncModules();
