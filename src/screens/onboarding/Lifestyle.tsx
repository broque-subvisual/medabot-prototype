import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BlueFrame } from './BlueFrame';
import { OnboardingFooter } from './OnboardingFooter';
import { useOnboarding } from '@/context/OnboardingContext';

/**
 * 5.13_Lifestyle — Figma 1028:6370. Step 5/5.
 * 4 grupos: Álcool / Tabaco / Atividade física / Suplementos.
 */
interface LifestyleProps {
  nextRoute?: string;
}

export function LifestyleScreen({ nextRoute = '/onboarding/summary' }: LifestyleProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnRoute = (location.state as { returnRoute?: string })?.returnRoute;
  const finalRoute = returnRoute ?? nextRoute;
  const { data: ob, update } = useOnboarding();
  const [alcohol, setAlcohol] = useState(ob.alcohol);
  const [tobacco, setTobacco] = useState(ob.tobacco);
  const [activity, setActivity] = useState(ob.activity);
  const [supplements, setSupplements] = useState(ob.supplements);
  const [suppFocused, setSuppFocused] = useState(false);
  const isMinor = parseInt(ob.age, 10) < 18;
  const hasChanges = alcohol !== ob.alcohol || tobacco !== ob.tobacco || activity !== ob.activity || supplements !== ob.supplements;

  const saveAndNavigate = () => {
    update({ alcohol: isMinor ? '' : alcohol, tobacco: isMinor ? '' : tobacco, activity, supplements });
    navigate(finalRoute);
  };

  return (
    <BlueFrame title="Estilo de vida">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-2xl) var(--space-md) var(--space-3xl)',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
            width: '100%',
          }}
        >
          {!isMinor && (
            <>
              <SegmentGroup
                label="Consumo de álcool"
                options={['Nunca', 'Ocasional', 'Regular', 'Diário']}
                value={alcohol}
                onChange={setAlcohol}
                helper="Estes hábitos influenciam a metabolização de muitos fármacos."
              />
              <SegmentGroup
                label="Consumo de tabaco"
                options={['Não fumo', 'Fumador', 'Ex-fumador']}
                value={tobacco}
                onChange={setTobacco}
              />
            </>
          )}
          <SegmentGroup
            label="Atividade física"
            options={['Sedentário', 'Leve', 'Moderado', 'Intenso']}
            value={activity}
            onChange={setActivity}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2xs)',
              padding: 'var(--space-2xs) 0',
              width: '100%',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-caption)',
                lineHeight: 'var(--line-height-caption)',
                color: 'var(--color-text-on-brand)',
              }}
            >
              Suplementos/ produtos naturais
            </span>
            <input
              type="text"
              placeholder="Ex: Vitamina D, Magnésio..."
              value={supplements}
              onChange={(e) => setSupplements(e.target.value)}
              onFocus={() => setSuppFocused(true)}
              onBlur={() => setSuppFocused(false)}
              style={{
                height: 44,
                width: '100%',
                background: 'var(--color-neutral-surface)',
                border: suppFocused
                  ? '2px solid var(--color-brand-primary)'
                  : '1px solid var(--color-text-tertiary)',
                borderRadius: 'var(--radius-md)',
                boxShadow: suppFocused
                  ? '0 0 30px 0 rgba(0,0,0,0.05)'
                  : 'none',
                padding: suppFocused
                  ? 'calc(var(--space-xs) - 1px) calc(var(--space-sm) - 1px)'
                  : 'var(--space-xs) var(--space-sm)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--font-size-body-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                transition: 'border-color 120ms ease-out, box-shadow 120ms ease-out',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-text-on-brand)',
              }}
            >
              Estes hábitos influenciam a metabolização de muitos fármacos.
            </span>
          </div>
        </div>

        <OnboardingFooter
          activeIndex={4}
          totalDots={5}
          canSubmit={returnRoute ? hasChanges : true}
          onNext={saveAndNavigate}
          onSkip={undefined}
          nextLabel={returnRoute ? 'Guardar' : 'Continuar'}
          hideDots={!!returnRoute}
        />
      </div>
    </BlueFrame>
  );
}

function SegmentGroup({
  label,
  options,
  value,
  onChange,
  helper,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  helper?: string;
}) {
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
      <label
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-caption)',
          lineHeight: 'var(--line-height-caption)',
          color: 'var(--color-text-on-brand)',
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          height: 44,
          background: 'var(--color-neutral-surface)',
          border: '1.5px solid var(--color-neutral-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-2xs)',
          width: '100%',
        }}
      >
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                flex: 1,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: active ? 'var(--color-brand-primary)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--font-size-body-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: active ? 'var(--color-text-on-brand)' : 'var(--color-text-tertiary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {helper && (
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-micro)',
            lineHeight: 'var(--line-height-micro)',
            color: 'var(--color-text-on-brand)',
          }}
        >
          {helper}
        </span>
      )}
    </div>
  );
}
