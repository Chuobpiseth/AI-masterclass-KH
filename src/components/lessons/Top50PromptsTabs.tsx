"use client";

import { useState } from "react";
import Image from "next/image";

type TabId = "writing" | "education" | "business" | "translation" | "youtube";

interface Prompt {
  id: number;
  kh: string;
  en: string;
}

const promptsData: Record<TabId, Prompt[]> = {
  writing: [
    { id: 1, kh: "អ្នកជាអ្នកនិពន្ធជាភាសាខ្មែរ។ សូមសរសេរអត្ថបទអំពី [ប្រធានបទ] សម្រាប់ [អ្នកអានគោលដៅ] ដោយប្រើពាក្យងាយ និងមានចំណងជើងរង ៣ ផ្នែក។", en: "You are a Khmer writer. Write an article about [topic] for [target audience] using simple words and 3 subheadings." },
    { id: 2, kh: "អ្នកជា Copywriter។ សូមសរសេរ Facebook post មួយអំពី [ផលិតផល/សេវា] ជាភាសាខ្មែរ មាន Hook ខ្លី និង CTA ចុងក្រោយ។", en: "You are a copywriter. Write a Facebook post about [product/service] in Khmer with a short hook and final CTA." },
    { id: 3, kh: "សូមសរសេរ Caption ១០ ប្រយោគសម្រាប់ [រូបភាព/វីដេអូ] ដោយមាន Tone [fun/professional/warm]។", en: "Write a 10-sentence caption for [image/video] with a [fun/professional/warm] tone." },
    { id: 4, kh: "សូមសរសេរ Script ខ្លី ៣០ វិនាទីសម្រាប់ TikTok/YouTube Shorts អំពី [ប្រធានបទ] ជាទម្រង់ Hook + Body + CTA។", en: "Write a short 30-second script for TikTok/YouTube Shorts about [topic] in Hook + Body + CTA format." },
    { id: 5, kh: "សូមបង្កើត Blog outline អំពី [ប្រធានបទ] ដែលមាន H1, H2, និង Bullet points សំខាន់ៗ។", en: "Create a blog outline about [topic] with H1, H2, and key bullet points." },
    { id: 6, kh: "សូមសរសេរ Product description សម្រាប់ [ឈ្មោះផលិតផល] ដោយផ្តោតលើអត្ថប្រយោជន៍ មិនមែនតែ Feature ប៉ុណ្ណោះ។", en: "Write a product description for [product name] focusing on benefits, not just features." },
    { id: 7, kh: "សូមកែអត្ថបទខាងក្រោមឱ្យស្អាត អានងាយ និងមាន Tone ជាអាជីព។", en: "Refine the following text to make it clean, easy to read, and professional." },
    { id: 8, kh: "សូមសរសេរ Headline ២០ ចំណងជើងសម្រាប់អត្ថបទអំពី [ប្រធានបទ] ដែលទាក់ទាញអ្នកអាន។", en: "Write 20 catchy headlines for an article about [topic]." },
    { id: 9, kh: "សូមបម្លែងអត្ថបទនេះឱ្យទៅជាបែប Friendly conversational style ជាភាសាខ្មែរ។", en: "Rewrite this text into a friendly conversational style in Khmer." },
    { id: 10, kh: "សូមសរសេរ Email ផ្សព្វផ្សាយមួយសម្រាប់ [campaign] មាន Subject line ៥ ជម្រើស។", en: "Write a promotional email for [campaign] with 5 subject line options." },
  ],
  education: [
    { id: 11, kh: "អ្នកជាគ្រូបង្រៀន។ សូមពន្យល់ [មេរៀន] ជាភាសាខ្មែរ សម្រាប់អ្នកចាប់ផ្តើម និងមានឧទាហរណ៍ ៥។", en: "You are a teacher. Explain [lesson] in Khmer for a beginner with 5 examples." },
    { id: 12, kh: "សូមសង្ខេបមេរៀនខាងក្រោមឱ្យខ្លី សម្រាប់សិស្សថ្នាក់ [កម្រិត] មិនលើស ៧ ប្រយោគ។", en: "Summarize the following lesson for a [level] student in no more than 7 sentences." },
    { id: 13, kh: "សូមបង្កើតសំណួរ Quiz ១០ ខ្ទង់អំពី [ប្រធានបទ] ជាមួយចម្លើយត្រឹមត្រូវ។", en: "Create a 10-question quiz about [topic] with correct answers." },
    { id: 14, kh: "សូមបង្រៀនខ្ញុំពី [ជំនាញ] Step by step ហើយឱ្យលំហាត់អនុវត្ត ៣។", en: "Teach me [skill] step by step and provide 3 practice exercises." },
    { id: 15, kh: "សូមពន្យល់ពាក្យ [word/concept] ដូចជាគ្រូបង្រៀនកំពុងបង្រៀនកូនសិស្សអាយុ ១២ ឆ្នាំ។", en: "Explain the concept of [word/concept] as if teaching a 12-year-old student." },
    { id: 16, kh: "សូមបង្កើត Study plan ៧ ថ្ងៃសម្រាប់រៀន [មុខវិជ្ជា] ក្នុងមួយថ្ងៃ [x] នាទី។", en: "Create a 7-day study plan to learn [subject] for [x] minutes a day." },
    { id: 17, kh: "សូមបម្លែងមេរៀននេះទៅជា Flashcards សំណួរ-ចម្លើយ។", en: "Turn this lesson into Q&A flashcards." },
    { id: 18, kh: "សូមបង្កើត Practice exercises ១៥ សំណួរសម្រាប់ [grammar/math/topic] ជាមួយ Answer key។", en: "Create 15 practice exercises for [grammar/math/topic] with an answer key." },
    { id: 19, kh: "សូមពន្យល់ភាពខុសគ្នារវាង [A] និង [B] ជាតារាងងាយយល់។", en: "Explain the difference between [A] and [B] in an easy-to-understand table." },
    { id: 20, kh: "សូមធ្វើជាគ្រូសួរខ្ញុំម្តងមួយសំណួរ ដើម្បីជួយខ្ញុំរៀន [ប្រធានបទ]។", en: "Act as a tutor and ask me one question at a time to help me learn [topic]." },
  ],
  business: [
    { id: 21, kh: "សូមសរសេរ CV summary មួយសម្រាប់បុគ្គលដែលមានបទពិសោធន៍ [x] ឆ្នាំក្នុង [វិស័យ]។", en: "Write a CV summary for a person with [x] years of experience in [field]." },
    { id: 22, kh: "សូមសរសេរ Cover letter សម្រាប់ដាក់ពាក្យការងារ [តួនាទី] នៅ [ក្រុមហ៊ុន]។", en: "Write a cover letter for the [role] position at [company]." },
    { id: 23, kh: "សូមបង្កើត Meeting agenda សម្រាប់ប្រជុំអំពី [ប្រធានបទ] រយៈពេល [x] នាទី។", en: "Create a meeting agenda to discuss [topic] for [x] minutes." },
    { id: 24, kh: "សូមសរសេរ Professional email ដើម្បីស្នើសុំ [meeting/support/quotation]។", en: "Write a professional email to request [meeting/support/quotation]." },
    { id: 25, kh: "សូមសង្ខេប Meeting notes ខាងក្រោមទៅជា Action items និង Deadlines។", en: "Summarize the following meeting notes into action items and deadlines." },
    { id: 26, kh: "សូមបង្កើត Business plan outline សម្រាប់អាជីវកម្ម [ប្រភេទ] នៅ [ទីតាំង]។", en: "Create a business plan outline for a [type] business in [location]." },
    { id: 27, kh: "សូមធ្វើ SWOT analysis សម្រាប់ [business/product] ជាតារាង។", en: "Do a SWOT analysis for [business/product] in a table format." },
    { id: 28, kh: "សូមបង្កើត Customer persona ៣ ប្រភេទសម្រាប់ [ផលិតផល/សេវា]។", en: "Create 3 customer personas for [product/service]." },
    { id: 29, kh: "សូមសរសេរ Proposal ខ្លីមួយសម្រាប់សហការលើ [project]។", en: "Write a short proposal for a collaboration on [project]." },
    { id: 30, kh: "សូមផ្តល់គំនិតទីផ្សារ ២០ សម្រាប់ផ្សព្វផ្សាយ [brand/product] ក្នុងបណ្តាញសង្គម។", en: "Provide 20 marketing ideas to promote [brand/product] on social media." },
  ],
  translation: [
    { id: 31, kh: "សូមបកប្រែអត្ថបទនេះពីអង់គ្លេសទៅខ្មែរ ដោយរក្សាន័យដើម និងធ្វើឱ្យអានធម្មជាតិ។", en: "Translate this text from English to Khmer, keeping the original meaning and natural flow." },
    { id: 32, kh: "សូមបកប្រែអត្ថបទនេះពីខ្មែរទៅអង់គ្លេស ជា Tone professional។", en: "Translate this text from Khmer to English in a professional tone." },
    { id: 33, kh: "សូមកែ Grammar និង Spelling ក្នុងអត្ថបទខាងក្រោម ប៉ុន្តែរក្សាស្ទីលដើម។", en: "Correct the grammar and spelling in the following text but keep the original style." },
    { id: 34, kh: "សូមធ្វើឱ្យអត្ថបទនេះខ្លីជាងមុន ៥០% ដោយមិនបាត់ន័យសំខាន់។", en: "Make this text 50% shorter without losing the main meaning." },
    { id: 35, kh: "សូមសរសេរឡើងវិញអត្ថបទនេះឱ្យងាយយល់សម្រាប់អ្នកចាប់ផ្តើម។", en: "Rewrite this text so it is easy to understand for beginners." },
    { id: 36, kh: "សូមបម្លែងអត្ថបទនេះឱ្យទៅជាបញ្ជី Bullet points។", en: "Convert this text into a list of bullet points." },
    { id: 37, kh: "សូមសង្ខេបអត្ថបទនេះជា ៣ កម្រិត៖ ១ ប្រយោគ, ១ កថាខណ្ឌ, និង Bullet ៥ ចំណុច។", en: "Summarize this text in 3 levels: 1 sentence, 1 paragraph, and 5 bullet points." },
    { id: 38, kh: "សូមរកចំណុចមិនច្បាស់ក្នុងអត្ថបទនេះ ហើយណែនាំការកែប្រែ។", en: "Find unclear points in this text and suggest improvements." },
    { id: 39, kh: "សូមធ្វើ Proofreading លើអត្ថបទនេះ ហើយពន្យល់កំហុសសំខាន់ៗ។", en: "Proofread this text and explain the main mistakes." },
    { id: 40, kh: "សូមបម្លែងអត្ថបទផ្លូវការនេះឱ្យទៅជាស្ទីលរួសរាយរាក់ទាក់។", en: "Change this formal text into a friendly and approachable style." },
  ],
  youtube: [
    { id: 41, kh: "អ្នកជា YouTube strategist។ សូមផ្តល់ Video ideas ២០ សម្រាប់ Channel អំពី [niche]។", en: "You are a YouTube strategist. Provide 20 video ideas for a channel about [niche]." },
    { id: 42, kh: "សូមសរសេរ YouTube title ១៥ និង Thumbnail text ១០ សម្រាប់វីដេអូអំពី [ប្រធានបទ]។", en: "Write 15 YouTube titles and 10 thumbnail texts for a video about [topic]." },
    { id: 43, kh: "សូមបង្កើត Script សម្រាប់ YouTube Shorts អំពី [ប្រធានបទ] រយៈពេល ២០ វិនាទី ជាភាសាខ្មែរ។", en: "Create a script for YouTube Shorts about [topic] for 20 seconds in Khmer." },
    { id: 44, kh: "សូមសរសេរ Description និង Hashtags សម្រាប់វីដេអូ YouTube មួយអំពី [ប្រធានបទ]។", en: "Write a description and hashtags for a YouTube video about [topic]." },
    { id: 45, kh: "សូមបង្កើត Content calendar ៣០ ថ្ងៃសម្រាប់ channel [ប្រភេទ channel]។", en: "Create a 30-day content calendar for a [channel type] channel." },
    { id: 46, kh: "សូមផ្តល់ CTA ២០ ប្រយោគសម្រាប់បញ្ចប់វីដេអូ YouTube ជាភាសាខ្មែរ។", en: "Provide 20 CTA sentences to end a YouTube video in Khmer." },
    { id: 47, kh: "សូមបង្កើត Hook ១៥ ប្រយោគសម្រាប់វីដេអូខ្លីដែលត្រូវទាក់ទាញក្នុង ៣ វិនាទីដំបូង។", en: "Create 15 hook sentences for short videos to grab attention in the first 3 seconds." },
    { id: 48, kh: "សូមបម្លែងគំនិតវីដេអូមួយនេះទៅជា Storyboard ៥ Scene។", en: "Turn this video idea into a 5-scene storyboard." },
    { id: 49, kh: "សូមសរសេរ Prompt មួយសម្រាប់ ChatGPT ដើម្បីជួយខ្ញុំបង្កើត Video scripts ជាបន្តបន្ទាប់សម្រាប់ Niche របស់ខ្ញុំ។", en: "Write a prompt for ChatGPT to help me generate continuous video scripts for my niche." },
    { id: 50, kh: "សូមធ្វើជា Content assistant ហើយសួរខ្ញុំម្តងមួយសំណួរ ដើម្បីបង្កើត Script ពេញលេញសម្រាប់វីដេអូបន្ទាប់របស់ខ្ញុំ។", en: "Act as a content assistant and ask me one question at a time to build a full script for my next video." },
  ]
};

