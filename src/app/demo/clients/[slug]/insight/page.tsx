import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightView } from "@/components/demo/insight-view";
import { CLIENTS, getClient, getOwner } from "@/lib/demo-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CLIENTS.filter((client) => client.insight).map((client) => ({ slug: client.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client?.insight) return { title: "Insight" };
  return { title: `${client.name} — ${client.insight.heading}` };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client?.insight) notFound();
  const owner = getOwner(client.ownerId);
  return <InsightView client={client} ownerName={owner.name} />;
}
