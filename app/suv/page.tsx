import { CategoryInventoryPage } from "../components/CategoryInventoryPage";
import { categoryPageMetadata } from "@/lib/category-seo";

export const metadata = categoryPageMetadata("suv");

export default function SuvCategoryPage() {
  return <CategoryInventoryPage category="suv" />;
}
