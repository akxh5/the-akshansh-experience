import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPoemDate(dateString: string) {
  try {
    // If it's already in a readable format, return it
    if (dateString.includes(",")) return dateString;
    
    // Otherwise parse and format
    const date = parseISO(dateString);
    return format(date, "MMMM d, yyyy");
  } catch (e) {
    return dateString;
  }
}
