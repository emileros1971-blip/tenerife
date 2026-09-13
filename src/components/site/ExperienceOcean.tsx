import naturalPool from "@/assets/natural-pool.jpg";
import losGigantes from "@/assets/los-gigantes.jpg";
import boatCliffs from "@/assets/boat-cliffs.jpg";
import oceanSwim from "@/assets/ocean-swim.jpg";
import dolphins from "@/assets/dolphins.jpg";
import { Reveal } from "./Reveal";
import { requestExperience, track } from "@/lib/site-config";

const STEPS = [
  {
    n: "01",
    title: "Volcanic Coast",
    body: "Enjoy time around Tenerife's beautiful volcanic coastline, with dramatic dark rock, clear Atlantic water and memorable places to relax, photograph and enjoy the surroundings.",
    img: naturalPool,
    alt: "Clear natural sea pool surrounded by dark volcanic rock on the Tenerife coast",
    w: 1200,
    h: 1504,
  },
  {
    n: "02",
    title: "Los Gigantes",
    body: "Continue toward one of Tenerife's most spectacular coastal landscapes and experience the enormous cliffs of Los Gigantes.",
    img: losGigantes,
    alt: "The towering basalt sea cliffs of Los Gigantes rising from the Atlantic",
    w: 1408,
    h: 1008,
  },
  {
    n: "03",
    title: "Atlantic Boat Experience",
    body: "Join a local boat experience and head out beneath the cliffs.",
    img: boatCliffs,
    alt: "A small excursion boat on the Atlantic beneath the Los Gigantes cliffs",
    w: 1408,
    h: 1008,
    list: [
      "Whale and dolphin watching",
      "Impressive cliff views",
      "Ocean scenery",
      "Coastal exploration",
      "An opportunity for an ocean swimming stop",
    ],
    note: "Depending on the selected boat excursion, weather, wildlife and sea conditions. Wildlife sightings are never guaranteed.",
  },
  {
    n: "04",
    title: "Finish the Experience",
    body: "Finish the day with time to enjoy the atmosphere before returning toward South Tenerife.",
    img: oceanSwim,
    alt: "A swimmer floating in deep blue Atlantic water beside a boat ladder",
    w: 1200,
    h: 912,
  },
];

export function ExperienceOcean() {
  return (
    <section id="experiences" className="relative overflow-hidden bg-background py-24 md:py-36">
      <div id="the-day" className="absolute -top-24" aria-hidden="true" />
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow text-turquoise">Experience 01</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-5">Volcanic Coast &amp; Los Gigantes Adventure</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 font-display text-xl text-atlantic md:text-2xl">
              Swim. Explore. Sail.
            </p>
          </Reveal>
        </div>

        {/* Journey timeline */}
        <ol className="relative mt-16 md:mt-24">
          <div
            className="absolute top-0 bottom-0 left-[0.4rem] w-px bg-gradient-to-b from-turquoise/60 via-atlantic/30 to-transparent md:left-1/2"
            aria-hidden="true"
          />
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative pb-16 md:pb-24">
              <span
                className="absolute top-2 left-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-turquoise md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              />
              <div
                className={`grid gap-8 pl-8 md:grid-cols-2 md:items-center md:gap-16 md:pl-0 ${
                  i % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal className={i % 2 ? "md:pl-16" : "md:pr-16 md:text-right"}>
                  <span className="font-display text-5xl text-sand-deep md:text-6xl">{s.n}</span>
                  <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
                  {s.list ? (
                    <ul
                      className={`mt-5 flex flex-wrap gap-2 ${i % 2 ? "" : "md:justify-end"}`}
                      aria-label="Possible highlights"
                    >
                      {s.list.map((l) => (
                        <li
                          key={l}
                          className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                        >
                          {l}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {s.note ? <p className="mt-4 text-xs text-muted-foreground/80">{s.note}</p> : null}
                </Reveal>

                <Reveal delay={120} className={i % 2 ? "md:pr-16" : "md:pl-16"}>
                  <div className="image-frame">
                    <img
                      src={s.img}
                      alt={s.alt}
                      width={s.w}
                      height={s.h}
                      loading="lazy"
                      decoding="async"
                      className="h-64 w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04] md:h-80"
                    />
                  </div>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>

        <Reveal className="glass grid gap-6 rounded-3xl p-7 md:grid-cols-[1.4fr_auto] md:items-center md:p-10">
          <div className="flex min-w-0 items-center gap-5">
            <img
              src={dolphins}
              alt="Wild dolphins swimming in the deep blue Atlantic off Tenerife"
              width={1200}
              height={912}
              loading="lazy"
              decoding="async"
              className="hidden h-20 w-28 shrink-0 rounded-2xl object-cover sm:block"
            />
            <p className="min-w-0 text-sm leading-relaxed text-muted-foreground">
              Final meeting and travel details are confirmed directly after reservation. Wildlife
              sightings depend on natural conditions and can never be guaranteed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              track("reserve_click", { placement: "experience_ocean" });
              requestExperience("Volcanic Coast & Los Gigantes Adventure");
            }}
            className="rounded-full bg-atlantic-deep px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Ask About This Experience
          </button>
        </Reveal>
      </div>
    </section>
  );
}
