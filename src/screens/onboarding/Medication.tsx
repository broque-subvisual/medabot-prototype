import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BlueFrame } from './BlueFrame';
import { OnboardingFooter } from './OnboardingFooter';
import { AddMedOverlay, type MedDraft } from '@/components/overlays/AddMedOverlay';
import { useOnboarding } from '@/context/OnboardingContext';
import iconPlus from '@/assets/icon-plus.svg';
import iconTrash from '@/assets/icon-trash-red.svg';

/**
 * 5.9_Medication — Figma node 1028:6138 (empty) / 1028:6182 (filled).
 * Step 1/5 do profile setup. Dot 1 active (primeiro slot).
 */
interface MedicationProps {
  nextRoute?: string;
}

export function MedicationScreen({ nextRoute = '/onboarding/allergies' }: MedicationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnRoute = (location.state as { returnRoute?: string })?.returnRoute;
  const finalRoute = returnRoute ?? nextRoute;
  const { data: ob, update } = useOnboarding();
  const [meds, setMeds] = useState<MedDraft[]>(ob.meds);
  const [showAddMed, setShowAddMed] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const initialMeds = useRef(ob.meds);
  const medsChanged = JSON.stringify(meds) !== JSON.stringify(initialMeds.current);
  const canSubmit = returnRoute ? medsChanged : true;

  return (
    <BlueFrame title="Medicação">
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
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2xl)',
            width: '100%',
          }}
        >
          {/* Heading */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              color: 'var(--color-text-on-brand)',
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-header)',
                lineHeight: 'var(--font-size-header)',
              }}
            >
              Personalize a sua experiência
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--font-size-body-m)',
                lineHeight: 'var(--line-height-body-m)',
              }}
            >
              Adicione os seus medicamentos atuais para que as respostas sejam mais precisas para o
              seu caso.
            </p>
          </div>

          {/* Add button + list + helper */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xl)',
              width: '100%',
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
              {meds.map((med, i) => (
                <div
                  key={i}
                  style={{
                    minHeight: 64,
                    width: '100%',
                    background: 'var(--color-neutral-surface)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    boxShadow: '0px 1px 3px 0px rgba(18, 23, 71, 0.06)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  <div
                    onClick={() => setEditIndex(i)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      justifyContent: 'center',
                      cursor: 'pointer',
                      minWidth: 0,
                    }}
                  >
                  <span
                    style={{
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
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-caption)',
                      lineHeight: 'var(--line-height-caption)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {med.dosage} · {med.frequency.replace('\n', ' ')}
                  </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setMeds(meds.filter((_, j) => j !== i)); }}
                    aria-label="Apagar medicamento"
                    style={{
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <img src={iconTrash} alt="" style={{ width: 18, height: 18, display: 'block' }} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setShowAddMed(true)}
                style={{
                  height: 46,
                  width: '100%',
                  background: 'var(--color-neutral-surface)',
                  border: '1.5px solid var(--color-brand-primary)',
                  borderRadius: 'var(--radius-xsm)',
                  padding: 'var(--space-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-xs)',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={iconPlus}
                  alt=""
                  aria-hidden
                  style={{ width: 16, height: 16, display: 'block' }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-micro)',
                    lineHeight: 'var(--line-height-micro)',
                    color: 'var(--color-brand-primary)',
                  }}
                >
                  Adicionar medicamento
                </span>
              </button>
            </div>
            <p
              style={{
                margin: 0,
                padding: 'var(--space-2xs) 0',
                width: '100%',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-text-on-brand)',
              }}
            >
              Pode atualizar o seu perfil a qualquer altura na sua area pessoal.
            </p>
          </div>
        </div>

        <OnboardingFooter
          activeIndex={1}
          totalDots={5}
          canSubmit={canSubmit}
          onNext={() => { update({ meds }); navigate(finalRoute); }}
          onSkip={undefined}
          nextLabel={returnRoute ? 'Guardar' : 'Continuar'}
          hideDots={!!returnRoute}
        />
      </div>
      {showAddMed && (
        <AddMedOverlay
          onClose={() => setShowAddMed(false)}
          onSave={(med) => {
            setMeds([...meds, med]);
            setShowAddMed(false);
          }}
        />
      )}
      {editIndex !== null && (
        <AddMedOverlay
          initial={meds[editIndex]}
          onClose={() => setEditIndex(null)}
          onSave={(med) => {
            const next = [...meds];
            next[editIndex] = med;
            setMeds(next);
            setEditIndex(null);
          }}
        />
      )}
    </BlueFrame>
  );
}
