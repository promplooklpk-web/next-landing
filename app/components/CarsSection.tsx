import { cars } from "@/data/cars";
import { CarShowcasePanel } from "./CarShowcasePanel";

export function CarsSection() {
  const inventory = cars.filter((car) => !car.sold);

  return (
    <div id="cars">
      {inventory.map((car) => (
        <CarShowcasePanel key={car.slug} car={car} />
      ))}
    </div>
  );
}
