import { CategoryInventoryPage } from "../components/CategoryInventoryPage";
import { categoryPageMetadata } from "@/lib/category-seo";

export const metadata = categoryPageMetadata("sedan");

export default function SedanCategoryPage() {
  return <CategoryInventoryPage category="sedan" />;
}
