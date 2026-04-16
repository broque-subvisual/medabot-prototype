/**
 * Footer partilhado do profile setup (5.7–5.14).
 * Dots indicator + Continuar button (enabled/disabled) + Saltar link.
 */
interface OnboardingFooterProps {
  activeIndex: number;
  totalDots: number;
  canSubmit: boolean;
  onNext: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  hideDots?: boolean;
}

export function OnboardingFooter({
  activeIndex,
  totalDots,
  canSubmit,
  onNext,
  onSkip,
  nextLabel = 'Continuar',
  hideDots = false,
}: OnboardingFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-lg)',
        width: '100%',
        marginTop: 'auto',
      }}
    >
      {/* Dots */}
      {!hideDots && (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', height: 6 }}>
          {Array.from({ length: totalDots }).map((_, i) =>
            i === activeIndex ? (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 6,
                  borderRadius: 'var(--radius-xsm)',
                  background: '#003d99',
                }}
              />
            ) : (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 8,
                  background: 'var(--color-neutral-background)',
                }}
              />
            ),
          )}
        </div>
      )}

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-xs)',
          width: '100%',
        }}
      >
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => canSubmit && onNext()}
          style={{
            height: 56,
            width: '100%',
            background: canSubmit ? '#ffffff' : '#edf2ff',
            border: canSubmit ? '1.5px solid var(--color-brand-primary)' : 'none',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-title-m)',
            lineHeight: 'var(--line-height-title-m)',
            color: canSubmit
              ? 'var(--color-brand-primary)'
              : 'var(--color-button-primary-disabled)',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'background-color 120ms ease-out',
          }}
        >
          {nextLabel}
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            style={{
              height: 44,
              padding: 'var(--space-sm)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-body-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: 'var(--color-text-on-brand)',
              cursor: 'pointer',
            }}
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  );
}
