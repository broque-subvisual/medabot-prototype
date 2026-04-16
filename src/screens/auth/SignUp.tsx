import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';
import { useOnboarding } from '@/context/OnboardingContext';

/**
 * SignUp screen — Figma frame `2.1_Sign_Up` (node `1028:6480`).
 * Estrutura:
 * - phone-frame bg neutral/background
 * - StatusBar black
 * - Top: NavBar (back + title "Cria Conta") + heading + inputs
 * - Bottom: Criar Conta button (disabled) + footer "Já tem conta criada? / Iniciar Sessão"
 */
export function SignUpScreen() {
  const navigate = useNavigate();
  const { update } = useOnboarding();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const passwordsMatch = password === confirm;
  const showMismatch = confirm !== '' && !passwordsMatch;
  const canSubmit =
    name.trim() !== '' &&
    email.trim() !== '' &&
    password !== '' &&
    confirm !== '' &&
    passwordsMatch;

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

      {/* Screen content */}
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
              Cria Conta
            </h1>
            {/* Right slot — simetria do justify-between */}
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                color: 'var(--color-text-primary)',
                width: '100%',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: 'var(--font-size-display)',
                  lineHeight: 'var(--line-height-display)',
                }}
              >
                Crie a sua conta
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                }}
              >
                Preencha os dados para começar
              </p>
            </div>

            {/* Fields */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
                width: '100%',
              }}
            >
              <Field label="Nome" placeholder="O seu nome" value={name} onChange={setName} />
              <Field
                label="Email"
                placeholder="exemplo@email.com"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <Field
                label="Palavra-passe"
                placeholder="Mínimo 8 caracteres"
                type="password"
                value={password}
                onChange={setPassword}
                invalid={showMismatch}
              />
              <Field
                label="Confirmar palavra-passe"
                placeholder="Repita a palavra-passe"
                type="password"
                value={confirm}
                onChange={setConfirm}
                invalid={showMismatch}
                error={showMismatch ? 'As palavras-passe não coincidem.' : undefined}
              />
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
          {/* Criar Conta — disabled até todos os campos estarem preenchidos */}
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() =>
              canSubmit && (update({ name: name.trim() }), navigate('/sign-up/verification', { state: { email } }))
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
            Criar Conta
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
              Já tem conta criada?
            </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                height: 32,
                padding: 'var(--space-xs)',
                borderRadius: 'var(--radius-xsm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-brand-primary)',
                cursor: 'pointer',
              }}
            >
              Iniciar Sessão
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
  invalid = false,
  error,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  error?: string;
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
          color: invalid ? 'var(--color-danger-text)' : 'var(--color-text-primary)',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`auth-input${invalid ? ' auth-input--error' : ''}`}
      />
      {error && (
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-caption)',
            lineHeight: 'var(--line-height-caption)',
            color: 'var(--color-danger-text)',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
