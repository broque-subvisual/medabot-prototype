import { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import { useOnboarding, pickAvatar, BRUNO_PROFILE } from '@/context/OnboardingContext';
import iconSearch from '@/assets/icon-search.svg';
import iconCamera from '@/assets/icon-camera.svg';
import pillSvg from '@/assets/welcome-pill.svg';
import avatarBruno from '@/assets/avatar-male-a.svg';

/**
 * 6.1_Home — Figma node 1028:5712.
 * Blue hero with greeting + search, disclaimer banner, recents section, camera FAB.
 */
const LOGIN_SEED_MEDS = [
  { name: 'Plavix', subtitle: 'Clopidogrel', date: '29/03/2026' },
  { name: 'Losec', subtitle: 'Omeprazol', date: '05/03/2026' },
  { name: 'Brufen e Ben-U-Ron', subtitle: 'Posso tomar brufen e', date: '17/02/2026' },
  { name: 'Clavamox', subtitle: 'Devo tomar o clavamox', date: '22/01/2026' },
  { name: 'Brufen 400', subtitle: 'Ibuprofeno', date: '16/12/2025' },
  { name: 'Cozaar', subtitle: 'Losartan', date: '02/11/2025' },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, update, cameraPermitted, grantCamera, recentMeds, seedRecentMeds, avatarSrc: savedAvatar, setAvatarSrc, savedProfiles } = useOnboarding();

  const locState = location.state as { from?: string } | null;
  const isLoginFlow = locState?.from === 'login';

  /* Seed data when arriving from login flow */
  useEffect(() => {
    if (isLoginFlow) {
      update(BRUNO_PROFILE);
      setAvatarSrc(avatarBruno);
      seedRecentMeds(LOGIN_SEED_MEDS);
      grantCamera();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const firstName = data.name?.split(' ')[0] || 'Utilizador';
  const avatarSrc = useMemo(() => {
    if (savedAvatar) return savedAvatar;
    const usedAvatars = savedProfiles.map((p) => p.avatarSrc);
    const picked = pickAvatar(data.sex, usedAvatars);
    setAvatarSrc(picked);
    return picked;
  }, [data.sex, savedAvatar, setAvatarSrc, savedProfiles]);

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
      {/* Blue hero frame */}
      <div style={{ padding: 'var(--space-2xs)', flexShrink: 0 }}>
        <div
          style={{
            background: 'var(--color-brand-primary)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 'var(--space-2xl)',
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
              top: -13,
              left: -20,
              width: 525,
              height: 525,
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

          {/* NavBar — avatar only */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '0 var(--space-md)',
              width: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              onClick={() => navigate('/profile')}
              role="button"
              tabIndex={0}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <img
                src={avatarSrc}
                alt={`Avatar de ${firstName}`}
                style={{
                  /* SVG viewBox is 64x64 with 10px filter padding — scale up so the 44x44 content fills the container */
                  width: 64,
                  height: 64,
                  margin: -10,
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Greeting + subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              width: '100%',
              padding: '10px 21px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-display)',
                lineHeight: 'var(--line-height-display)',
                color: 'white',
              }}
            >
              Olá, {firstName}
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-title-l)',
                lineHeight: 'var(--line-height-title-l)',
                color: '#b3d4ff',
                maxWidth: 266,
              }}
            >
              O que precisa saber hoje sobre a sua medicação?
            </p>
          </div>

          {/* Search bar */}
          <div
            style={{
              width: '100%',
              padding: '0 var(--space-md)',
              marginTop: 'var(--space-2xl)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              onClick={() => navigate('/search')}
              role="button"
              tabIndex={0}
              style={{
                height: 44,
                width: '100%',
                background: 'var(--color-neutral-surface)',
                border: '1.5px solid var(--color-text-tertiary)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 0 30px 0 rgba(0,0,0,0.05)',
                padding: '0 var(--space-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                cursor: 'text',
              }}
            >
              <img
                src={iconSearch}
                alt=""
                aria-hidden
                style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                Pesquisar medicamento...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer banner — only for new accounts with no activity */}
      {recentMeds.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 var(--space-md)',
            marginTop: 'var(--space-xl)',
          }}
        >
          <div
            style={{
              background: 'var(--color-info-bg)',
              border: '1.5px solid var(--color-info-surface)',
              borderRadius: 'var(--radius-xsm)',
              boxShadow: '0 0 30px 0 rgba(0,0,0,0.05)',
              padding: 'var(--space-xs) var(--space-md)',
              display: 'flex',
              gap: 4,
              alignItems: 'flex-start',
            }}
          >
            <div
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '1.5px solid var(--color-info-text)',
                color: 'var(--color-info-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family)',
                fontSize: 11,
                fontWeight: 'var(--font-weight-bold)',
                flexShrink: 0,
              }}
            >
              i
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-info-text)',
                whiteSpace: 'nowrap',
              }}
            >
              Informação educativa. Não substitui aconselhamento médico.
            </p>
          </div>
        </div>
      )}

      {/* Recents section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          padding: 'var(--space-xl) var(--space-md) 0',
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-title)',
              lineHeight: 'var(--line-height-title)',
              color: 'var(--color-text-primary)',
            }}
          >
            Recentes
          </h2>
        </div>

        {recentMeds.length === 0 ? (
          /* Empty state */
          <div
            style={{
              background: 'var(--color-neutral-background)',
              border: '1px solid var(--color-neutral-border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2xs)',
              paddingTop: 'var(--space-2xs)',
              paddingBottom: 'var(--space-lg)',
            }}
          >
            <div style={{ padding: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3" stroke="var(--color-text-disabled)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-caption)',
                lineHeight: 'var(--line-height-caption)',
                color: 'var(--color-text-disabled)',
                textAlign: 'center',
              }}
            >
              Sem atividade recente
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-text-disabled)',
                textAlign: 'center',
              }}
            >
              Fotografe ou pesquise para começar.
            </p>
          </div>
        ) : (
          /* Recent meds list */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              overflow: 'auto',
            }}
          >
            {recentMeds.map((med) => (
              <button
                key={med.name}
                type="button"
                onClick={() => navigate('/med-info', { state: { medName: med.name, medSubtitle: med.subtitle } })}
                style={{
                  background: 'var(--color-neutral-surface)',
                  minHeight: 64,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 'var(--space-md)',
                  paddingRight: 'var(--space-xs)',
                  paddingTop: 'var(--space-xs)',
                  paddingBottom: 'var(--space-xs)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0px 1px 3px 0px rgba(18,23,71,0.06)',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
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
                    {med.name}
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
                    {med.subtitle} · {med.date}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Camera FAB */}
      <button
        type="button"
        onClick={() => navigate(cameraPermitted ? '/scan' : '/camera-permission')}
        style={{
          position: 'absolute',
          bottom: 33,
          right: 36,
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--color-brand-primary)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
          zIndex: 10,
        }}
      >
        <img
          src={iconCamera}
          alt="Câmara"
          style={{ width: 32, height: 32, display: 'block' }}
        />
      </button>
    </div>
  );
}
