/**
 * Sizing — Figma collection `sizing/*` (icons + button heights).
 */
export const sizing = {
  /** Figma: sizing/icon-xsm    */ iconXsm: 12,
  /** Figma: sizing/icon-sm     */ iconSm: 16,
  /** Figma: sizing/icon-md     */ iconMd: 24,
  /** Figma: sizing/button-lg   */ buttonLg: 32,
  /** Figma: sizing/button-xl   */ buttonXl: 36,
  /** Figma: sizing/touch-min   */ touchMin: 44,
  /** Figma: sizing/button-main */ buttonMain: 56,
} as const;

export type SizingToken = keyof typeof sizing;
