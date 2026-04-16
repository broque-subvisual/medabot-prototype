import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';

/**
 * Verification screen — Figma `2.3_Sign_Up_Verification` (1028:6584).
 * Reutilizado tbm pelo login (3.3). 6 células para o código.
 */
interface VerificationProps {
  origin?: 'signup' | 'login';
  nextRoute: string;
}

const CODE_LENGTH = 6;

export function VerificationScreen({ origin = 'signup', nextRoute }: VerificationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? 'o seu email';
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const canSubmit = code.every((c) => c !== '');

  const handleChange = (idx: number, value: string) => {
    // Só dígitos, último char
    const digit = value.replace(/\D/g, '').slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[idx] = digit;
      return next;
    });
    if (digit && idx < CODE_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[idx] === '' && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const buttonLabel = origin === 'signup' ? 'Criar Conta' : 'Entrar';

  return (
    <div
      className="phone-frame"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-neutral-background)',
      }}
    >
      <StatusBar variant="black" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: 147,
          width: '100%',
          minHeight: 0,
        }}
      >
        {/* Top block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2xl)',
            width: '100%',
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
              width: '100%',
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
                style={{ width: 24, height: 24, display: 'block' }}
              />
            </button>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-title-m)',
                lineHeight: 'var(--line-height-title-m)',
                color: 'var(--color-text-primary)',
              }}
            >
              Verificação
            </h1>
            <div style={{ width: 44, height: 44 }} aria-hidden />
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              padding: '0 var(--space-md)',
              width: '100%',
            }}
          >
            {/* Heading */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: 'var(--font-size-display)',
                  lineHeight: 'var(--line-height-display)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Verifique o seu email
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Enviámos um código de 6 dígitos para {email}
              </p>
            </div>

            {/* Code cells + resend */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-md)',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-xs)',
                  alignItems: 'center',
                  padding: 10,
                }}
              >
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="code-cell"
                  />
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-caption)',
                    lineHeight: 'var(--line-height-caption)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  O código expira após 10 minutos...
                </span>
                <button
                  type="button"
                  style={{
                    height: 44,
                    padding: 'var(--space-sm)',
                    borderRadius: 'var(--radius-sm)',
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
                  Reenviar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 var(--space-md)',
            width: '100%',
          }}
        >
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => canSubmit && navigate(nextRoute, origin === 'login' ? { state: { from: 'login' } } : undefined)}
            style={{
              height: 56,
              width: '100%',
              background: canSubmit
                ? 'var(--color-brand-primary)'
                : 'var(--color-button-primary-disabled)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-xs)',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-title-m)',
              lineHeight: 'var(--line-height-title-m)',
              color: 'var(--color-text-on-brand)',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'background-color 120ms ease-out',
            }}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
