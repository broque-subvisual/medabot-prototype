import { useNavigate, useLocation } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import pillSvg from '@/assets/welcome-pill.svg';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';
import { useOnboarding } from '@/context/OnboardingContext';

const SEX_LABELS: Record<string, string> = { M: 'Masculino', F: 'Feminino', I: 'Intersexo' };

/**
 * 5.14_Summary — Figma 1028:6433. Resumo do perfil de saúde.
 * White screen, blue pill watermark, NavBar com botão "Editar" no canto.
 */
interface SummaryProps {
  doneRoute?: string;
}

export function SummaryScreen({ doneRoute = '/home' }: SummaryProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { data, shelveAndReset } = useOnboarding();

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
            background: 'var(--color-neutral-background)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Pill watermark — faint blue */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 183,
              bottom: -77,
              left: 'calc(50% + 5px)',
              aspectRatio: '1 / 1',
              transform: 'translateX(-50%) rotate(90deg)',
              transformOrigin: 'center',
              pointerEvents: 'none',
              opacity: 0.06,
            }}
          >
            <img src={pillSvg} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          <StatusBar variant="black" />

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
              Resumo
            </h1>
            <div style={{ width: 44 }} aria-hidden />
          </div>

          {/* Scroll content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'var(--space-lg) var(--space-md) var(--space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              position: 'relative',
              zIndex: 1,
              minHeight: 0,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-header)',
                lineHeight: 'var(--font-size-header)',
                color: 'var(--color-text-primary)',
              }}
            >
              Perfil de Saúde
            </h2>

            {/* Disclaimer banner */}
            <div
              style={{
                background: 'var(--color-info-bg)',
                border: '1.5px solid var(--color-info-surface)',
                borderRadius: 'var(--radius-xsm)',
                boxShadow: '0 0 30px 0 rgba(0,0,0,0.05)',
                padding: 'var(--space-xs) var(--space-md)',
                display: 'flex',
                gap: 4,
                width: '100%',
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
                  flex: 1,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-micro)',
                  lineHeight: 'var(--line-height-micro)',
                  color: 'var(--color-info-text)',
                }}
              >
                Os seus dados serão encriptados e armazenados de forma segura. Pode editá-los ou apagá-los a qualquer momento.
              </p>
            </div>

            <Section label="Dados pessoais" onEdit={() => navigate('/onboarding/profile-form', { state: { returnRoute: currentPath } })}>
              <KeyValueCard
                rows={[
                  ...(data.name ? [['Nome', data.name] as [string, string]] : []),
                  ['Idade', data.age ? `${data.age} anos` : '-'],
                  ['Sexo', SEX_LABELS[data.sex] ?? '-'],
                  ['Peso', data.weight ? `${data.weight} Kg` : '-'],
                  ['Altura', data.height ? `${data.height} cm` : '-'],
                ]}
              />
            </Section>

            <Section label="Medicação" onEdit={() => navigate('/onboarding/medication', { state: { returnRoute: currentPath } })}>
              {data.meds.length > 0 ? (
                <KeyValueCard
                  rows={data.meds.map((m) => [m.name, [m.dosage, m.frequency].filter(Boolean).join(' · ')])}

                />
              ) : (
                <KeyValueCard rows={[['Nenhuma medicação', '']]} />
              )}
            </Section>

            <Section label="Alergias" onEdit={() => navigate('/onboarding/allergies', { state: { returnRoute: currentPath } })}>
              {data.allergies.length > 0 ? (
                <ChipRow chips={data.allergies} />
              ) : (
                <KeyValueCard rows={[['Nenhuma alergia', '']]} />
              )}
            </Section>

            <Section label="Condições" onEdit={() => navigate('/onboarding/conditions', { state: { returnRoute: currentPath } })}>
              {data.conditions.length > 0 ? (
                <ChipRow chips={data.conditions} />
              ) : (
                <KeyValueCard rows={[['Nenhuma condição', '']]} />
              )}
            </Section>

            <Section label="Estilo de vida" onEdit={() => navigate('/onboarding/lifestyle', { state: { returnRoute: currentPath } })}>
              <KeyValueCard
                rows={[
                  ['Álcool', data.alcohol],
                  ['Tabaco', data.tobacco],
                  ['Exercício', data.activity],
                  ['Suplementos', data.supplements || '-'],
                ]}
              />
            </Section>
          </div>

          {/* CTA */}
          <div
            style={{
              padding: '0 var(--space-md) var(--space-3xl)',
              width: '100%',
              position: 'relative',
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => { shelveAndReset(); navigate(doneRoute); }}
              style={{
                height: 56,
                width: '100%',
                background: 'var(--color-brand-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-title-m)',
                lineHeight: 'var(--line-height-title-m)',
                color: 'var(--color-text-on-brand)',
                cursor: 'pointer',
              }}
            >
              Concluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, onEdit, children }: { label: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
        padding: 'var(--space-2xs) 0',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-caption)',
            lineHeight: 'var(--line-height-caption)',
            color: 'var(--color-text-primary)',
          }}
        >
          {label}
        </span>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: 'var(--font-size-micro)',
              lineHeight: 'var(--line-height-micro)',
              color: 'var(--color-brand-primary)',
              cursor: 'pointer',
            }}
          >
            Editar
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function KeyValueCard({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div
      style={{
        background: 'var(--color-brand-primary-light)',
        borderRadius: 'var(--radius-md)',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {rows.map(([k, v], i) => (
        <div key={k}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 44,
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-body-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <span>{k}</span>
            <span>{v}</span>
          </div>
          {i < rows.length - 1 && (
            <div style={{ height: 1, width: '100%', background: 'var(--color-neutral-background)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

function ChipRow({ chips }: { chips: string[] }) {
  return (
    <div
      style={{
        background: 'var(--color-brand-primary-light)',
        borderRadius: 'var(--radius-md)',
        minHeight: 44,
        padding: 'var(--space-2xs) var(--space-xs)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--space-xs)',
        width: '100%',
      }}
    >
      {chips.map((c) => (
        <span
          key={c}
          style={{
            height: 32,
            padding: 'var(--space-xs)',
            background: 'var(--color-button-secondary-pressed)',
            border: '1.5px solid var(--color-brand-primary)',
            borderRadius: 'var(--radius-xsm)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-micro)',
            lineHeight: 'var(--line-height-micro)',
            color: 'var(--color-brand-primary)',
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
