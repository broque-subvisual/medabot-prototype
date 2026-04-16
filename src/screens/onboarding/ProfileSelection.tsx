import { useNavigate } from 'react-router-dom';
import { BlueFrame } from './BlueFrame';
import iconPerson from '@/assets/icon-person.svg';
import iconUsers from '@/assets/icon-users.svg';

/**
 * 5.5_Profile_Selection — Figma node 1028:6467.
 * Estrutura:
 * - Blue frame com gap-48 pb-48
 * - NavBar (back)
 * - "Para quem é este perfil?" Header 24
 * - 2 cards: "Para mim" / "Para outra pessoa"
 */
export function ProfileSelectionScreen() {
  const navigate = useNavigate();

  return (
    <BlueFrame>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2xl)',
          padding: 'var(--space-2xl) var(--space-md)',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        {/* Heading */}
        <div style={{ width: '100%' }}>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--font-size-header)',
              lineHeight: 'var(--font-size-header)',
              color: '#ffffff',
            }}
          >
            Para quem é este perfil?
          </h1>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
            width: '100%',
          }}
        >
          <ProfileCard
            icon={iconPerson}
            title="Para mim"
            subtitle="O meu perfil pessoal"
            onClick={() => navigate('/onboarding/profile-intro')}
          />
          <ProfileCard
            icon={iconUsers}
            title="Para outra pessoa"
            subtitle="Filho/a, pai/mãe, parceiro/a ou outro"
            onClick={() => navigate('/onboarding/profile-intro')}
          />
        </div>
      </div>
    </BlueFrame>
  );
}

function ProfileCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 64,
        width: '100%',
        background: 'var(--color-neutral-surface)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        cursor: 'pointer',
        boxShadow: '0px 1px 3px 0px rgba(18, 23, 71, 0.06)',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          padding: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img src={icon} alt="" aria-hidden style={{ width: 24, height: 24, display: 'block' }} />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-body-l)',
            lineHeight: 'var(--line-height-body-l)',
            color: 'var(--color-text-primary)',
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
            color: 'var(--color-text-secondary)',
          }}
        >
          {subtitle}
        </span>
      </div>
    </button>
  );
}
