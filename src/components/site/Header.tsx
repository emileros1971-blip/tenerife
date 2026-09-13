import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId, track } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Experiences", id: "experiences" },
  { label: "The Day", id: "the-day" },
  { label: "Families & Groups", id: "families" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass shadow-soft" : "bg-transparent",
      )}
    >
      <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 md:py-4">
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className={cn(
            "min-w-0 truncate text-left font-display text-lg font-semibold tracking-tight transition-colors md:text-xl",
            scrolled ? "text-foreground" : "text-primary-foreground",
          )}
        >
          Tenerife Hidden Side
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/80 hover:text-primary-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              track("reserve_click", { placement: "header" });
              go("reserve");
            }}
            className="ml-2 rounded-full bg-atlantic-deep px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Reserve
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors lg:hidden",
            scrolled ? "text-foreground" : "text-primary-foreground",
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "glass overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="rounded-xl px-3 py-3 text-left text-base font-medium text-foreground hover:bg-secondary"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              track("reserve_click", { placement: "mobile_menu" });
              go("reserve");
            }}
            className="mt-2 rounded-full bg-atlantic-deep px-5 py-3.5 text-base font-semibold text-primary-foreground"
          >
            Reserve
          </button>
        </nav>
      </div>
    </header>
  );
}
