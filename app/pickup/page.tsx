import { CategoryInventoryPage } from "../components/CategoryInventoryPage";
import { categoryPageMetadata } from "@/lib/category-seo";

export const metadata = categoryPageMetadata("pickup");

export default function PickupCategoryPage() {
  return <CategoryInventoryPage category="pickup" />;
}
