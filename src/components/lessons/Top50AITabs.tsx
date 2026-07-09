"use client";

import { useState } from "react";
import {
  SiGoogle,
  SiPerplexity,
  SiX,
  SiNotion,
  SiFreepik,
  SiVercel,
  SiGithubcopilot,
  SiReplit,
  SiZapier,
} from "react-icons/si";
import {
  TbBrandOpenai,
  TbBrandAdobe,
} from "react-icons/tb";
import {
  FaRobot,
  FaBrain,
  FaPen,
  FaImage,
  FaVideo,
  FaMusic,
  FaMicrophone,
  FaCode,
  FaChartBar,
  FaFire,
  FaMicrosoft,
} from "react-icons/fa";

type TabId = "text" | "image" | "video" | "audio" | "tech" | "agents";

interface Tool {
  id: number;
  name: string;
  link: string;
  desc: string;
  icon: React.ElementType;
}

const toolsData: Record<TabId, Tool[]> = {
  text: [
    { id: 1, name: "ChatGPT (OpenAI)", link: "https://chatgpt.com", desc: "ស្តេចត្រាញ់ខាង Chatbot, សរសេរអត្ថបទ និងវិភាគទិន្នន័យ។", icon: TbBrandOpenai },
    { id: 2, name: "Claude (Anthropic)", link: "https://claude.ai", desc: "ពូកែសរសេរកូដ ភាសារលូន និងអានឯកសារ PDF វែងៗ។", icon: FaRobot },
    { id: 3, name: "Gemini (Google)", link: "https://gemini.google.com", desc: "ភ្ជាប់ Google Ecosystem ទាញទិន្នន័យអ៊ីនធឺណិតលឿន។", icon: SiGoogle },
    { id: 4, name: "DeepSeek", link: "https://chat.deepseek.com", desc: "ពូកែខាងគណិតវិទ្យា និងហេតុផល ថែមទាំង Free ច្រើន។", icon: FaBrain },
    { id: 5, name: "Perplexity AI", link: "https://www.perplexity.ai", desc: "Search Engine ជំនាន់ថ្មី ឆ្លើយសំណួរមានប្រភពច្បាស់លាស់។", icon: SiPerplexity },
    { id: 6, name: "Grok (xAI)", link: "https://x.com/i/grok", desc: "ផ្តល់ព័ត៌មានទាន់ហេតុការណ៍ពី X (Twitter)។", icon: SiX },
    { id: 7, name: "Qwen (Alibaba)", link: "https://chat.qwenlm.ai/", desc: "AI កំពូលរបស់ចិន ពូកែភាសាតំបន់អាស៊ី។", icon: FaRobot },
    { id: 8, name: "Jasper AI", link: "https://www.jasper.ai", desc: "ល្អបំផុតសម្រាប់ Marketing និង Copywriting។", icon: FaPen },
    { id: 9, name: "Copy.ai", link: "https://www.copy.ai", desc: "ជួយសរសេរ Caption សម្រាប់ Social Media លក់បានរហ័ស។", icon: FaPen },
    { id: 10, name: "Notion AI", link: "https://www.notion.so", desc: "ជំនួយការសង្ខេប និងសរសេរក្នុងកន្លែងកត់ត្រាការងារ។", icon: SiNotion },
  ],
  image: [
    { id: 11, name: "Midjourney", link: "https://www.midjourney.com", desc: "ផលិតរូបភាពសិល្បៈស្អាតដាច់គេ (ប្រើតាម Discord)។", icon: FaImage },
    { id: 12, name: "DALL-E 3", link: "https://chatgpt.com", desc: "ផលិតរូបភាពតាមបញ្ជាបានសុក្រឹតបំផុត (ក្នុង ChatGPT)។", icon: TbBrandOpenai },
    { id: 13, name: "Stable Diffusion", link: "https://stability.ai", desc: "Open-source អាចដំឡើងលើកុំព្យូទ័រដើម្បីផលិតរូបភាពសេរី។", icon: FaImage },
    { id: 14, name: "Leonardo.ai", link: "https://leonardo.ai", desc: "ផលិតរូបភាពស្អាត ងាយប្រើ និងមាន Free Credit រាល់ថ្ងៃ។", icon: FaImage },
    { id: 15, name: "Adobe Firefly", link: "https://firefly.adobe.com", desc: "ផលិតរូបភាពស្របច្បាប់ និងប្រើក្នុង Photoshop។", icon: TbBrandAdobe },
    { id: 16, name: "Canva Magic Studio", link: "https://www.canva.com", desc: "បញ្ចូល AI ទៅក្នុងការរចនា Poster / Banner យ៉ាងងាយ។", icon: FaImage },
    { id: 17, name: "Ideogram", link: "https://ideogram.ai", desc: "ពូកែដាច់គេខាងផលិតរូបភាពដែលមាន \"អក្សរ\" ឬ \"Logo\"។", icon: FaImage },
    { id: 18, name: "Freepik Pikaso", link: "https://www.freepik.com/pikaso", desc: "គូររូបព្រាងៗ ហើយវានឹងបំប្លែងជារូបភាពពិតភ្លាមៗ។", icon: SiFreepik },
    { id: 19, name: "Magnific AI", link: "https://magnific.ai", desc: "ពូកែខាងបំប៉ោងគុណភាពរូបភាព (Upscaling) ឱ្យម៉ត់កម្រិត 4K/8K។", icon: FaImage },
  ],
  video: [
    { id: 20, name: "Sora (OpenAI)", link: "https://openai.com/sora", desc: "ផលិតវីដេអូកម្រិតភាពយន្ត (Cinematic) ពីអត្ថបទ។", icon: TbBrandOpenai },
    { id: 21, name: "Runway Gen-3", link: "https://runwayml.com", desc: "បំប្លែងរូបភាព ឬអត្ថបទទៅជាវីដេអូមានចលនាច្បាស់ល្អ។", icon: FaVideo },
    { id: 22, name: "Luma Dream Machine", link: "https://lumalabs.ai", desc: "ផលិតវីដេអូលឿន និងមានចលនាកាមេរ៉ាល្អ។", icon: FaVideo },
    { id: 23, name: "Kling AI", link: "https://klingai.com", desc: "គូប្រជែង Sora មកពីចិន ផលិតវីដេអូវែងមានចលនាមនុស្សពិតៗ។", icon: FaVideo },
    { id: 24, name: "HeyGen", link: "https://www.heygen.com", desc: "ផលិតវីដេអូមានតួអង្គ (Avatar) និយាយជំនួសយើង។", icon: FaVideo },
    { id: 25, name: "Synthesia", link: "https://www.synthesia.io", desc: "ល្អសម្រាប់វីដេអូធ្វើបទបង្ហាញ និងបណ្តុះបណ្តាល។", icon: FaVideo },
    { id: 26, name: "CapCut AI", link: "https://www.capcut.com", desc: "ជំនួយកាត់តវីដេអូ និងដាក់អក្សររត់ (Captions) ស្វ័យប្រវត្តិ។", icon: FaVideo },
    { id: 27, name: "InVideo AI", link: "https://invideo.io", desc: "បង្កើតវីដេអូ Youtube ទាំងស្រុងដោយគ្រាន់តែប្រាប់ចំណងជើង។", icon: FaVideo },
    { id: 28, name: "Pika Labs", link: "https://pika.art", desc: "ផលិតវីដេអូគំនូរជីវចល និង 3D Style យ៉ាងងាយស្រួល។", icon: FaVideo },
  ],
  audio: [
    { id: 29, name: "Suno AI", link: "https://suno.com", desc: "បង្កើតបទចម្រៀងពេញលេញ (យកទៅលក់លើ DistroKid បាន)។", icon: FaMusic },
    { id: 30, name: "Udio", link: "https://www.udio.com", desc: "គូប្រជែង Suno ផលិតបទចម្រៀងមានគុណភាពសំឡេងច្បាស់។", icon: FaMusic },
    { id: 31, name: "ElevenLabs", link: "https://elevenlabs.io", desc: "ស្តេចត្រាញ់ខាងបង្កើតសំឡេងនិយាយ (Voiceover & Voice Cloning)។", icon: FaMicrophone },
    { id: 32, name: "Adobe Podcast AI", link: "https://podcast.adobe.com/enhance", desc: "លុបសំឡេងរំខាន ធ្វើឱ្យសំឡេងដូចថតក្នុង Studio។", icon: TbBrandAdobe },
    { id: 33, name: "Descript", link: "https://www.descript.com", desc: "កាត់តវីដេអូនិងសំឡេង ដោយគ្រាន់តែលុបអក្សរនៅលើស្គ្រីប។", icon: FaMicrophone },
    { id: 34, name: "Murf.ai", link: "https://murf.ai", desc: "បង្កើតសំឡេង Voiceover សម្រាប់វីដេអូពាណិជ្ជកម្ម។", icon: FaMicrophone },
    { id: 35, name: "Musicfy", link: "https://musicfy.lol", desc: "បំប្លែងសំឡេងច្រៀងរបស់អ្នកទៅជាសំឡេងតារាល្បីៗ។", icon: FaMusic },
  ],
  tech: [
    { id: 36, name: "v0 (by Vercel)", link: "https://v0.dev", desc: "បង្កើត UI វេបសាយ (React) ភ្លាមៗដោយគ្រាន់តែប្រាប់អ្វីដែលចង់បាន។", icon: SiVercel },
    { id: 37, name: "Cursor", link: "https://www.cursor.com", desc: "Code Editor មាន AI ដឹងពីអ្វីដែលយើងចង់សរសេរបន្ត។", icon: FaCode },
    { id: 38, name: "Bolt.new", link: "https://bolt.new", desc: "បង្កើត និង Deploy វេបសាយពី Browser ដោយបញ្ជាជាអង់គ្លេស។", icon: FaCode },
    { id: 39, name: "GitHub Copilot", link: "https://github.com/features/copilot", desc: "ជំនួយការសរសេរកូដដ៏ពេញនិយមបំផុតសម្រាប់ Developers។", icon: SiGithubcopilot },
    { id: 40, name: "Lovable.dev", link: "https://lovable.dev", desc: "AI Software Engineer បង្កើត Web App សម្រាប់អ្នកមិនចេះកូដ។", icon: FaCode },
    { id: 41, name: "Claude Artifacts", link: "https://claude.ai", desc: "មុខងារសរសេរកូដ និងមើលលទ្ធផល (Preview) ផ្ទាល់លើផ្ទាំង Chat។", icon: FaRobot },
    { id: 42, name: "Replit Agent", link: "https://replit.com", desc: "AI Agent សរសេរកូដ តំឡើង Server និង Debug ជំនួសអ្នក។", icon: SiReplit },
  ],
  agents: [
    { id: 43, name: "Microsoft Copilot", link: "https://copilot.microsoft.com", desc: "បញ្ជូលក្នុង Word, Excel ជួយការងារការិយាល័យ។", icon: FaMicrosoft },
    { id: 44, name: "Google Workspace AI", link: "https://workspace.google.com/solutions/ai/", desc: "សរសេរ Email សង្ខេបប្រជុំ និងធ្វើ Slide។", icon: SiGoogle },
    { id: 45, name: "Zapier Central", link: "https://zapier.com", desc: "តភ្ជាប់កម្មវិធីរាប់ពាន់ចូលគ្នាឱ្យធ្វើការស្វ័យប្រវត្តិ។", icon: SiZapier },
    { id: 46, name: "Devin", link: "https://www.cognition-labs.com", desc: "AI Software Engineer ទី១ លើលោក ធ្វើការឯករាជ្យបាន។", icon: FaRobot },
    { id: 47, name: "AutoGPT", link: "https://agpt.co", desc: "ដាក់គោលដៅឱ្យវា ហើយវានឹងរកវិធីធ្វើរហូតសម្រេច។", icon: FaRobot },
    { id: 48, name: "Beautiful.ai", link: "https://www.beautiful.ai", desc: "បង្កើត Slide បទបង្ហាញយ៉ាងស្អាតដោយស្វ័យប្រវត្តិ។", icon: FaChartBar },
    { id: 49, name: "Gamma App", link: "https://gamma.app", desc: "បំប្លែងអត្ថបទទៅជា Slide ក្នុងពេលតិចជាង ១ នាទី។", icon: FaChartBar },
    { id: 50, name: "Fireflies.ai", link: "https://fireflies.ai", desc: "ចូលរួមប្រជុំ Zoom/Meet ជំនួសអ្នក និងសង្ខេបលទ្ធផល។", icon: FaFire },
  ],
};

