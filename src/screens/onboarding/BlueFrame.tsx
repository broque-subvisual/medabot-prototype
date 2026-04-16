import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import pillSvg from '@/assets/welcome-pill.svg';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';

/**
 * BlueFrame — shared onboarding blue frame shell
 * (pill watermark, StatusBar white, NavBar com back).
 * Usado por 5.1–5.6.
 */
interface BlueFrameProps {
  children: ReactNode;
  showBack?: boolean;
  title?: string;
  onBack?: () => void;
}

export function BlueFrame({ children, showBack = true, title, onBack }: BlueFrameProps) {
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

          {/* NavBar */}
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
            {showBack ? (
              <button
                type="button"
                onClick={() => { onBack?.(); navigate(-1); }}
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
            ) : (
              <div style={{ width: 44, height: 44 }} aria-hidden />
            )}
            {title && (
              <h1
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-title-m)',
                  lineHeight: 'var(--line-height-title-m)',
                  color: 'var(--color-text-on-brand)',
                }}
              >
                {title}
              </h1>
            )}
            <div style={{ width: 44, height: 44 }} aria-hidden />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
