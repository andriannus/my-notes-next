export interface LocalStorageHook {
  get<T = any>(key: string): T | null;
  isExist(key: string): boolean;
  remove(key: string): void;
  reset(): void;
  set(key: string, value: any): void;
}
