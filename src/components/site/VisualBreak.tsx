import breakImg from "@/assets/coast-parallax.jpg";
import { useParallax } from "@/hooks/use-reveal";
import { Reveal } from "./Reveal";

export function VisualBreak() {
  const { ref, offset } = useParallax(0.2);

  return (
    <section ref={ref} className="relative isolate h-[70svh] min-h-[26rem] overflow-hidden">
      <img
        src={breakImg}
        alt="Aerial view of Tenerife's rugged volcanic coast meeting the Atlantic in late afternoon light"
        width={1920}
        height={1088}
        loading="lazy"
        decoding="async"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.15)` }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/40" />
      <div className="relative container-x flex h-full flex-col justify-end pb-16 md:pb-24">
        <Reveal>
          <h2 className="display-lg max-w-2xl text-primary-foreground">
            Tenerife looks different when you leave the resort behind.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow mt-5 text-turquoise">Ocean · Volcanoes · Cliffs · Local life</p>
        </Reveal>
      </div>
    </section>
  );
}
