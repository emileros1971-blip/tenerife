import { useEffect, useState } from "react";
import { X, MessagesSquare } from "lucide-react";
import { contactLinks, track } from "@/lib/site-config";
import { CONTACT_ORDER, ContactIcon } from "./ContactButtons";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* Desktop rail */}
      <div className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {CONTACT_ORDER.map((k) => {
          const c = contactLinks[k];
          return (
            <a
              key={k}
              href={c.href}
              onClick={() => track(c.event, { placement: "floating_rail" })}
              aria-label={c.label}
              className={cn(
                "group flex h-12 items-center gap-0 overflow-hidden rounded-full pr-0 pl-3 transition-all duration-300 hover:gap-2 hover:pr-5",
                "glass shadow-soft hover:shadow-lift",
                k === "whatsapp" && "bg-leaf/90 text-primary-foreground",
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center">
                <ContactIcon k={k} className="h-5 w-5" />
              </span>
              <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[7rem] group-hover:opacity-100">
                {c.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Mobile compact control */}
      <div className="fixed right-4 bottom-24 z-40 flex flex-col items-end gap-2 md:hidden">
        <div
          className={cn(
            "flex flex-col items-end gap-2 transition-all duration-300",
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          {CONTACT_ORDER.map((k) => {
            const c = contactLinks[k];
            return (
              <a
                key={k}
                href={c.href}
                onClick={() => track(c.event, { placement: "floating_mobile" })}
                aria-label={c.label}
                className={cn(
                  "glass flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold shadow-soft",
                  k === "whatsapp" && "bg-leaf/90 text-primary-foreground",
                )}
              >
                <ContactIcon k={k} className="h-4 w-4" />
                {c.label}
              </a>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close contact options" : "Open contact options"}
          className="grid h-13 w-13 place-items-center rounded-full bg-atlantic-deep p-3.5 text-primary-foreground shadow-lift transition-transform active:scale-95"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <MessagesSquare className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
