/**
 * Border radius — Figma collection `radius/*`.
 */
export const radius = {
  /** Figma: radius/xsm  */ radiusXsm: 8,
  /** Figma: radius/sm   */ radiusSm: 12,
  /** Figma: radius/md   */ radiusMd: 16,
  /** Figma: radius/lg   */ radiusLg: 55,
  /** Figma: radius/pill */ radiusPill: 99,
} as const;

export type RadiusToken = keyof typeof radius;
