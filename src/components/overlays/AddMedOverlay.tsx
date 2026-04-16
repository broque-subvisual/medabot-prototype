import { useState } from 'react';
import iconX from '@/assets/icon-x.svg';

/**
 * AddMedOverlay — Figma `add_Med` (1028:8344).
 * Bottom sheet azul para adicionar medicamento.
 * Aparece sobre o frame 5.9 Medication.
 */
export interface MedDraft {
  name: string;
  dosage: string;
  frequency: string;
}

interface AddMedOverlayProps {
  onClose: () => void;
  onSave: (med: MedDraft) => void;
  onDelete?: () => void;
  initial?: MedDraft;
}

const FREQUENCIES = ['1x/dia', '2x/dia', '3x/dia', 'Conforme\nnecessário'];

export function AddMedOverlay({ onClose, onSave, onDelete, initial }: AddMedOverlayProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [dosage, setDosage] = useState(initial?.dosage ?? '');
  const [frequency, setFrequency] = useState(initial?.frequency ?? '');

  const canSave = name.trim() !== '';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.5)',
          zIndex: 9,
          animation: 'overlay-backdrop-fade 300ms ease-in',
        }}
      />
      {/* Sheet */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--color-brand-primary)',
          borderTopLeftRadius: 'var(--radius-md)',
          borderTopRightRadius: 'var(--radius-md)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingBottom: 'var(--space-md)',
          zIndex: 10,
          animation: 'overlay-slide-up 300ms ease-in',
        }}
      >
        {/* Header bar: empty 44 + grab handle + close */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ width: 44, height: 44, opacity: 0 }} aria-hidden />
          <div
            style={{
              paddingTop: 'var(--space-xs)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 85,
                height: 5,
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.3)',
              }}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <img
              src={iconX}
              alt=""
              style={{
                width: 16,
                height: 16,
                display: 'block',
                filter: 'brightness(0) invert(1)',
              }}
            />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
            padding: '0 var(--space-md)',
            width: '100%',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family)',
              fontWeight: 600,
              fontSize: 17,
              color: 'var(--color-text-on-brand)',
              textAlign: 'center',
              width: '100%',
            }}
          >
            {initial ? 'Editar Medicamento' : 'Adicionar Medicamento'}
          </p>

          <FieldWithLabel label="Nome do medicamento">
            <SheetInput
              placeholder="Ex: Brufen"
              value={name}
              onChange={setName}
            />
          </FieldWithLabel>

          <FieldWithLabel label="Dosagem">
            <SheetInput
              placeholder="Ex: 400mg"
              value={dosage}
              onChange={setDosage}
            />
          </FieldWithLabel>

          <FieldWithLabel label="Frequência">
            <div style={{ display: 'flex', gap: 4, width: '100%' }}>
              {FREQUENCIES.map((f) => {
                const active = frequency === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    style={{
                      flex: 1,
                      height: 44,
                      padding: 'var(--space-sm)',
                      background: active ? '#c0d4f7' : 'var(--color-neutral-surface)',
                      border: '1.5px solid var(--color-brand-primary)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'background-color 120ms ease-out',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-body-m)',
                      lineHeight: 'var(--line-height-body-m)',
                      color: 'var(--color-brand-primary)',
                      cursor: 'pointer',
                      whiteSpace: 'pre-line',
                      textAlign: 'center',
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </FieldWithLabel>

          {/* Save */}
          <button
            type="button"
            disabled={!canSave}
            onClick={() => {
              if (!canSave) return;
              onSave({ name: name.trim(), dosage: dosage.trim(), frequency });
            }}
            style={{
              height: 56,
              width: '100%',
              background: canSave ? '#ffffff' : '#edf2ff',
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
              color: canSave
                ? 'var(--color-brand-primary)'
                : 'var(--color-button-primary-disabled)',
              cursor: canSave ? 'pointer' : 'not-allowed',
              transition: 'background-color 120ms ease-out',
            }}
          >
            Guardar
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              style={{
                height: 44,
                width: '100%',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--font-size-body-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
              }}
            >
              Apagar medicamento
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function FieldWithLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
        width: '100%',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 500,
          fontSize: 13,
          color: 'var(--color-text-on-brand)',
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function SheetInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const basePadding = 12; // --space-sm
  return (
    <input
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: '100%',
        background: 'var(--color-neutral-surface)',
        border: focused
          ? '2px solid var(--color-brand-primary)'
          : '1px solid var(--color-text-tertiary)',
        padding: focused ? basePadding - 1 : basePadding,
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-family)',
        fontWeight: 'var(--font-weight-regular)',
        fontSize: 'var(--font-size-body-m)',
        lineHeight: 'var(--line-height-body-m)',
        color: 'var(--color-text-primary)',
        outline: 'none',
        boxShadow: focused ? '0 0 30px 0 rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'border-color 120ms ease-out, box-shadow 120ms ease-out',
      }}
    />
  );
}
