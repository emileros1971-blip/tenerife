import introImg from "@/assets/intro-couple.jpg";
import { Reveal } from "./Reveal";

export function Intro() {
  return (
    <section className="surface-sand py-24 md:py-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow text-atlantic">South Tenerife</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-5 max-w-xl">More than another Tenerife excursion.</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Escape the resort for a while and discover memorable landscapes, local experiences and
              Atlantic adventures. Tenerife Hidden Side is designed for couples, friends, families
              and small groups who want to experience something different during their stay.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="image-frame relative">
          <img
            src={introImg}
            alt="A couple walking a black volcanic coastal path in Tenerife in warm evening light"
            width={1200}
            height={1504}
            loading="lazy"
            decoding="async"
            className="h-[26rem] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03] md:h-[34rem]"
          />
        </Reveal>
      </div>
    </section>
  );
}
