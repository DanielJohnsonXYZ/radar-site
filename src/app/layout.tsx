import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://radar.wescalestartups.com"),
  title: {
    default: "Radar · Always-on account manager",
    template: "%s · Radar",
  },
  description:
    "The world’s best always-on account manager. It identifies upsells, churn risks, and everything else — by reading your client emails, meetings and Slack.",
  openGraph: {
    title: "Radar — the world’s best always-on account manager",
    description:
      "It identifies upsells, churn risks, and everything else hiding in your client emails, meetings and Slack.",
    siteName: "Radar",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
