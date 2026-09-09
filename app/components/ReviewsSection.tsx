import { reviews } from "@/data/shop";

export function ReviewsSection() {
  return (
    <section className="bg-surface-muted py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          รีวิวจากลูกค้า
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span className="font-semibold">{review.name}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
