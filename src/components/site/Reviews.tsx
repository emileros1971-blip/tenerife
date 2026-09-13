import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { reviews, hasRealReviews } from "@/lib/reviews";
import { scrollToId, track } from "@/lib/site-config";

export function Reviews() {
  return (
    <section id="reviews" className="surface-sand py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="display-lg">Loved by our guests</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 text-lg text-muted-foreground">Real experiences. Real memories.</p>
          </Reveal>
        </div>

        {!hasRealReviews ? (
          <Reveal delay={120}>
            <p className="mt-8 inline-block rounded-full border border-dashed border-border bg-card/60 px-4 py-2 text-xs text-muted-foreground">
              Development placeholders — replace with genuine guest reviews in{" "}
              <code>src/lib/reviews.ts</code>.
            </p>
          </Reveal>
        ) : null}

        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {reviews.map((r, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="w-[82vw] shrink-0 snap-center rounded-3xl bg-card p-7 shadow-soft transition-transform duration-500 hover:-translate-y-1 sm:w-[60vw] md:w-auto"
            >
              <div className="flex gap-1" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: r.stars }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-sun text-sun" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 leading-relaxed text-foreground/90">{r.text}</p>
              <div className="mt-7 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-atlantic">
                  {r.name.slice(0, 1)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{r.name}</span>
                  {r.location ? (
                    <span className="block truncate text-xs text-muted-foreground">
                      {r.location}
                    </span>
                  ) : null}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <h3 className="text-2xl md:text-3xl">Ready to discover Tenerife differently?</h3>
          <button
            type="button"
            onClick={() => {
              track("reserve_click", { placement: "reviews" });
              scrollToId("reserve");
            }}
            className="rounded-full bg-atlantic-deep px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Reserve Your Experience
          </button>
        </Reveal>
      </div>
    </section>
  );
}
