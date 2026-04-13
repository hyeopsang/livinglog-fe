"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: [string, ...string[]];
  name: string;
  discountRate: number;
}

export function ProductImageGallery({ images, name, discountRate }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-neutral-100">
        <Image
          src={images[selectedIndex] ?? images[0]}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {discountRate > 0 && (
          <span className="absolute top-4 left-4 bg-brand text-white text-sm font-bold px-3 py-1.5 rounded-lg">
            -{discountRate}%
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 border-2 transition-colors ${
                selectedIndex === i
                  ? "border-brand"
                  : "border-transparent hover:border-neutral-300"
              }`}
            >
              <Image
                src={src}
                alt={`${name} ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
