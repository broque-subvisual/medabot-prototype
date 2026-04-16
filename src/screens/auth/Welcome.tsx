import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import { Button } from '@/components/primitives/Button';
import pillSvg from '@/assets/welcome-pill.svg';

/**
 * Welcome screen — Figma frame `1_Welcome` (1028:5902).
 *
 * Estrutura (do Figma):
 * - Outer wrapper: neutral/background, padding 4 (spacing/2xs)
 * - Blue frame: gradient #0052cc → #0e63e2, radius 55 (radius/lg), shadow-high
 *   - StatusBar (white)
 *   - Hero text centrado: Display "Bem-vindo ao Medabot" + Body M subtitle "#b3d4ff"
 * - CTA section (fora do blue frame, sobre fundo neutral):
 *   - Botão Primary "Criar Conta"
 *   - Botão Secondary "Iniciar Sessão"
 *   - Link Ghost "Continuar como convidado"
 * - HomeBar
 */
interface WelcomeScreenProps {
  children?: React.ReactNode;
}

export function WelcomeScreen({ children }: WelcomeScreenProps = {}) {
  const navigate = useNavigate();

  return (
    <div className="phone-frame" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Outer wrapper com padding spacing/2xs (4px) */}
      <div
        style={{
          flex: 1,
          padding: 'var(--space-2xs)',
          display: 'flex',
          minHeight: 0,
        }}
      >
        {/* Blue frame */}
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(0deg, #0052cc 40%, #0e63e2 100%)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-high)',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 'var(--space-2xl)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Pill decorativa — Figma node 1028:5905.
              Posicionamento stretch: top 228 + bottom -32 (altura derivada do blue frame),
              aspect 1:1 → largura = altura, centrada horizontalmente (+ 5px offset), rotate 90°.
              Fill branco a 8% de opacidade (watermark). */}
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
            <img
              src={pillSvg}
              alt=""
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>

          <StatusBar variant="white" />

          {/* Hero text — centrado vertical e horizontalmente */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 13,
              padding: '0 var(--space-sm)',
              position: 'relative',
              zIndex: 1,
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
              Bem-vindo ao Medabot
            </h1>
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
              Compreender a medicação com confiança.
            </p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div
        style={{
          padding: 'var(--space-lg) var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 7,
          background: 'var(--color-neutral-background)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
            width: '100%',
          }}
        >
          <Button hierarchy="primary" size="xl" fullWidth onClick={() => navigate('/sign-up')}>
            Criar Conta
          </Button>
          <Button hierarchy="secondary" size="xl" fullWidth onClick={() => navigate('/login')}>
            Iniciar Sessão
          </Button>
        </div>
        <Button hierarchy="ghost" onClick={() => navigate('/guest')}>
          Continuar como convidado
        </Button>
      </div>

      {children}
    </div>
  );
}
