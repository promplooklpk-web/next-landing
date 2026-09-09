import { reviews } from "@/data/shop";

export function ReviewsSection() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[900px] px-6">
        <h2 className="text-center text-3xl font-medium tracking-tight md:text-4xl">
          รีวิวจากลูกค้า
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="text-center md:text-left">
              <p className="text-sm leading-relaxed text-muted">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-4 text-xs text-muted-light">
                {review.name} · {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
