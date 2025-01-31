// src/lib/constants.ts
export const INITIAL_PRICE_RANGE = { min: 10000, max: 15000 } as const;
export const TARGET_PRICE_RANGE = { min: 5000, max: 5300 } as const;

export type PriceRange = {
  min: number;
  max: number;
};

export type Timeline = {
  min: number;
  max: number;
  unit: 'weeks' | 'days' | 'months';
};