const tabImages: Record<TabId, string> = {
  writing: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1200",
  education: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1200",
  business: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
  translation: "https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=1200",
  youtube: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export function Top50PromptsTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("writing");
  const [isEnglish, setIsEnglish] = useState(false);

  const tabs: { id: TabId; label: string }[] = [
    { id: "writing", label: "📝 សរសេរ & Content" },
    { id: "education", label: "📚 រៀន & អប់រំ" },
    { id: "business", label: "💼 ការងារ & អាជីវកម្ម" },
    { id: "translation", label: "🌍 បកប្រែ & កែអត្ថបទ" },
    { id: "youtube", label: "🎥 YouTube Creators" },
  ];

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-fuchsia-500 dark:text-fuchsia-400">៣.</span> កម្រង <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">៥០ Prompt</span> ប្រើប្រាស់ញឹកញាប់
        </h2>
        
        {/* Language Switcher */}
        <div className="flex items-center gap-3 mt-4 md:mt-0 bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
          <span className={`text-sm font-semibold ${!isEnglish ? "text-purple-600 dark:text-purple-400" : "text-slate-500 dark:text-slate-400"}`}>
            ខ្មែរ
          </span>
          <label className="relative inline-block w-14 h-7 cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={isEnglish}
              onChange={() => setIsEnglish(!isEnglish)}
            />
            <div className="w-14 h-7 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-sky-500 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
          <span className={`text-sm font-semibold ${isEnglish ? "text-sky-600 dark:text-sky-400" : "text-slate-500 dark:text-slate-400"}`}>
            English
          </span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-sky-400/20 to-purple-400/20 border-purple-400 text-slate-900 dark:text-white"
                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 border-t-slate-300 dark:border-t-white/20 rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(56,189,248,0.1)] hover:border-sky-400/30">
        <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 opacity-90">
          <Image 
            src={tabImages[activeTab]} 
            alt={tabs.find(t => t.id === activeTab)?.label || "Tab Image"} 
            fill
            className="object-cover"
          />
        </div>
        
        <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-sm list-decimal pl-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {promptsData[activeTab].map((prompt) => (
            <li key={prompt.id} className="leading-relaxed">
              {!isEnglish ? (
                <span>{prompt.kh}</span>
              ) : (
                <span className="text-sky-600 dark:text-sky-300">{prompt.en}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
