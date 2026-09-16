import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn2X Classes | Clear concepts. Confident learners.",
  description: "Maths, Science, and English tuition for Classes 6–10 with fresh batches for Classes 9 and 10. Contact Learn2X at learn2xclasses@gmail.com or +91 9310429249 and request a demo.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
