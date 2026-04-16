import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';

/**
 * Login screen — Figma frame `3.1_Login` (node 1028:6509).
 * Email + password fields, forgot password link, disabled submit button,
 * footer with "Não tem conta? / Criar Conta".
 */
export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = email.trim() !== '' && password !== '';

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
          paddingBottom: 65,
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
              Iniciar Sessão
            </h1>
            <div style={{ width: 44, height: 44 }} aria-hidden />
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xl)',
              padding: '0 var(--space-md)',
              width: '100%',
            }}
          >
            {/* Heading */}
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
              Inicie a sua sessão
            </p>

            {/* Fields + forgot password */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-sm)',
                  width: '100%',
                }}
              >
                <Field
                  label="Email"
                  placeholder="exemplo@email.com"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
                <Field
                  label="Palavra-passe"
                  placeholder="Introduza a palavra-passe"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
              </div>

              {/* Forgot password */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <button
                  type="button"
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
                  Esqueceu a palavra-passe?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
            padding: '0 var(--space-md)',
            width: '100%',
          }}
        >
          {/* Iniciar Sessão button */}
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() =>
              canSubmit &&
              navigate('/login/verification', { state: { email } })
            }
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
            Iniciar Sessão
          </button>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 52,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-caption)',
                lineHeight: 'var(--line-height-caption)',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
              }}
            >
              Não tem conta criada?
            </span>
            <button
              type="button"
              onClick={() => navigate('/sign-up')}
              style={{
                height: 32,
                padding: 'var(--space-xs)',
                borderRadius: 'var(--radius-xsm)',
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
              Criar Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
        width: '100%',
      }}
    >
      <label
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-caption)',
          lineHeight: 'var(--line-height-caption)',
          color: 'var(--color-text-primary)',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="auth-input"
      />
    </div>
  );
}
