import { useNavigate } from 'react-router-dom';
import { BlueFrame } from './BlueFrame';
import iconLock from '@/assets/icon-lock.svg';
import iconShield from '@/assets/icon-shield.svg';
import iconSettings from '@/assets/icon-settings.svg';

/**
 * 5.6_Health_Profile_Intro — Figma node 1028:6005.
 * Estrutura: intro text + 3 benefit rows + Começar button.
 * Container pt-128 pb-64 px-16 justify-between.
 */
export function HealthProfileIntroScreen() {
  const navigate = useNavigate();

  return (
    <BlueFrame>
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
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2xl)',
            width: '100%',
          }}
        >
          <p
            style={{
              margin: 0,
              width: '100%',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-body-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: 'var(--color-text-on-brand)',
            }}
          >
            Preencha os seu dados para receber respostas mais precisas e alertas de segurança
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2xl)',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <BenefitRow
              icon={iconLock}
              title="Dados encriptados"
              subtitle="As suas informações são armazenadas de forma segura e nunca partilhadas."
            />
            <BenefitRow
              icon={iconShield}
              title="Alertas inteligentes"
              subtitle="Receba avisos sobre interações com a sua medicação e alergias."
            />
            <BenefitRow
              icon={iconSettings}
              title="Controlo total"
              subtitle="Pode editar ou apagar os seus dados a qualquer momento."
            />
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => navigate('/onboarding/profile-form')}
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
          Começar
        </button>
      </div>
    </BlueFrame>
  );
}

function BenefitRow({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-xs)',
        alignItems: 'center',
        height: 54,
        width: '100%',
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
        <img
          src={icon}
          alt=""
          aria-hidden
          style={{
            width: 24,
            height: 24,
            display: 'block',
            filter: 'brightness(0) invert(1)',
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 0,
          color: 'var(--color-text-on-brand)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-body-m)',
            lineHeight: 'var(--line-height-body-m)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-caption)',
            lineHeight: 'var(--line-height-caption)',
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}
