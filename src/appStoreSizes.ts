export const APP_STORE_SIZE_OPTIONS = [
  "iPhone 6.7\" (1290x2796)",
  "iPhone 6.5\" (1242x2688)",
  "iPhone 5.5\" (1242x2208)",
  "iPad 12.9\" (2048x2732)",
] as const;

export type AppStoreSizeOption = typeof APP_STORE_SIZE_OPTIONS[number];

export const APP_STORE_SIZE_MAP: Record<
  AppStoreSizeOption,
  { width: number; height: number }
> = {
  "iPhone 6.7\" (1290x2796)": { width: 1290, height: 2796 },
  "iPhone 6.5\" (1242x2688)": { width: 1242, height: 2688 },
  "iPhone 5.5\" (1242x2208)": { width: 1242, height: 2208 },
  "iPad 12.9\" (2048x2732)": { width: 2048, height: 2732 },
};

export const getAppStoreSize = (size: AppStoreSizeOption) =>
  APP_STORE_SIZE_MAP[size];
