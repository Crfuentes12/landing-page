//landing-page/src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS class names safely.
 * Prevents conflicting styles and unnecessary duplication.
 *
 * @param inputs - Class names to merge
 * @returns A single merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
