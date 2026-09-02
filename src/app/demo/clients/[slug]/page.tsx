import type { Metadata } from "next";
import { ClientDetailView } from "@/components/demo/client-detail-view";
import { CLIENTS, LAST_SYNCED, getClient } from "@/lib/demo-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CLIENTS.map((client) => ({ slug: client.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) return { title: "Client" };
  return { title: client.name };
}

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  return <ClientDetailView client={client} lastSynced={LAST_SYNCED} />;
}
