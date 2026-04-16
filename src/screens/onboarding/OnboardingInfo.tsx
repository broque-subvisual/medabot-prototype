import { useNavigate } from 'react-router-dom';
import { BlueFrame } from './BlueFrame';

/**
 * Shared template for 5.2 / 5.3 / 5.4 onboarding info screens.
 * Estrutura Figma (1028:5946 et al):
 * - Container: pt-128, pb-12, px-16, justify-between
 * - Inner group: gap-24, items-center, text-center
 * - Icon 56×56 (inner 36) + Title Display center
 * - Body M text-[#b3d4ff] text-center
 * - Dots indicator (active index) + Seguinte button + Saltar link
 */
interface OnboardingInfoProps {
  icon: string;
  title: string;
  body: string;
  activeIndex: 0 | 1 | 2;
  nextRoute: string;
  skipRoute: string;
}

const TOTAL_DOTS = 3;

export function OnboardingInfo({
  icon,
  title,
  body,
  activeIndex,
  nextRoute,
  skipRoute,
}: OnboardingInfoProps) {
  const navigate = useNavigate();

  return (
    <BlueFrame>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-4xl) var(--space-md) var(--space-sm)',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-lg)',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={icon}
                alt=""
                aria-hidden
                style={{ width: 36, height: 36, display: 'block' }}
              />
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-display)',
                lineHeight: 'var(--line-height-display)',
                color: '#ffffff',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {title}
            </h1>
          </div>
          <p
            style={{
              margin: 0,
              width: '100%',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-body-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: '#b3d4ff',
              textAlign: 'center',
            }}
          >
            {body}
          </p>
        </div>

        {/* Bottom: dots + buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-lg)',
            width: '100%',
          }}
        >
          {/* Dots */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              height: 6,
            }}
          >
            {Array.from({ length: TOTAL_DOTS }).map((_, i) =>
              i === activeIndex ? (
                <div
                  key={i}
                  style={{
                    width: 18,
                    height: 6,
                    borderRadius: 'var(--radius-xsm)',
                    background: 'var(--color-button-primary-disabled)',
                  }}
                />
              ) : (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 8,
                    background: 'var(--color-brand-primary)',
                  }}
                />
              ),
            )}
          </div>

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
              onClick={() => navigate(nextRoute)}
              style={{
                height: 56,
                width: '100%',
                background: '#ffffff',
                border: '1.5px solid var(--color-brand-primary)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-title-m)',
                lineHeight: 'var(--line-height-title-m)',
                color: 'var(--color-brand-primary)',
                cursor: 'pointer',
              }}
            >
              Seguinte
            </button>
            <button
              type="button"
              onClick={() => navigate(skipRoute)}
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
          </div>
        </div>
      </div>
    </BlueFrame>
  );
}
