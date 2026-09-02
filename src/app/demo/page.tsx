import type { Metadata } from "next";
import { TodayBoard } from "@/components/demo/today-board";

export const metadata: Metadata = {
  title: "Today",
  description: "What Radar found in this fictional agency’s emails, meetings and Slack.",
};

export default function TodayPage() {
  return <TodayBoard />;
}
