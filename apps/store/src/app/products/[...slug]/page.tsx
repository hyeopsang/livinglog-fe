"use client";

import { ProductsContent } from "./_components/ProductsContent";

export default function ProductsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return <ProductsContent params={params} />;
}
