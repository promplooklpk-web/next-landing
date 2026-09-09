import { cars as seedCars } from "@/data/cars";
import { EditCarBySlugClient } from "./EditCarBySlugClient";

export function generateStaticParams() {
  return seedCars.map((car) => ({ slug: car.slug }));
}

export default function EditCarBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <EditCarBySlugClient params={params} />;
}
