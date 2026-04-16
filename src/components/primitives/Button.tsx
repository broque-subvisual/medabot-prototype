import type { CSSProperties, ReactNode, MouseEventHandler } from 'react';

/**
 * Button — primitive baseada no componente Figma `buttons` (1022:12378).
 * Hierarchy: Primary | Secondary | Tertiary | Ghost
 * Size: xl (56) | lg (44) | md (36) | sm (32)
 *
 * Cobertura inicial: Primary, Secondary, Ghost (Tertiary fica para depois — não usado em Welcome).
 */

type Hierarchy = 'primary' | 'secondary' | 'ghost';
type Size = 'xl' | 'lg' | 'md' | 'sm';

interface ButtonProps {
  hierarchy?: Hierarchy;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const heightBySize: Record<Size, number> = {
  xl: 56,
  lg: 44,
  md: 36,
  sm: 32,
};

export function Button({
  hierarchy = 'primary',
  size = 'xl',
  fullWidth = false,
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const base: CSSProperties = {
    height: heightBySize[size],
    width: fullWidth ? '100%' : undefined,
    padding: '0 var(--space-md)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-size-title-m)',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-title-m)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-xs)',
    transition: 'background 120ms ease, border-color 120ms ease, color 120ms ease',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const byHierarchy: Record<Hierarchy, CSSProperties> = {
    primary: {
      background: disabled
        ? 'var(--color-button-primary-disabled)'
        : 'var(--color-brand-primary)',
      color: 'var(--color-text-on-brand)',
      border: 'none',
    },
    secondary: {
      background: 'var(--color-neutral-surface)',
      color: 'var(--color-brand-primary)',
      border: '1.5px solid var(--color-brand-primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-brand-primary)',
      border: 'none',
      textDecoration: 'underline',
      fontSize: 'var(--font-size-micro)',
      lineHeight: 'var(--line-height-micro)',
      fontWeight: 'var(--font-weight-medium)',
      height: 'var(--size-touch-min)',
      padding: 'var(--space-sm)',
      borderRadius: 'var(--radius-sm)',
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...byHierarchy[hierarchy] }}
    >
      {children}
    </button>
  );
}
