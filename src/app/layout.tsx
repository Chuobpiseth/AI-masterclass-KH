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
      </body>
    </html>
  );
}
