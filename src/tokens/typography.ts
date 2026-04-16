/**
 * Typography — Figma collection `typography/*`.
 *
 * Conflict notes:
 * - `Header` line-height = 32 hardcoded no Figma (não bound a variável). TODO Figma: criar `line-height/header = 32` e rebind.
 * - Naming case do Figma é misto (PascalCase + lowercase com espaços); aqui exportamos camelCase.
 */
export const fontFamily = {
  /** Figma: font-family/DM Sans */
  dmSans: "'DM Sans', system-ui, sans-serif",
} as const;

export const fontWeight = {
  /** Figma: weight/regular  */ regular: 400,
  /** Figma: weight/medium   */ medium: 500,
  /** Figma: weight/semibold */ semibold: 600,
  /** Figma: weight/bold     */ bold: 700,
} as const;

export const fontSize = {
  /** Figma: size/Micro   */ micro: 11,
  /** Figma: size/Caption */ caption: 12,
  /** Figma: size/body M  */ bodyM: 14,
  /** Figma: size/title M */ titleM: 18,
  /** Figma: size/header  */ header: 24,
  /** Figma: size/display */ display: 32,
} as const;

export const lineHeight = {
  /** Figma: line-height/micro    */ micro: 16,
  /** Figma: line-height/caption  */ caption: 16,
  /** Figma: line-height/body M   */ bodyM: 20,
  /** Figma: line-height/title M  */ titleM: 24,
  /** Figma: hardcoded (não bound) */ header: 32,
  /** Figma: line-height/display  */ display: 40,
} as const;

/**
 * Composed text styles — match Figma styles 1:1.
 */
export const textStyles = {
  micro: {
    fontFamily: fontFamily.dmSans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.micro,
    lineHeight: `${lineHeight.micro}px`,
  },
  caption: {
    fontFamily: fontFamily.dmSans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.caption,
    lineHeight: `${lineHeight.caption}px`,
  },
  bodyM: {
    fontFamily: fontFamily.dmSans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.bodyM,
    lineHeight: `${lineHeight.bodyM}px`,
  },
  titleM: {
    fontFamily: fontFamily.dmSans,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.titleM,
    lineHeight: `${lineHeight.titleM}px`,
  },
  header: {
    fontFamily: fontFamily.dmSans,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.header,
    lineHeight: `${lineHeight.header}px`,
  },
  display: {
    fontFamily: fontFamily.dmSans,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.display,
    lineHeight: `${lineHeight.display}px`,
  },
} as const;

export type TextStyle = keyof typeof textStyles;
