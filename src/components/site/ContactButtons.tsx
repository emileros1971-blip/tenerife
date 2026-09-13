import { Phone, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { contactLinks, track, type ContactKey } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ICONS: Record<ContactKey, typeof Phone> = {
  phone: Phone,
  whatsapp: MessageCircle,
  viber: Send,
  signal: ShieldCheck,
};

export const CONTACT_ORDER: ContactKey[] = ["phone", "whatsapp", "viber", "signal"];

export function ContactIcon({ k, className }: { k: ContactKey; className?: string }) {
  const Icon = ICONS[k];
  return <Icon className={className} aria-hidden="true" />;
}

/** Inline row of contact buttons (used near the reservation form and footer). */
export function ContactRow({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {CONTACT_ORDER.map((k) => {
        const c = contactLinks[k];
        const isWa = k === "whatsapp";
        return (
          <a
            key={k}
            href={c.href}
            onClick={() => track(c.event)}
            aria-label={c.label}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300",
              "hover:-translate-y-0.5 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              compact && "px-4 py-2.5 text-xs",
              isWa
                ? "border-transparent bg-leaf text-primary-foreground hover:bg-leaf/90"
                : "border-border bg-card text-foreground hover:border-atlantic/40",
            )}
          >
            <ContactIcon k={k} className="h-4 w-4" />
            {c.label}
          </a>
        );
      })}
    </div>
  );
}
