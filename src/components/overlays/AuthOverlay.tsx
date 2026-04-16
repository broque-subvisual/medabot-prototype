import { useNavigate } from 'react-router-dom';
import iconApple from '@/assets/icon-apple.svg';
import iconGoogle from '@/assets/icon-google.svg';
import iconFacebookOuter from '@/assets/icon-facebook-outer.svg';
import iconFacebookInner from '@/assets/icon-facebook-inner.svg';
import iconX from '@/assets/icon-x.svg';

/**
 * AuthOverlay — bottom sheet auth, Figma nodes `1028:8081` (login) e `1028:8082` (signup).
 * Ambos os overlays são visualmente idênticos excepto no título.
 *
 * Estrutura:
 * - Container bg brand/primary, radius-md top, pb spacing/xl
 * - Header: grab handle centro, X close direita, slot vazio 44×44 esquerda
 * - Body gap 24 px 16: Título Title M + lista de opções (3 SocialButton + divisor "ou" + e-mail)
 */
interface AuthOverlayProps {
  title: string;
  /** Rota para onde avança o "Continuar com e-mail" */
  emailRoute: string;
  /** Rota ao fechar o overlay (default: /welcome) */
  dismissRoute?: string;
  /** Rota para os botões sociais (default: /onboarding) */
  socialRoute?: string;
  /** State para passar na navegação dos botões sociais */
  socialState?: Record<string, unknown>;
}

export function AuthOverlay({ title, emailRoute, dismissRoute = '/welcome', socialRoute = '/onboarding', socialState }: AuthOverlayProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop: Figma prototype interaction — FFFFFF 80%, fecha ao clicar fora. */}
      <div
        onClick={() => navigate(dismissRoute)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9,
          animation: 'overlay-backdrop-fade 300ms ease-in',
        }}
      />
      <div
      style={{
        /* Figma: w=385 h=400. Encaixa na área útil do phone (393−8 padding externo = 385). */
        position: 'absolute',
        left: 'var(--space-2xs)',
        right: 'var(--space-2xs)',
        bottom: 0,
        height: 400,
        background: 'var(--color-brand-primary)',
        borderTopLeftRadius: 'var(--radius-md)',
        borderTopRightRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        animation: 'overlay-slide-up 300ms ease-in',
      }}
    >
      {/* Header — grab handle + close */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        {/* Slot esquerdo (opacity 0 no Figma, mantém simetria do justify-between) */}
        <div style={{ width: 44, height: 44, flexShrink: 0 }} />
        {/* Grab handle */}
        <div style={{ paddingTop: 'var(--space-xs)' }}>
          <div
            style={{
              width: 85,
              height: 5,
              background: 'rgba(255,255,255,0.3)',
              borderRadius: 'var(--radius-pill)',
            }}
          />
        </div>
        {/* Close button */}
        <button
          type="button"
          onClick={() => navigate(dismissRoute)}
          aria-label="Fechar"
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={iconX} alt="" style={{ width: '100%', height: '100%' }} />
          </span>
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
          padding: '0 var(--space-md)',
          width: '100%',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-title-m)',
            lineHeight: 'var(--line-height-title-m)',
            color: 'var(--color-text-on-brand)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {title}
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)',
            width: '100%',
          }}
        >
          <SocialButton icon={<img src={iconApple} alt="" style={{ height: '100%' }} />} label="Continuar com a Apple" onClick={() => navigate(socialRoute, socialState ? { state: socialState } : undefined)} />
          <SocialButton icon={<img src={iconGoogle} alt="" style={{ width: '100%', height: '100%' }} />} label="Continuar com o Google" onClick={() => navigate(socialRoute, socialState ? { state: socialState } : undefined)} />
          <SocialButton icon={<FacebookIcon />} label="Continuar com o Facebook" onClick={() => navigate(socialRoute, socialState ? { state: socialState } : undefined)} />

          {/* Divisor "ou" */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-xs)',
              padding: '0 10px',
              width: '100%',
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'var(--color-text-on-brand)' }} />
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-caption)',
                lineHeight: 'var(--line-height-caption)',
                color: 'var(--color-text-on-brand)',
                whiteSpace: 'nowrap',
              }}
            >
              ou
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-text-on-brand)' }} />
          </div>

          {/* Continuar com e-mail */}
          <button
            type="button"
            onClick={() => navigate(emailRoute)}
            style={{
              height: 44,
              width: '100%',
              background: 'var(--color-brand-primary-light)',
              border: '1.5px solid var(--color-brand-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-xs)',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-body-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: 'var(--color-brand-primary)',
              cursor: 'pointer',
            }}
          >
            Continuar com e-mail
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 56,
        width: '100%',
        background: 'var(--color-neutral-surface)',
        border: '1.5px solid var(--color-neutral-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '16px var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--radius-xsm)',
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-body-l)',
            lineHeight: 'var(--line-height-body-l)',
            color: 'var(--color-brand-primary)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}

/** Facebook logo: círculo azul (outer) + "f" branco (inner). Posições do Figma. */
function FacebookIcon() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img
        src={iconFacebookOuter}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <img
        src={iconFacebookInner}
        alt=""
        style={{
          position: 'absolute',
          left: '27.61%',
          top: '4.44px',
          width: '45.59%',
          height: 'auto',
        }}
      />
    </div>
  );
}
