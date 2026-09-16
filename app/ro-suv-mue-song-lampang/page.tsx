import type { Metadata } from "next";
import { CategoryLocalPage } from "@/app/components/CategoryLocalPage";
import { getCategoryById } from "@/lib/category-pages";
import { categoryPageMetadata } from "@/lib/category-seo";

const config = getCategoryById("suv");

export const metadata: Metadata = categoryPageMetadata(config);

export default function SuvCategoryPage() {
  return <CategoryLocalPage categoryId="suv" />;
}
