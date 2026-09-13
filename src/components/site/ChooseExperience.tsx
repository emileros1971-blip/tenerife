import { Waves, Leaf } from "lucide-react";
import { Reveal } from "./Reveal";
import { requestExperience, track } from "@/lib/site-config";

const CARDS = [
  {
    key: "ocean",
    icon: Waves,
    title: "Ocean & Adventure",
    points: [
      "Volcanic coast",
      "Los Gigantes",
      "Atlantic boat experience",
      "Ocean scenery",
      "Possible whale and dolphin sightings",
      "Small-group adventure atmosphere",
    ],
    cta: "Choose Ocean Adventure",
    value: "Volcanic Coast & Los Gigantes Adventure",
    tone: "ocean" as const,
  },
  {
    key: "local",
    icon: Leaf,
    title: "Local & Family",
    points: [
      "Banana plantation",
      "Local culture",
      "Tasting experience",
      "Relaxed pace",
      "Family friendly",
      "Excellent for groups",
    ],
    cta: "Choose Banana Experience",
    value: "Banana Experience & South Tenerife Discovery",
    tone: "leaf" as const,
  },
];

export function ChooseExperience() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <h2 className="display-lg max-w-2xl">Choose your experience</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {CARDS.map((c, i) => (
            <Reveal
              key={c.key}
              delay={i * 120}
              className={`group flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-12 ${
                c.tone === "ocean" ? "surface-deep" : "surface-leaf shadow-soft"
              }`}
            >
              <c.icon
                className={`h-7 w-7 ${c.tone === "ocean" ? "text-turquoise" : "text-leaf"}`}
                aria-hidden="true"
              />
              <h3
                className={`mt-6 text-3xl ${c.tone === "ocean" ? "text-primary-foreground" : "text-foreground"}`}
              >
                {c.title}
              </h3>
              <ul
                className={`mt-7 flex-1 space-y-3 text-sm ${
                  c.tone === "ocean" ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                        c.tone === "ocean" ? "bg-turquoise" : "bg-leaf"
                      }`}
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  track("reserve_click", { placement: `choose_${c.key}` });
                  requestExperience(c.value);
                }}
                className={`mt-10 rounded-full px-6 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  c.tone === "ocean"
                    ? "bg-shell text-charcoal hover:bg-turquoise hover:text-atlantic-deep"
                    : "bg-leaf text-primary-foreground hover:bg-leaf/90"
                }`}
              >
                {c.cta}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
