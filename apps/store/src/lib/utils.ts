import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return price.toLocaleString("ko-KR");
}

export function getDiscountedPrice(originalPrice: number, discountRate: number) {
  return Math.round(originalPrice * (1 - discountRate / 100));
}
