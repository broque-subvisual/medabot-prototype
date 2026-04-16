/**
 * Colors — extraídos do Figma file 7EnBtKskhCoGnKgL9tva0o.
 * Naming: camelCase (TS) ↔ original Figma path no comentário JSDoc.
 */
export const colors = {
  /** Figma: brand/Primary */
  brandPrimary: '#0052cc',
  /** Figma: brand/Primary Light */
  brandPrimaryLight: '#e5efff',

  /** Figma: neutral/background */
  neutralBackground: '#f5f7ff',
  /** Figma: neutral/surface */
  neutralSurface: '#ffffff',
  /** Figma: neutral/border */
  neutralBorder: '#e2e8f0',

  /** Figma: text/text-primary */
  textPrimary: '#0f172a',
  /** Figma: text/text-secondary */
  textSecondary: '#475569',
  /** Figma: text/text-tertiary */
  textTertiary: '#5f738c',
  /** Figma: text/text-disabled */
  textDisabled: '#b0bec5',
  /** Figma: text/text-on-brand */
  textOnBrand: '#ffffff',

  /** Figma: semantic/info/* */
  infoBg: '#eff6ff',
  infoSurface: '#60a5fa',
  infoText: '#1e40af',

  /** Figma: semantic/success/* */
  successBg: '#f0fdf4',
  successSurface: '#16a34a',
  successText: '#15803d',

  /** Figma: semantic/warning/* */
  warningBg: '#fffbeb',
  warningSurface: '#d97706',
  warningText: '#b45309',

  /** Figma: semantic/danger/* */
  dangerBg: '#fef2f2',
  dangerSurface: '#dc2626',
  dangerText: '#991b1b',

  /** Figma: buttons/primary/disabled */
  buttonPrimaryDisabled: '#b0c4e8',
  /** Figma: buttons/secondary/pressed */
  buttonSecondaryPressed: '#c0d4f7',
  /** Figma: buttons/tertiary/pressed */
  buttonTertiaryPressed: '#c5cdd8',
} as const;

export type ColorToken = keyof typeof colors;
