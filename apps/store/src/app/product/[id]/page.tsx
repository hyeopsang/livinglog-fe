"use client";

import { ProductDetailContent } from "./_components/ProductDetailContent";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProductDetailContent params={params} />;
}
