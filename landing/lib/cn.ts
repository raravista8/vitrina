import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-aware class-list joiner. Used by every component to compose
 * conditional + base classes without "tailwind-class-string-soup".
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
