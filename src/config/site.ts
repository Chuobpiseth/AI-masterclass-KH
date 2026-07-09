export const siteConfig = {
  name: "AI Masterclass KH",
  nameKh: "វគ្គ AI masterclass",
  fullName: "AI masterclass KH | វគ្គ AI masterclass",
  slogan:
    "រៀនពីរបៀបប្រើ AI ដើម្បីបង្កើនល្បឿនការងារ និងភាពច្នៃប្រឌិតសម្រាប់អាជីវកម្មរបស់អ្នកឱ្យដល់កម្រិតកំពូល",
  description:
    "Learn how to use AI to accelerate your work and creativity for your business to the highest level.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ai-masterclass-kh.vercel.app",
  author: "AI Masterclass KH",
  teacher: "Chuob Piseth",
  links: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/Chuobpiseth",
  },
};

export const courseConfig = {
  accessCodeLength: 8,
  accessCodePattern: /^[A-Z0-9]{8}$/,
  localStoragePrefix: "ai-masterclass",
};
