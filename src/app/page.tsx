import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";
import { FaqSection } from "@/components/marketing/faq-section";
import { FounderNote } from "@/components/marketing/founder-note";
import { IntegrationsTeaser } from "@/components/marketing/integrations-teaser";
import { MarketingHero } from "@/components/marketing/hero";
import { NeverJustAScore } from "@/components/marketing/never-just-a-score";
import { PilotSection } from "@/components/marketing/pilot-section";
import { ProductWalkthrough } from "@/components/marketing/product-walkthrough";
import { SecuritySection } from "@/components/marketing/security-section";
import { WhatRadarFinds } from "@/components/marketing/what-radar-finds";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "We Scale Startups",
    url: "https://wescalestartups.com",
    brand: { "@type": "Brand", name: "Radar" },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Radar",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Client relationship monitoring for agencies and freelancers",
    operatingSystem: "Web",
    url: "https://radar.wescalestartups.com",
    description:
      "Radar is the world’s best always-on account manager. It identifies upsells, churn risks, and everything else — by reading client emails, meetings and Slack.",
    creator: { "@type": "Organization", name: "We Scale Startups" },
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>
        <MarketingHero />
        <WhatRadarFinds />
        <ProductWalkthrough />
        <NeverJustAScore />
        <IntegrationsTeaser />
        <SecuritySection />
        <FounderNote />
        <PilotSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
