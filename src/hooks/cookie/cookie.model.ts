export interface CookieHook {
  get<T = any>(name: string): T | null;
  isExist(name: string): boolean;
  remove(name: string): void;
  set(name: string, value: any): void;
}
