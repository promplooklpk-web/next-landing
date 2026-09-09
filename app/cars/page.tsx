import type { Metadata } from "next";
import { CarsRedirect } from "./CarsRedirect";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function CarsRedirectPage() {
  return <CarsRedirect />;
}
