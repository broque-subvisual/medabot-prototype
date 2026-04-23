import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';

const STEPS = [
  'A identificar medicamento',
  'A procurar o folheto...',
  'A processar folheto com IA',
  'A gerar resumo',
  'Pronto para questões',
];

/** Duration each step stays in "loading" state before becoming "loaded" (ms). */
const STEP_DURATIONS = [600, 1800, 2800, 1200, 300];

type StepState = 'unloaded' | 'loading' | 'loaded';

function StepIcon({ state }: { state: StepState }) {
  if (state === 'loading') {
    /* 20×20 container, ring fills inset 0 (20px), inner dot at inset 20% (12×12 area → 4px dot) */
    return (
      <div
        style={{
          width: 20,
          height: 20,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 10,
            border: '1px solid var(--color-brand-primary)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '20%',
            borderRadius: 6,
            background: 'var(--color-brand-primary)',
            border: '1px solid var(--color-brand-primary)',
          }}
        />
      </div>
    );
  }

  /* loaded: 12×12 filled blue circle centered in 20×20 */
  /* unloaded: 12×12 filled #b0c4e8 circle centered in 20×20 */
  return (
    <div
      style={{
        width: 20,
        height: 20,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 12,
          height: 12,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 10,
          background: state === 'loaded' ? 'var(--color-brand-primary)' : '#b0c4e8',
        }}
      />
    </div>
  );
}

/**
 * 7.3_Identify — Figma nodes 1028:6765 → 1028:7065.
 * White screen with medication card and animated progress steps.
 */
interface LocationState {
  medName?: string;
  medSubtitle?: string;
}

export function IdentifyScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const medName = state?.medName || 'Brufen';
  const medSubtitle = state?.medSubtitle || 'Ibuprofeno';
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= STEPS.length) return;
    const timer = setTimeout(() => {
      setActiveStep((s) => s + 1);
    }, STEP_DURATIONS[activeStep]);
    return () => clearTimeout(timer);
  }, [activeStep]);

  /* After the last step completes, navigate to home after a short pause. */
  useEffect(() => {
    if (activeStep < STEPS.length) return;
    const timer = setTimeout(() => navigate('/med-info', { state: { medName, medSubtitle }, replace: true }), 300);
    return () => clearTimeout(timer);
  }, [activeStep, navigate]);

  function getStepState(index: number): StepState {
    if (index < activeStep) return 'loaded';
    if (index === activeStep) return 'loading';
    return 'unloaded';
  }

  return (
    <div
      className="phone-frame"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-neutral-background)',
        overflow: 'hidden',
      }}
    >
      <StatusBar variant="dark" />

      {/* Screen_content — flex-1 with pb-147 matching Figma */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          paddingBottom: 147,
        }}
      >
        {/* NavBar + Content wrapper — gap 48px (spacing/2xl) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 48,
            flexShrink: 0,
          }}
        >
          {/* NavBar — h44, px 16 */}
          <div
            style={{
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 var(--space-md)',
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/home')}
              aria-label="Voltar"
              style={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <img
                src={iconChevronLeft}
                alt=""
                style={{ width: 24, height: 24, display: 'block' }}
              />
            </button>
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-title-m)',
                lineHeight: 'var(--line-height-title-m)',
                color: 'var(--color-text-primary)',
              }}
            >
              A identificar...
            </span>
            <div style={{ width: 44, height: 44, opacity: 0 }} aria-hidden />
          </div>

          {/* Content_section — gap 24px (spacing/lg), px 16 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              padding: '0 var(--space-md)',
            }}
          >
            {/* Medication card — min-h 64, pl 16, pr 8, py 8, radius-md, subtle shadow */}
            <div
              style={{
                minHeight: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 'var(--space-md)',
                paddingRight: 'var(--space-xs)',
                paddingTop: 'var(--space-xs)',
                paddingBottom: 'var(--space-xs)',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-body-l)',
                    lineHeight: 'var(--line-height-body-l)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {medName}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-caption)',
                    lineHeight: 'var(--line-height-caption)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {medSubtitle}
                </span>
              </div>
            </div>

            {/* Progress_card — gap 4px, px 16, rounded 12, w 353 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: '0 16px',
                borderRadius: 12,
                width: 353,
              }}
            >
              {STEPS.map((label, i) => {
                const state = getStepState(i);
                const isActive = state === 'loading';
                return (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      padding: '12px 0',
                    }}
                  >
                    <StepIcon state={state} />
                    <span
                      style={{
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: isActive
                          ? 'var(--font-size-body-l)'
                          : 'var(--font-size-body-m)',
                        lineHeight: isActive
                          ? 'var(--line-height-body-l)'
                          : 'var(--line-height-body-m)',
                        color:
                          state === 'unloaded'
                            ? 'var(--color-text-tertiary)'
                            : 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.3s ease, font-size 0.3s ease',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
