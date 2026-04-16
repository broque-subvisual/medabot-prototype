import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';
import scanBg from '@/assets/scan-brufen.jpg';

/**
 * 7.2_Scan — Figma node 1028:6683.
 * Dark background, viewfinder rectangle, blue bottom panel with camera controls.
 */
export function ScanScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="phone-frame"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Camera feed simulation */}
      <img
        src={scanBg}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center top',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <StatusBar variant="white" />
      </div>

      {/* Screen content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top: NavBar + viewfinder */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3xl)',
            paddingBottom: 'var(--space-3xl)',
            minHeight: 0,
          }}
        >
          {/* NavBar */}
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
                style={{
                  width: 24,
                  height: 24,
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </button>
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-title-m)',
                lineHeight: 'var(--line-height-title-m)',
                color: 'var(--color-text-on-brand)',
              }}
            >
              Identificar medicamento
            </span>
            <div style={{ width: 44, height: 44, opacity: 0 }} aria-hidden />
          </div>

          {/* Viewfinder */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
            }}
          >
            <div
              style={{
                width: 270,
                height: 200,
                border: '2px solid #e0e0e0',
                borderRadius: 8,
                background: 'rgba(179,179,179,0)',
              }}
            />
          </div>
        </div>

        {/* Blue bottom panel */}
        <div
          style={{
            height: 255,
            width: '100%',
            background: 'linear-gradient(0deg, #0052cc 40%, #0e63e2 100%)',
            borderTopLeftRadius: 'var(--radius-lg)',
            borderTopRightRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-high)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-lg)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* Instruction text */}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-body-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: '#b3d4ff',
              textAlign: 'center',
              padding: '0 var(--space-lg)',
            }}
          >
            Aponte para o rótulo do medicamento.
          </p>

          {/* Camera controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 83,
              width: 353,
            }}
          >
            {/* Gallery button */}
            <button
              type="button"
              style={{
                width: 56,
                height: 56,
                background: 'var(--color-text-on-brand)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="var(--color-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="var(--color-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 15L16 10L5 21" stroke="var(--color-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Shutter button */}
            <button
              type="button"
              onClick={() => navigate('/identify')}
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: 'transparent',
                border: '4px solid #ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#ffffff',
                }}
              />
            </button>

            {/* Flash placeholder */}
            <div style={{ width: 52, height: 52 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
