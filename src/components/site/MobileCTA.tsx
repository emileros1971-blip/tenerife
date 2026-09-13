import { useEffect, useState } from "react";
import { scrollToId, track } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 p-3 transition-all duration-400 md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <button
        type="button"
        onClick={() => {
          track("reserve_click", { placement: "mobile_sticky" });
          scrollToId("reserve");
        }}
        className="glass w-full rounded-full bg-atlantic-deep/95 py-4 text-base font-semibold text-primary-foreground shadow-lift"
      >
        Reserve
      </button>
    </div>
  );
}
