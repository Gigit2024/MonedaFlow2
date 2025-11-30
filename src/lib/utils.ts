// Archivo: src/lib/utils.ts

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Esta es la función que te falta y que debe ser exportada
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}