import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import { useOnboarding } from '@/context/OnboardingContext';
import iconSearch from '@/assets/icon-search.svg';
import iconCamera from '@/assets/icon-camera.svg';
import iconPlus from '@/assets/icon-plus.svg';
import pillSvg from '@/assets/welcome-pill.svg';

/**
 * 6.1_Without_account — Guest home screen (Figma node 1028:5734).
 * Full blue background, no avatar, "Criar conta" pill top-right,
 * greeting "Olá", subtitle, search bar, disclaimer, camera FAB.
 */
interface GuestHomeScreenProps {
  children?: React.ReactNode;
}

export function GuestHomeScreen({ children }: GuestHomeScreenProps = {}) {
  const navigate = useNavigate();
  const { cameraPermitted } = useOnboarding();

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
      {/* Full blue frame */}
      <div style={{ padding: 'var(--space-2xs)', flex: 1, display: 'flex' }}>
        <div
          style={{
            background: 'var(--color-brand-primary)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingBottom: 'var(--space-2xl)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0px 16px 32px 0px rgba(0,0,0,0.12)',
          }}
        >
          {/* Pill watermark — rotated 90°, centered */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 183,
              bottom: -85,
              left: 'calc(50% + 9px)',
              aspectRatio: '1 / 1',
              transform: 'translateX(-50%) rotate(90deg)',
              transformOrigin: 'center',
              pointerEvents: 'none',
              opacity: 0.08,
            }}
          >
            <img
              src={pillSvg}
              alt=""
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>

          <StatusBar variant="white" />

          {/* Top bar — "Criar conta" pill aligned right */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '0 var(--space-md)',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/guest/sign-up')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                background: 'white',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                paddingRight: 6,
                paddingTop: 'var(--space-2xs)',
                paddingBottom: 'var(--space-2xs)',
                paddingLeft: 0,
                cursor: 'pointer',
                height: 28,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                }}
              >
                <img
                  src={iconPlus}
                  alt=""
                  style={{
                    width: 12,
                    height: 12,
                    display: 'block',
                    '--fill-0': 'var(--color-brand-primary)',
                  } as React.CSSProperties}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-micro)',
                  lineHeight: 'var(--line-height-micro)',
                  color: 'var(--color-brand-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                Criar conta
              </span>
            </button>
          </div>

          {/* Content area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2xl)',
              padding: '0 var(--space-md)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Greeting */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-lg)',
              }}
            >
              <div style={{ padding: '10px 0' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--font-size-display)',
                    lineHeight: 'var(--line-height-display)',
                    color: 'white',
                  }}
                >
                  Olá
                </p>
              </div>
              <div style={{ padding: '10px 0' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-title-l)',
                    lineHeight: 'var(--line-height-title-l)',
                    color: '#b3d4ff',
                    maxWidth: 266,
                  }}
                >
                  Identifica medicamentos com a câmara ou pesquise pelo nome.
                </p>
              </div>
            </div>

            {/* Search bar — no camera icon */}
            <div
              onClick={() => navigate('/search')}
              role="button"
              tabIndex={0}
              style={{
                height: 44,
                width: '100%',
                background: 'var(--color-neutral-surface)',
                border: '1.5px solid var(--color-text-tertiary)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 0 30px 0 rgba(0,0,0,0.05)',
                padding: '0 var(--space-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                cursor: 'text',
              }}
            >
              <img
                src={iconSearch}
                alt=""
                aria-hidden
                style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                Pesquisar medicamento...
              </span>
            </div>

            {/* Disclaimer banner — white text on blue */}
            <div
              style={{
                display: 'flex',
                gap: 4,
                alignItems: 'flex-start',
                padding: 'var(--space-xs) var(--space-md)',
                borderRadius: 'var(--radius-xsm)',
                boxShadow: '0 0 30px 0 rgba(0,0,0,0.05)',
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '1.5px solid white',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-family)',
                  fontSize: 11,
                  fontWeight: 'var(--font-weight-bold)',
                  flexShrink: 0,
                }}
              >
                i
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-micro)',
                  lineHeight: 'var(--line-height-micro)',
                  color: 'white',
                }}
              >
                Informação educativa. Não substitui aconselhamento médico
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Camera FAB — white background, blue icon */}
      <button
        type="button"
        onClick={() => navigate(cameraPermitted ? '/scan' : '/camera-permission')}
        style={{
          position: 'absolute',
          bottom: 33,
          right: 36,
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-pill)',
          background: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
          zIndex: 10,
        }}
      >
        <img
          src={iconCamera}
          alt="Câmara"
          style={{
            width: 32,
            height: 32,
            display: 'block',
            filter: 'brightness(0) saturate(100%) invert(21%) sepia(96%) saturate(2935%) hue-rotate(211deg) brightness(96%) contrast(100%)',
          }}
        />
      </button>

      {children}
    </div>
  );
}
