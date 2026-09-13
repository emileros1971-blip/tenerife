import { scrollToId, siteConfig } from "@/lib/site-config";
import { ContactRow } from "./ContactButtons";

const LINKS = [
  { label: "Experiences", id: "experiences" },
  { label: "Families & Groups", id: "families" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
  { label: "Reserve", id: "reserve" },
];

export function Footer() {
  return (
    <footer className="surface-deep pt-20 pb-28 md:pb-16">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-primary-foreground">{siteConfig.name}</p>
            <p className="mt-3 text-sm text-primary-foreground/70">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollToId(l.id)}
                className="text-left text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div>
            <p className="text-sm font-semibold text-primary-foreground">Contact</p>
            <div className="mt-4 [&_a]:border-shell/25 [&_a]:bg-transparent [&_a]:text-primary-foreground">
              <ContactRow compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-shell/15 pt-6 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="/privacy" className="transition-colors hover:text-primary-foreground">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-primary-foreground">
              Terms
            </a>
            <a href="/cookies" className="transition-colors hover:text-primary-foreground">
              Cookie information
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
