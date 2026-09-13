import sunset from "@/assets/sunset-cta.jpg";
import { useParallax } from "@/hooks/use-reveal";
import { Reveal } from "./Reveal";
import { scrollToId, track } from "@/lib/site-config";

export function EmotionalCTA() {
  const { ref, offset } = useParallax(0.16);

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-28 md:py-40">
      <img
        src={sunset}
        alt="Atlantic sunset seen from the south west coast of Tenerife with La Gomera on the horizon"
        width={1920}
        height={1088}
        loading="lazy"
        decoding="async"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.12)` }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-charcoal/80" />
      <div className="relative container-x text-center">
        <Reveal>
          <h2 className="display-lg mx-auto max-w-3xl text-primary-foreground">
            Your Tenerife memories shouldn't end at the hotel.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/85">
            Go somewhere different. See something memorable. Discover another side of the island.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <button
            type="button"
            onClick={() => {
              track("reserve_click", { placement: "emotional_cta" });
              scrollToId("reserve");
            }}
            className="mt-10 rounded-full bg-shell px-9 py-4 text-base font-semibold text-charcoal shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-turquoise hover:text-atlantic-deep"
          >
            I'm Interested
          </button>
        </Reveal>
      </div>
    </section>
  );
}
