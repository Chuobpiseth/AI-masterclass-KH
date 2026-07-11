import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import "./globals.css";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  variable: "--font-kantumruy",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI",
    "artificial intelligence",
    "masterclass",
    "Cambodia",
    "Khmer",
    "ChatGPT",
    "productivity",
    "business",
    "marketing",
  ],
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "km_KH",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body className={`${kantumruy.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
        {/* Anti-debugging and Advanced Security Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Block Right Click
              document.addEventListener('contextmenu', event => event.preventDefault());
              
              // Block Keyboard Shortcuts
              document.addEventListener('keydown', event => {
                const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                const cmdKey = isMac ? event.metaKey : event.ctrlKey;
                
                if (
                  event.key === 'F12' || 
                  event.key === 'F2' || 
                  // Ctrl+U / Cmd+U (View Source)
                  (cmdKey && event.key.toLowerCase() === 'u') ||
                  // Ctrl+S / Cmd+S (Save)
                  (cmdKey && event.key.toLowerCase() === 's') ||
                  // Ctrl+P / Cmd+P (Print)
                  (cmdKey && event.key.toLowerCase() === 'p') ||
                  // Ctrl+Shift+I / Cmd+Option+I (DevTools)
                  (cmdKey && event.shiftKey && event.key.toLowerCase() === 'i') ||
                  (isMac && event.metaKey && event.altKey && event.key.toLowerCase() === 'i') ||
                  // Ctrl+Shift+J / Cmd+Option+J (Console)
                  (cmdKey && event.shiftKey && event.key.toLowerCase() === 'j') ||
                  (isMac && event.metaKey && event.altKey && event.key.toLowerCase() === 'j') ||
                  // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
                  (cmdKey && event.shiftKey && event.key.toLowerCase() === 'c') ||
                  (isMac && event.metaKey && event.altKey && event.key.toLowerCase() === 'c')
                ) {
                  event.preventDefault();
                }
              });

              // Debugger Trap (Freezes DevTools if opened)
              setInterval(function() {
                const before = new Date().getTime();
                debugger;
                const after = new Date().getTime();
                if (after - before > 100) {
                  // DevTools is likely open and pausing execution
                  
                  // Extract student info
                  let studentName = "អ្នកសិក្សា";
                  let studentCode = "";
                  try {
                    const authData = localStorage.getItem("ai-masterclass-auth");
                    if (authData) {
                      const parsed = JSON.parse(authData);
                      if (parsed.state && parsed.state.studentName) {
                        studentName = parsed.state.studentName;
                        studentCode = parsed.state.studentCode;
                      }
                    }
                  } catch(e) {}

                  // Send log to Google Sheets via our Next.js API (fixes CORS/Browser blocking)
                  if (studentCode && !window.__devModeLogged) {
                    window.__devModeLogged = true; // Prevent spamming the API
                    fetch("/api/log-hack", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ code: studentCode })
                    }).catch(e => {});
                  }

                  document.body.innerHTML = 
                    "<style>" +
                    "@keyframes bg-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }" +
                    "@keyframes text-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }" +
                    "</style>" +
                    "<div style='height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; background: linear-gradient(270deg, #ffffff, #ffe4e6, #e0e7ff, #ffffff); background-size: 400% 400%; animation: bg-shift 8s ease infinite; color: #881337; font-family: var(--font-kantumruy), sans-serif; font-size: 2.5rem; font-weight: bold; text-align: center; padding: 2rem; box-sizing: border-box; line-height: 1.6; box-shadow: inset 0 0 100px rgba(0,0,0,0.05);'>" +
                      "<div style='animation: text-pulse 2s ease-in-out infinite;'>" +
                        "<div style='font-size: 1.5rem; color: #4c0519; margin-bottom: 1rem;'>សួរស្តី " + studentName + "</div>" +
                        "សកម្មភាពរបស់អ្នកត្រូវបានចាត់ទុកថាមានបំណងយកទិន្នន័យកូដ មេរៀន តាម Developer Mode" +
                      "</div>" +
                    "</div>";
                }
              }, 1000);

              // Disable Dragging
              document.addEventListener('dragstart', event => event.preventDefault());
            `,
          }}
        />
      </body>
    </html>
  );
}
