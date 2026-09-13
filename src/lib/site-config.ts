/**
 * Central project configuration.
 *
 * ⚠️ REPLACE `servicePhone` with the real service phone number before launch.
 * It is used by every Call / WhatsApp / Viber / Signal link on the page.
 */

// International format, no spaces (used for tel:, wa.me, viber, signal links)
const RAW_PHONE = "+34600000000";

export const siteConfig = {
  name: "Tenerife Hidden Side",
  tagline: "Swim. Sail. Taste. Discover.",
  firstAvailableDateISO: "2026-08-28",
  firstAvailableDateLabel: "Friday, 28 August 2026",
  servicePhone: RAW_PHONE,
  servicePhoneDisplay: "+34 600 000 000",
  /** Web3Forms (or compatible) endpoint. Add your access key to go live. */
  formEndpoint: "https://api.web3forms.com/submit",
  web3formsAccessKey: "", // <-- paste your Web3Forms access key here
};

const digits = RAW_PHONE.replace(/[^\d]/g, "");

export const contactLinks = {
  phone: { label: "Call", href: `tel:${RAW_PHONE}`, event: "phone_click" },
  whatsapp: {
    label: "WhatsApp",
    href: `https://wa.me/${digits}?text=${encodeURIComponent(
      "Hello Tenerife Hidden Side! I'd like to ask about an experience.",
    )}`,
    event: "whatsapp_click",
  },
  viber: { label: "Viber", href: `viber://chat?number=%2B${digits}`, event: "viber_click" },
  signal: { label: "Signal", href: `https://signal.me/#p/${RAW_PHONE}`, event: "signal_click" },
} as const;

export type ContactKey = keyof typeof contactLinks;

export const EXPERIENCE_OPTIONS = [
  "Volcanic Coast & Los Gigantes Adventure",
  "Banana Experience & South Tenerife Discovery",
  "Private / Group Experience",
  "Not Sure — Help Me Choose",
] as const;

/**
 * Analytics shim — ready for GA4 / GTM / Meta Pixel.
 * Events fired: page_view, reserve_click, whatsapp_click, phone_click,
 * viber_click, signal_click, form_start, reservation_submitted.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  w.dataLayer?.push({ event, ...params });
  w.gtag?.("event", event, params);
  w.fbq?.("trackCustom", event, params);
}

export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Pre-selects an experience inside the reservation form and scrolls to it. */
export function requestExperience(value: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ths:select-experience", { detail: value }));
  scrollToId("reserve");
}
