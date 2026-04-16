import { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BlueFrame } from './BlueFrame';
import { OnboardingFooter } from './OnboardingFooter';
import iconSearch from '@/assets/icon-search.svg';

/**
 * Shared chip-picker onboarding template — Figma 5.11 Allergies / 5.12 Conditions.
 * Heading + body + search bar + wrap chips + footer.
 */
interface ChipPickerScreenProps {
  title: string;
  heading: string;
  body: string;
  searchPlaceholder: string;
  /** Chips shown by default on screen */
  options: string[];
  /** Full searchable database — if omitted, searches within options */
  allOptions?: string[];
  activeIndex: number;
  nextRoute: string;
  /** Initial selection (from context) */
  initialSelected?: string[];
  /** Called when selection changes — use to persist to context */
  onSelectionChange?: (selected: string[]) => void;
}

export function ChipPickerScreen({
  title,
  heading,
  body,
  searchPlaceholder,
  options,
  allOptions,
  activeIndex,
  nextRoute,
  initialSelected = [],
  onSelectionChange,
}: ChipPickerScreenProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnRoute = (location.state as { returnRoute?: string })?.returnRoute;
  const finalRoute = returnRoute ?? nextRoute;
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const originalSelected = useMemo(() => [...initialSelected].sort(), []);  // eslint-disable-line react-hooks/exhaustive-deps
  const selectionChanged = JSON.stringify([...selected].sort()) !== JSON.stringify(originalSelected);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (opt: string) =>
    setSelected((prev) => {
      const next = prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt];
      if (!returnRoute) onSelectionChange?.(next);
      return next;
    });

  const searchDb = allOptions ?? options;
  const query = searchValue.trim().toLowerCase();
  const suggestions =
    query.length > 0
      ? searchDb.filter(
          (o) => o.toLowerCase().includes(query) && !selected.includes(o),
        )
      : [];

  return (
    <BlueFrame title={title}>
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
              {heading}
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
              {body}
            </p>
          </div>

          {/* Search + chips */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              width: '100%',
            }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <div
                onClick={() => inputRef.current?.focus()}
                style={{
                  height: 44,
                  width: '100%',
                  background: 'var(--color-neutral-surface)',
                  border: searchFocused
                    ? '2px solid var(--color-brand-primary)'
                    : '1px solid var(--color-text-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: searchFocused
                    ? '0 0 30px 0 rgba(0,0,0,0.05)'
                    : 'none',
                  padding: searchFocused
                    ? 'calc(var(--space-xs) - 1px) calc(var(--space-sm) - 1px)'
                    : 'var(--space-xs) var(--space-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  cursor: 'text',
                  transition: 'border-color 120ms ease-out, box-shadow 120ms ease-out',
                }}
              >
                <img
                  src={iconSearch}
                  alt=""
                  aria-hidden
                  style={{
                    width: 16,
                    height: 16,
                    display: 'block',
                    flexShrink: 0,
                    filter: searchFocused
                      ? 'brightness(0) saturate(100%) invert(21%) sepia(96%) saturate(2637%) hue-rotate(209deg) brightness(92%) contrast(101%)'
                      : 'none',
                    transition: 'filter 120ms ease-out',
                  }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
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
                    padding: 0,
                  }}
                />
              </div>

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && searchFocused && (
                <div
                  style={{
                    position: 'absolute',
                    top: 48,
                    left: 0,
                    right: 0,
                    background: 'var(--color-neutral-surface)',
                    border: '1.5px solid var(--color-brand-primary)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    zIndex: 20,
                    maxHeight: 200,
                    overflowY: 'auto',
                  }}
                >
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        toggle(s);
                        setSearchValue('');
                        inputRef.current?.focus();
                      }}
                      style={{
                        width: '100%',
                        height: 40,
                        padding: '0 var(--space-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: 'var(--font-size-body-m)',
                        lineHeight: 'var(--line-height-body-m)',
                        color: 'var(--color-text-primary)',
                        cursor: 'pointer',
                        background: 'transparent',
                        textAlign: 'left',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected chips (from search or pre-defined) */}
            {selected.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  width: '100%',
                }}
              >
                {selected.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(opt)}
                    style={{
                      height: 32,
                      padding: '0 var(--space-xs)',
                      background: 'var(--color-button-secondary-pressed)',
                      border: '1.5px solid var(--color-brand-primary)',
                      borderRadius: 'var(--radius-xsm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-micro)',
                      lineHeight: 'var(--line-height-micro)',
                      color: 'var(--color-brand-primary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {opt}
                    <span style={{ fontSize: 14, lineHeight: '14px' }}>×</span>
                  </button>
                ))}
              </div>
            )}

            {/* Pre-defined option chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '18px 13px',
                width: '100%',
              }}
            >
              {options.filter((opt) => !selected.includes(opt)).map((opt) => {
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(opt)}
                    style={{
                      height: 32,
                      padding: 'var(--space-xs)',
                      background: 'var(--color-neutral-surface)',
                      border: '1.5px solid var(--color-brand-primary)',
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
                      whiteSpace: 'nowrap',
                      transition: 'background-color 120ms ease-out',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <OnboardingFooter
          activeIndex={activeIndex}
          totalDots={5}
          canSubmit={returnRoute ? selectionChanged : true}
          onNext={() => { if (returnRoute) onSelectionChange?.(selected); navigate(finalRoute); }}
          onSkip={undefined}
          nextLabel={returnRoute ? 'Guardar' : 'Continuar'}
          hideDots={!!returnRoute}
        />
      </div>
    </BlueFrame>
  );
}
