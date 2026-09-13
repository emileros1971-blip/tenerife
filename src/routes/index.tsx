import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { ExperienceOcean } from "@/components/site/ExperienceOcean";
import { VisualBreak } from "@/components/site/VisualBreak";
import { ExperienceBanana } from "@/components/site/ExperienceBanana";
import { ChooseExperience } from "@/components/site/ChooseExperience";
import { Reviews } from "@/components/site/Reviews";
import { EmotionalCTA } from "@/components/site/EmotionalCTA";
import { Reservation } from "@/components/site/Reservation";
import { Faq, FAQ_ITEMS } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { MobileCTA } from "@/components/site/MobileCTA";
import { track } from "@/lib/site-config";

const TITLE = "Tenerife Hidden Side | Unique Tenerife Experiences";
const DESCRIPTION =
  "Discover Tenerife beyond the resort with volcanic coast adventures, Los Gigantes boat experiences and authentic banana plantation visits. Experiences available from 28 August 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Tenerife Hidden Side" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristInformationCenter",
          name: "Tenerife Hidden Side",
          slogan: "Swim. Sail. Taste. Discover.",
          description: DESCRIPTION,
          areaServed: "South Tenerife, Canary Islands, Spain",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    track("page_view", { page: "landing" });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <ExperienceOcean />
        <VisualBreak />
        <ExperienceBanana />
        <ChooseExperience />
        <Reviews />
        <EmotionalCTA />
        <Reservation />
        <Faq />
      </main>
      <Footer />
      <FloatingContact />
      <MobileCTA />
    </>
  );
}
