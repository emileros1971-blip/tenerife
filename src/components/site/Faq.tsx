import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

export const FAQ_ITEMS = [
  {
    q: "Where do the experiences take place?",
    a: "Experiences focus on Tenerife, particularly South Tenerife and selected destinations around the island. Exact meeting and travel arrangements are confirmed directly after reservation.",
  },
  {
    q: "When can I book?",
    a: "Experiences are available from Friday, 28 August 2026 onward.",
  },
  {
    q: "Is this good for couples?",
    a: "Yes. The Volcanic Coast & Los Gigantes experience is particularly suited to couples, friends and small groups looking for a memorable Tenerife day.",
  },
  {
    q: "Is there something suitable for families?",
    a: "Yes. The Banana Experience & South Tenerife Discovery is especially suitable for families and groups.",
  },
  {
    q: "Can schools or educational groups enquire?",
    a: "Yes. Select Private / Group Experience in the reservation form and provide the group information.",
  },
  {
    q: "Can I arrange a private experience?",
    a: "Yes. Private and group enquiries are welcome.",
  },
  {
    q: "What should I bring?",
    a: "Comfortable clothes and footwear, sun protection and water. Bring swimwear and a towel when your experience includes swimming.",
  },
  {
    q: "Will we definitely see whales or dolphins?",
    a: "No. Wildlife sightings depend on natural conditions and can never be guaranteed.",
  },
  {
    q: "Is sending the form a confirmed reservation?",
    a: "No. The form is a reservation request. Availability and final arrangements will be confirmed directly afterwards.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-background py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <h2 className="display-lg">Good to know</h2>
          <p className="mt-4 text-muted-foreground">
            Everything else is confirmed personally after your request.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline md:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
