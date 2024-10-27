import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setFutureDate(days: number) {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + days);
  return futureDate;
}
