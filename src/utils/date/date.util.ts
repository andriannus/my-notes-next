import { format } from "date-fns";

export function transformToISOFormat(date: number | Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}
