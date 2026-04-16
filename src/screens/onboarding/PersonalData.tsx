import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BlueFrame } from './BlueFrame';
import { OnboardingFooter } from './OnboardingFooter';
import { useOnboarding } from '@/context/OnboardingContext';

/**
 * 5.7_Personal_Data — Figma node 1028:6034 (empty) / 1028:6086 (filled).
 * Step 1/5 do profile setup. Dot 2 active (first blue dot).
 */
interface PersonalDataProps {
  /** Show name field (for add-profile flow) */
  showName?: boolean;
  /** Route after submit (default: /onboarding/allergies) */
  nextRoute?: string;
}

export function PersonalDataScreen({ showName = false, nextRoute = '/onboarding/medication' }: PersonalDataProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnRoute = (location.state as { returnRoute?: string })?.returnRoute;
  const finalRoute = returnRoute ?? nextRoute;
  const { data: ob, update, cancelNewProfile } = useOnboarding();
  const [name, setName] = useState(ob.name);
  const [age, setAge] = useState(ob.age);
  const [weight, setWeight] = useState(ob.weight);
  const [height, setHeight] = useState(ob.height);
  const [sex, setSex] = useState<'M' | 'F' | 'I'>(ob.sex);

  const hasChanges = age !== ob.age || weight !== ob.weight || height !== ob.height || sex !== ob.sex;
  const canSubmit = showName
    ? name.trim() !== ''
    : returnRoute
      ? hasChanges
      : age.trim() !== '' || weight.trim() !== '' || height.trim() !== '';

  const saveAndNavigate = () => {
    update({ name: showName ? name.trim() : ob.name, age, weight, height, sex });
    navigate(finalRoute);
  };

  return (
    <BlueFrame title="Dados Pessoais" onBack={showName ? cancelNewProfile : undefined}>
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
        {/* Form */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
            width: '100%',
          }}
        >
          {showName && (
            <FieldGroup label="Nome">
              <OnboardingInput
                placeholder="Nome do perfil"
                value={name}
                onChange={setName}
              />
            </FieldGroup>
          )}
          <FieldGroup label="Informações básicas">
            <OnboardingInput
              placeholder="A sua idade"
              suffix="anos"
              value={age}
              onChange={(v) => setAge(v.replace(/\D/g, ''))}
              inputMode="numeric"
            />
            <OnboardingInput
              placeholder="O seu peso em kg"
              suffix="Kg"
              value={weight}
              onChange={(v) => setWeight(v.replace(/\D/g, ''))}
              inputMode="numeric"
            />
            <OnboardingInput
              placeholder="A sua altura em cm"
              suffix="cm"
              value={height}
              onChange={(v) => setHeight(v.replace(/\D/g, ''))}
              inputMode="numeric"
            />
          </FieldGroup>

          <FieldGroup label="Sexo Biológico">
            <div
              style={{
                display: 'flex',
                height: 44,
                background: 'var(--color-neutral-surface)',
                border: '1.5px solid var(--color-neutral-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-2xs)',
                gap: 0,
                width: '100%',
              }}
            >
              {(
                [
                  ['M', 'Masculino'],
                  ['F', 'Feminino'],
                  ['I', 'Intersexo'],
                ] as const
              ).map(([value, label]) => {
                const active = sex === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSex(value)}
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
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <p
              style={{
                margin: 0,
                width: '100%',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-text-on-brand)',
              }}
            >
              Receba avisos sobre interações com a sua medicação e alergias.
            </p>
          </FieldGroup>
        </div>

        {/* Footer */}
        <OnboardingFooter
          activeIndex={0}
          totalDots={5}
          canSubmit={canSubmit}
          onNext={saveAndNavigate}
          onSkip={undefined}
          nextLabel={returnRoute ? 'Guardar' : 'Continuar'}
          hideDots={!!returnRoute}
        />
      </div>
    </BlueFrame>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
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
      {children}
    </div>
  );
}

function OnboardingInput({
  placeholder,
  value,
  onChange,
  suffix,
  inputMode,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  inputMode?: 'numeric' | 'text';
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 44,
        background: 'var(--color-neutral-surface)',
        border: focused
          ? '2px solid var(--color-brand-primary)'
          : '1px solid var(--color-text-tertiary)',
        borderRadius: 'var(--radius-md)',
        padding: focused
          ? 'calc(var(--space-xs) - 1px) calc(var(--space-sm) - 1px)'
          : 'var(--space-xs) var(--space-sm)',
        gap: 'var(--space-xs)',
        width: '100%',
        boxShadow: focused ? '0 0 30px 0 rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'border-color 120ms ease-out, box-shadow 120ms ease-out',
      }}
    >
      <input
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-body-m)',
          lineHeight: 'var(--line-height-body-m)',
          color: 'var(--color-text-primary)',
        }}
      />
      {suffix && (
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-body-m)',
            lineHeight: 'var(--line-height-body-m)',
            color: 'var(--color-text-primary)',
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
