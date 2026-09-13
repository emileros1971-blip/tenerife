import { ArrowRight } from "lucide-react";
import plantation from "@/assets/banana-plantation.jpg";
import tasting from "@/assets/tasting.jpg";
import { Reveal } from "./Reveal";
import { requestExperience, track } from "@/lib/site-config";

const FOR_WHOM = [
  "Families",
  "Couples",
  "Children",
  "Educational groups",
  "Schools",
  "Associations",
  "Private groups",
  "Local culture lovers",
];

export function ExperienceBanana() {
  return (
    <section id="families" className="surface-leaf py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
          <Reveal className="image-frame col-span-2">
            <img
              src={plantation}
              alt="Rows of banana plants growing on volcanic soil in a Tenerife plantation"
              width={1408}
              height={1008}
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04] md:h-72"
            />
          </Reveal>
          <Reveal delay={120} className="image-frame col-span-2 sm:col-span-1">
            <img
              src={tasting}
              alt="Small Canary bananas, local honey and fresh fruit on a rustic table in dappled shade"
              width={1200}
              height={1504}
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover md:h-72"
            />
          </Reveal>
          <Reveal
            delay={200}
            className="col-span-2 flex flex-col justify-center rounded-3xl bg-card/70 p-6 shadow-soft sm:col-span-1"
          >
            <p className="font-display text-2xl leading-tight text-leaf">
              One of the island's most characteristic crops.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Walk among banana plants, learn how they grow and taste local produce.
            </p>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow text-leaf">Experience 02</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-5">Banana Experience &amp; South Tenerife Discovery</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 font-display text-xl text-leaf md:text-2xl">
              Taste a different side of the island.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Step away from the beaches and discover another side of Tenerife. Explore a real
              banana-growing environment, learn about one of the island's best-known crops and enjoy
              a relaxed local tasting experience before continuing your South Tenerife discovery.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {FOR_WHOM.map((w) => (
                <li
                  key={w}
                  className="rounded-full border border-leaf/25 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground/80"
                >
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={320}>
            <button
              type="button"
              onClick={() => {
                track("reserve_click", { placement: "experience_banana" });
                requestExperience("Banana Experience & South Tenerife Discovery");
              }}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-4 text-base font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              Ask About the Banana Experience
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
