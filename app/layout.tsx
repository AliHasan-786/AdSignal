import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdSignal — CTV Ad Format Intelligence",
  description:
    "Pre-campaign CTV ad format simulator. Predict engagement decay, CTR, completion rate, and ad fatigue before committing budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
