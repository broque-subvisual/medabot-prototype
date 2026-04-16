/**
 * Spacing scale — Figma collection `spacing/*`.
 * Single source of truth: `spacing/sm = 12` (any frame returning 8 is a Figma bug to fix).
 */
export const spacing = {
  /** Figma: spacing/2xs */ space2xs: 4,
  /** Figma: spacing/xs  */ spaceXs: 8,
  /** Figma: spacing/sm  */ spaceSm: 12,
  /** Figma: spacing/md  */ spaceMd: 16,
  /** Figma: spacing/lg  */ spaceLg: 24,
  /** Figma: spacing/xl  */ spaceXl: 32,
  /** Figma: spacing/2xl */ space2xl: 48,
  /** Figma: spacing/3xl */ space3xl: 64,
  /** Figma: spacing/4xl */ space4xl: 128,
} as const;

export type SpacingToken = keyof typeof spacing;