const tabColors = {
  text: "text-sky-600 dark:text-sky-400",
  image: "text-purple-600 dark:text-purple-400",
  video: "text-pink-600 dark:text-pink-400",
  audio: "text-amber-600 dark:text-amber-400",
  tech: "text-emerald-600 dark:text-emerald-400",
  agents: "text-indigo-600 dark:text-indigo-400",
};

export function Top50AITabs() {
  const [activeTab, setActiveTab] = useState<TabId>("text");

  const tabs: { id: TabId; label: string }[] = [
    { id: "text", label: "💬 អត្ថបទ & Chat" },
    { id: "image", label: "🎨 រូបភាព" },
    { id: "video", label: "🎬 វីដេអូ" },
    { id: "audio", label: "🎵 សំឡេង & តន្ត្រី" },
    { id: "tech", label: "💻 កូដ & Web" },
    { id: "agents", label: "🤖 ភ្នាក់ងារ & Productivity" },
  ];

  return (
    <div>
      <style jsx>{`
        .tab-btn {
            transition: all 0.3s ease;
        }
        .tab-btn.active {
            background: linear-gradient(135deg, #38bdf8, #c084fc);
            color: white;
            border-color: transparent;
            box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
        }
        .tab-content {
            display: none;
            animation: fadeInUp 0.4s ease forwards;
        }
        .tab-content.active {
            display: grid;
        }
        .tool-card {
            background: rgba(241, 245, 249, 0.8);
            border: 1px solid rgba(0,0,0,0.05);
            border-radius: 12px;
            padding: 16px;
            transition: transform 0.2s;
        }
        .tool-card:hover {
            transform: translateY(-3px);
            border-color: rgba(192, 132, 252, 0.4);
        }
        .dark .tool-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255,255,255,0.05);
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-semibold ${
              activeTab === tab.id ? "active" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tab-content grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 active">
        {toolsData[activeTab].map((tool) => {
          const Icon = tool.icon;
          return (
            <div key={tool.id} className="tool-card">
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-bold hover:underline flex items-center justify-between w-full ${tabColors[activeTab]}`}
              >
                <span>{tool.id}. {tool.name}</span>
                <Icon className="w-5 h-5 shrink-0" />
              </a>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {tool.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
