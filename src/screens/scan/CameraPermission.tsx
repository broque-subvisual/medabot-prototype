import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import { useOnboarding } from '@/context/OnboardingContext';
import pillSvg from '@/assets/welcome-pill.svg';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';
import iconCamera from '@/assets/icon-camera.svg';

/**
 * 7.1_Camera_Permission — Figma node 1028:5957.
 * Blue frame com ícone câmara + texto + CTA section fora do frame.
 */
export function CameraPermissionScreen() {
  const navigate = useNavigate();
  const { grantCamera } = useOnboarding();

  return (
    <div className="phone-frame" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Blue frame wrapper */}
      <div
        style={{
          flex: 1,
          padding: 'var(--space-2xs)',
          display: 'flex',
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(0deg, #0052cc 40%, #0e63e2 100%)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-high)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Pill watermark */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 183,
              bottom: -77,
              left: 'calc(50% + 5px)',
              aspectRatio: '1 / 1',
              transform: 'translateX(-50%) rotate(90deg)',
              transformOrigin: 'center',
              pointerEvents: 'none',
            }}
          >
            <img src={pillSvg} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          <StatusBar variant="white" />

          {/* NavBar — back only */}
          <div
            style={{
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 var(--space-md)',
              position: 'relative',
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
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
                style={{
                  width: 24,
                  height: 24,
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </button>
            <div style={{ width: 50 }} />
            <div style={{ width: 44, height: 44, opacity: 0 }} aria-hidden />
          </div>

          {/* Content — centrado vertical e horizontalmente */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 13,
                width: '100%',
              }}
            >
              {/* Camera icon */}
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
                  src={iconCamera}
                  alt=""
                  aria-hidden
                  style={{
                    width: 36,
                    height: 36,
                    display: 'block',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </div>

              {/* Title */}
              <div style={{ width: '100%', padding: '0 var(--space-sm)' }}>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--font-size-header)',
                    lineHeight: 'var(--line-height-header)',
                    color: '#ffffff',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  A MedaBot precisa da câmara
                </h1>
              </div>

              {/* Body */}
              <div style={{ width: '100%', padding: '0 var(--space-lg)' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-body-m)',
                    lineHeight: 'var(--line-height-body-m)',
                    color: '#b3d4ff',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  Para identificar medicamentos pela embalagem, a Medabot precisa de acesso à câmara
                  do seu dispositivo. As imagens não serão guardadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section — fora do blue frame */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 7,
          padding: '0 var(--space-md) 36px',
          background: 'var(--color-neutral-background)',
        }}
      >
        <button
          type="button"
          onClick={() => { grantCamera(); navigate('/scan'); }}
          style={{
            height: 56,
            width: '100%',
            background: 'var(--color-brand-primary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-title-m)',
            lineHeight: 'var(--line-height-title-m)',
            color: 'var(--color-text-on-brand)',
            cursor: 'pointer',
          }}
        >
          Permitir acesso
        </button>
        <button
          type="button"
          onClick={() => navigate('/home')}
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
            color: 'var(--color-brand-primary)',
            cursor: 'pointer',
          }}
        >
          Agora não
        </button>
      </div>
    </div>
  );
}
