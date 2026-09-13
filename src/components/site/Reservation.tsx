import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { ContactRow } from "./ContactButtons";
import { EXPERIENCE_OPTIONS, siteConfig, track } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Errors = { name?: string; email?: string; phone?: string; date?: string };

const MIN_DATE = siteConfig.firstAvailableDateISO;

const field =
  "w-full rounded-2xl border border-input bg-card px-4 py-3.5 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-atlantic focus:ring-2 focus:ring-ring/25";
const labelCls = "block text-sm font-medium text-foreground/80";

export function Reservation() {
  const [experience, setExperience] = useState<string>(EXPERIENCE_OPTIONS[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const started = useRef(false);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setExperience(detail);
    };
    window.addEventListener("ths:select-experience", onSelect);
    return () => window.removeEventListener("ths:select-experience", onSelect);
  }, []);

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("form_start");
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot spam protection
    if ((data.get("botcheck") as string)?.length) return;

    const next: Errors = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const date = data.get("date") as string;

    if (!name) next.name = "Please enter your full name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!phone || phone.replace(/\D/g, "").length < 6)
      next.phone = "Please enter a reachable mobile or WhatsApp number.";
    if (!date) next.date = "Please choose a preferred date.";
    else if (date < MIN_DATE) next.date = `Experiences start on ${siteConfig.firstAvailableDateLabel}.`;

    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    data.set("experience", experience);
    data.set("subject", `New reservation request — ${experience}`);
    if (siteConfig.web3formsAccessKey) data.set("access_key", siteConfig.web3formsAccessKey);

    try {
      if (siteConfig.web3formsAccessKey) {
        const res = await fetch(siteConfig.formEndpoint, { method: "POST", body: data });
        if (!res.ok) throw new Error("Request failed");
      }
      track("reservation_submitted", { experience });
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="reserve" className="surface-sand py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <div className="rounded-3xl bg-card p-7 shadow-soft">
              <span className="eyebrow flex items-center gap-2 text-atlantic">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Experiences available from
              </span>
              <p className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                {siteConfig.firstAvailableDateLabel}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Send your preferred date and we'll confirm availability directly.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <h3 className="text-xl font-semibold">Prefer to contact us directly?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Message us any time — WhatsApp is usually fastest.
            </p>
            <div className="mt-5">
              <ContactRow />
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="rounded-3xl bg-card p-7 shadow-lift md:p-10">
            <h2 className="display-lg text-[clamp(1.9rem,3.4vw,2.6rem)]">Reserve Your Experience</h2>
            <p className="mt-4 text-muted-foreground">
              Tell us what you're interested in and we'll contact you directly to confirm
              availability and the details.
            </p>

            {status === "done" ? (
              <div
                role="status"
                className="mt-8 rounded-3xl border border-leaf/30 bg-leaf-soft/40 p-8 text-center"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-leaf" aria-hidden="true" />
                <p className="mt-4 font-display text-3xl">Thank you!</p>
                <p className="mt-3 text-muted-foreground">
                  Your request has been received. We'll contact you shortly to confirm your Tenerife
                  experience.
                </p>
                <div className="mt-7 flex justify-center">
                  <ContactRow compact />
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} onFocus={onFirstInteraction} noValidate className="mt-8">
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      className={cn(field, "mt-2", errors.name && "border-destructive")}
                      placeholder="Your name"
                    />
                    {errors.name ? <Err msg={errors.name} /> : null}
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={cn(field, "mt-2", errors.email && "border-destructive")}
                      placeholder="you@email.com"
                    />
                    {errors.email ? <Err msg={errors.email} /> : null}
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="phone">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={cn(field, "mt-2", errors.phone && "border-destructive")}
                      placeholder="+44 ..."
                    />
                    {errors.phone ? <Err msg={errors.phone} /> : null}
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="date">
                      Preferred Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={MIN_DATE}
                      defaultValue={MIN_DATE}
                      className={cn(field, "mt-2", errors.date && "border-destructive")}
                    />
                    {errors.date ? <Err msg={errors.date} /> : null}
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} htmlFor="adults">
                        Adults
                      </label>
                      <input
                        id="adults"
                        name="adults"
                        type="number"
                        min={1}
                        defaultValue={2}
                        className={cn(field, "mt-2")}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="children">
                        Children
                      </label>
                      <input
                        id="children"
                        name="children"
                        type="number"
                        min={0}
                        defaultValue={0}
                        className={cn(field, "mt-2")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="stay">
                      Where are you staying?
                    </label>
                    <input
                      id="stay"
                      name="stay"
                      className={cn(field, "mt-2")}
                      placeholder="Costa Adeje, Los Cristianos, Playa de las Américas..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="experience">
                      Choose Your Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className={cn(field, "mt-2 appearance-none")}
                    >
                      {EXPERIENCE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="message">
                      Anything we should know?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={cn(field, "mt-2 resize-y")}
                      placeholder="Group details, ages, accessibility, questions..."
                    />
                  </div>
                </div>

                {status === "error" ? (
                  <p role="alert" className="mt-5 text-sm text-destructive">
                    Something went wrong sending your request. Please try again or message us on
                    WhatsApp.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-8 w-full rounded-full bg-atlantic-deep px-8 py-4.5 text-base font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send Reservation Request"}
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                  No payment is taken when sending this request. We'll contact you directly to
                  confirm availability and final details.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Err({ msg }: { msg: string }) {
  return (
    <p role="alert" className="mt-2 text-xs text-destructive">
      {msg}
    </p>
  );
}
