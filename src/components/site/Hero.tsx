import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-volcanic-coast.jpg";
import { scrollToId, track } from "@/lib/site-config";
import { useParallax } from "@/hooks/use-reveal";

export function Hero() {
  const { ref, offset } = useParallax(0.12);

  return (
    <section id="top" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Volcanic coastline in Tenerife at golden hour with a natural sea pool and Mount Teide in the distance"
        width={1920}
        height={1088}
        fetchPriority="high"
        decoding="async"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.08)` }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/65 via-charcoal/35 to-charcoal/75" />
      <div className="absolute inset-0 bg-gradient-to-tr from-atlantic-deep/45 to-transparent" />

      <div className="relative container-x flex min-h-[100svh] flex-col justify-end pt-28 pb-16 md:justify-center md:pb-24">
        <div className="max-w-3xl">
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.18em] text-primary-foreground uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-turquoise" />
            Now booking · Available from 28 August 2026
          </span>

          <h1 className="display-xl mt-6 text-primary-foreground">
            Discover Tenerife's
            <br />
            Hidden Side
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Natural pools, dramatic cliffs, ocean adventures and authentic island experiences —
            discover more than the usual Tenerife holiday.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                track("reserve_click", { placement: "hero" });
                scrollToId("reserve");
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-shell px-7 py-4 text-base font-semibold text-charcoal shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-turquoise hover:text-atlantic-deep"
            >
              Reserve Your Experience
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("experiences")}
              className="inline-flex items-center justify-center rounded-full border border-shell/40 px-7 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:border-shell hover:bg-shell/10"
            >
              Explore the Experiences
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-[0.14em] text-primary-foreground/70 uppercase">
            {["Small Groups", "Personal Experiences", "South Tenerife"].map((v, i) => (
              <li key={v} className="flex items-center gap-3">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-turquoise/70" /> : null}
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
