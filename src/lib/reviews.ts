/**
 * GUEST REVIEWS
 * -------------------------------------------------------------
 * ⚠️ The entries below are clearly-marked PLACEHOLDERS for development.
 * They are NOT real guest reviews and must be replaced with genuine
 * reviews before the site goes live.
 *
 * To publish real reviews: replace the array items below with the exact
 * wording supplied by the guest, set `placeholder: false`, and keep the
 * same field structure. Nothing else needs to change.
 */

export type Review = {
  name: string;
  location?: string;
  text: string;
  stars: number;
  placeholder: boolean;
};

export const reviews: Review[] = [
  {
    name: "Placeholder",
    location: "Sample review",
    text: "Example review text — replace with a genuine guest review before launch.",
    stars: 5,
    placeholder: true,
  },
  {
    name: "Placeholder",
    location: "Sample review",
    text: "Example review text — replace with a genuine guest review before launch.",
    stars: 5,
    placeholder: true,
  },
  {
    name: "Placeholder",
    location: "Sample review",
    text: "Example review text — replace with a genuine guest review before launch.",
    stars: 5,
    placeholder: true,
  },
];

export const hasRealReviews = reviews.some((r) => !r.placeholder);
