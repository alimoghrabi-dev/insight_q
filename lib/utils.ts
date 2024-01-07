import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function areStringsEqualIgnoreCase(str1: string, str2: string) {
  if (str1.toLowerCase() === str2.toLowerCase()) {
    return true;
  }

  return false;
}
