/**
 * Effects — Figma effect styles.
 */
export const effects = {
  /** Figma: shadow-high — drop shadow 0 16 32 0 #0000001F */
  shadowHigh: '0px 16px 32px 0px rgba(0, 0, 0, 0.12)',
} as const;

export type EffectToken = keyof typeof effects;
