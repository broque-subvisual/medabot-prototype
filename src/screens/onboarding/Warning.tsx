import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import pillSvg from '@/assets/welcome-pill.svg';
import iconWarning from '@/assets/icon-warning-triangle.svg';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';

/**
 * Warning screen — Figma `5.1_Warning` (1028:5925).
 * Primeiro frame de onboarding. Blue frame + disclaimer médico.
 */
export function WarningScreen() {
  const navigate = useNavigate();

  return (
    <div className="phone-frame" style={{ display: 'flex', flexDirection: 'column' }}>
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
              top: 228,
              bottom: -32,
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

          {/* NavBar — só back */}
          <div
            style={{
              height: 44,
              display: 'flex',
              alignItems: 'center',
              padding: '0 var(--space-md)',
              position: 'relative',
              zIndex: 1,
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
                color: '#ffffff',
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
          </div>

          {/* Content container — Figma 1028:5930: pt 128, pb 64, px 16, justify-between */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4xl) var(--space-md) var(--space-3xl)',
              width: '100%',
              position: 'relative',
              zIndex: 1,
              minHeight: 0,
            }}
          >
            {/* Inner group 1028:5931 — gap 24, items-start */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--space-lg)',
                width: '100%',
              }}
            >
              {/* Icon + title 1028:5932 — items-center */}
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
                    src={iconWarning}
                    alt=""
                    aria-hidden
                    style={{ width: 36, height: 36, display: 'block' }}
                  />
                </div>
                {/* Title wrapper 1028:5934 — px 12, py 4 */}
                <div
                  style={{
                    width: '100%',
                    padding: 'var(--space-2xs) var(--space-sm)',
                  }}
                >
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
                    Aviso importante
                  </h1>
                </div>
              </div>

              {/* Paragraphs 1028:5936 */}
              <div
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: '#b3d4ff',
                  textAlign: 'left',
                }}
              >
                {[
                  'A MedaBot fornece informação geral sobre medicamentos para ajudar a compreender melhor a sua medicação.',
                  'Esta aplicação não substitui aconselhamento médico ou farmacêutico e não recomenda iniciar, parar ou alterar qualquer medicação.',
                  'Em caso de dúvidas sobre a sua saúde, consulte sempre um profissional de saúde.',
                ].map((text) => (
                  <p key={text} style={{ margin: 0 }}>
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* CTA 1028:5937 */}
            <button
              type="button"
              onClick={() => navigate('/onboarding/camera')}
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
              Compreendo e aceito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
