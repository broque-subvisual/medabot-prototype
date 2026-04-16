import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import { useOnboarding, pickAvatar } from '@/context/OnboardingContext';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';
import iconChevronRight from '@/assets/icon-chevron-right.svg';
import iconPlus from '@/assets/icon-plus.svg';
import pillSvg from '@/assets/welcome-pill.svg';

/**
 * Profile & Settings screen.
 * Three sections: Perfil de Saúde (per-profile), Conta (account-level), Suporte.
 */
export function ProfileScreen() {
  const navigate = useNavigate();
  const { data, avatarSrc: savedAvatar, setAvatarSrc, startNewProfile, savedProfiles, loadProfile } = useOnboarding();

  const avatarSrc = useMemo(() => {
    if (savedAvatar) return savedAvatar;
    const usedAvatars = savedProfiles.map((p) => p.avatarSrc);
    const picked = pickAvatar(data.sex, usedAvatars);
    setAvatarSrc(picked);
    return picked;
  }, [data.sex, savedAvatar, setAvatarSrc, savedProfiles]);

  /* Stable ordering: track profile names in creation order so avatars don't jump */
  const stableOrder = useRef<string[]>([]);
  const activeName = data.name || 'Principal';

  // Ensure all known profiles are in the stable list (append-only)
  if (!stableOrder.current.includes(activeName)) {
    stableOrder.current.push(activeName);
  }
  for (const p of savedProfiles) {
    if (!stableOrder.current.includes(p.name)) {
      stableOrder.current.push(p.name);
    }
  }

  // Build render list in stable creation order
  const allProfiles = stableOrder.current.map((name) => {
    if (name === activeName) {
      return { name, avatarSrc, isActive: true, savedIndex: -1 };
    }
    const idx = savedProfiles.findIndex((p) => p.name === name);
    if (idx >= 0) {
      return { name, avatarSrc: savedProfiles[idx].avatarSrc, isActive: false, savedIndex: idx };
    }
    return null;
  }).filter((p): p is NonNullable<typeof p> => p !== null);

  const goToEdit = (route: string) => {
    navigate(route, { state: { returnRoute: '/profile' } });
  };

  const profileRows = [
    { label: 'Dados pessoais', onClick: () => goToEdit('/onboarding/profile-form') },
    { label: 'Medicação', onClick: () => goToEdit('/onboarding/medication') },
    { label: 'Alergias', onClick: () => goToEdit('/onboarding/allergies') },
    { label: 'Condições de saúde', onClick: () => goToEdit('/onboarding/conditions') },
    { label: 'Estilo de vida', onClick: () => goToEdit('/onboarding/lifestyle') },
  ];

  const accountRows = [
    { label: 'Email' },
    { label: 'Palavra-passe' },
  ];

  const supportRows = [
    { label: 'Sobre a aplicação' },
    { label: 'Ajuda' },
  ];

  return (
    <div
      className="phone-frame"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-neutral-background)',
        overflow: 'hidden',
      }}
    >
      {/* Full-height blue frame */}
      <div style={{ padding: 'var(--space-2xs)', flex: 1, display: 'flex', minHeight: 0 }}>
        <div
          style={{
            background: 'var(--color-brand-primary)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0px 16px 32px 0px rgba(0,0,0,0.12)',
          }}
        >
          {/* Pill watermark */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -22,
              right: -36,
              width: 421,
              height: 421,
              pointerEvents: 'none',
              opacity: 0.12,
            }}
          >
            <img
              src={pillSvg}
              alt=""
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>

          <StatusBar variant="white" />

          {/* NavBar: back + title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 var(--space-md)',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
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

            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={avatarSrc}
                alt="Avatar"
                style={{
                  width: 46,
                  height: 46,
                  margin: -7,
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Profile selector row — fixed, not scrollable */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-md)',
              padding: 'var(--space-sm) var(--space-md) var(--space-xs)',
              overflowX: 'auto',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Add profile button */}
            <button
              type="button"
              onClick={() => { startNewProfile(); navigate('/profile/personal-data'); }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2xs)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-pill)',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={iconPlus}
                  alt=""
                  style={{
                    width: 16,
                    height: 16,
                    display: 'block',
                    '--fill-0': 'var(--color-brand-primary)',
                  } as React.CSSProperties}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-micro)',
                  lineHeight: 'var(--line-height-micro)',
                  color: 'white',
                }}
              >
                Adicionar
              </span>
            </button>

            {/* All profiles in stable creation order */}
            {allProfiles.map((p) => (
              <ProfileAvatar
                key={p.name}
                name={p.name}
                src={p.avatarSrc}
                active={p.isActive}
                onClick={() => {
                  if (!p.isActive && p.savedIndex >= 0) {
                    loadProfile(p.savedIndex);
                  }
                }}
              />
            ))}
          </div>

          {/* Scrollable content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              overflow: 'visible',
              padding: 'var(--space-xs) var(--space-md) var(--space-2xl)',
              position: 'relative',
              zIndex: 1,
              minHeight: 0,
            }}
          >
            {/* Perfil de Saúde — changes per selected profile */}
            <SettingsSection
              title={`Perfil de ${activeName}`}
              rows={profileRows}
            />

            {/* Conta */}
            <SettingsSection title="Conta" rows={accountRows} />

            {/* Suporte e informação */}
            <SettingsSection title="Suporte e informação" rows={supportRows} />

            {/* Terminar sessão button */}
            <button
              type="button"
              onClick={() => navigate('/welcome')}
              style={{
                width: '100%',
                height: 44,
                background: 'var(--color-danger-bg, #fef2f2)',
                border: '1.5px solid var(--color-danger-text, #991b1b)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                cursor: 'pointer',
                padding: 'var(--space-sm)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-danger-text, #991b1b)',
                }}
              >
                Terminar sessão
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileAvatar({
  name,
  src,
  active,
  onClick,
}: {
  name: string;
  src: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-2xs)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: active
            ? '0 0 0 2.5px white, 0 0 10px rgba(0,0,0,0.25)'
            : '0px 0px 10px 0px rgba(0,0,0,0.25)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <img
          src={src}
          alt={name}
          style={{
            width: 50,
            height: 50,
            margin: -7,
            display: 'block',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: active ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-micro)',
          lineHeight: 'var(--line-height-micro)',
          color: 'white',
          maxWidth: 56,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {name}
      </span>
    </button>
  );
}

function SettingsSection({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; onClick?: () => void }[];
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'var(--font-size-title-m)',
          lineHeight: 'var(--line-height-title-m)',
          color: 'white',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          background: 'var(--color-neutral-surface)',
          border: '1.5px solid var(--color-text-tertiary)',
          borderRadius: 'var(--radius-md)',
          padding: '0 10px',
        }}
      >
        {rows.map((row, i) => (
          <div key={row.label} onClick={row.onClick} style={{ cursor: row.onClick ? 'pointer' : 'default' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 44,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {row.label}
              </span>
              <div
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
                  src={iconChevronRight}
                  alt=""
                  style={{
                    width: 16,
                    height: 16,
                    display: 'block',
                    '--fill-0': 'var(--color-text-secondary)',
                  } as React.CSSProperties}
                />
              </div>
            </div>
            {i < rows.length - 1 && (
              <div
                style={{
                  height: 1,
                  background: '#e0e0e0',
                  width: '100%',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
