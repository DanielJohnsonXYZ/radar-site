import { MetadataRoute } from "next";
import { CLIENTS } from "@/lib/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://radar.wescalestartups.com";
  const clients = CLIENTS.flatMap((client) => {
    const entries: MetadataRoute.Sitemap = [
      { url: `${origin}/demo/clients/${client.slug}`, changeFrequency: "weekly", priority: 0.6 },
    ];
    if (client.insight) {
      entries.push({
        url: `${origin}/demo/clients/${client.slug}/insight`,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
    return entries;
  });
  return [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/demo`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${origin}/demo/clients`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${origin}/demo/integrations`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${origin}/demo/commitments`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${origin}/privacy`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${origin}/security`, changeFrequency: "monthly", priority: 0.4 },
    ...clients,
  ];
}
