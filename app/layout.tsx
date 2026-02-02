import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EvidentAI — Peace of mind. With science.",
  description:
    "EvidentAI gives women an understandable AI-based second opinion after mammography—built to reduce uncertainty and offer reassurance.",
  metadataBase: new URL("https://evidentai.vercel.app"),
  openGraph: {
    title: "EvidentAI — Peace of mind. With science.",
    description:
      "An understandable AI-based second opinion after mammography—built to reduce uncertainty and offer reassurance.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
