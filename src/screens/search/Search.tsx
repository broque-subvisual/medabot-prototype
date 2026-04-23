import { useRef, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import iconSearch from '@/assets/icon-search.svg';
import iconChevronRight from '@/assets/icon-chevron-right.svg';

interface Med {
  name: string;
  subtitle: string;
}

const POPULAR: Med[] = [
  { name: 'Brufen 600', subtitle: 'Ibuprofeno · Comprimido' },
  { name: 'Ben-U-Ron 1g', subtitle: 'Paracetamol · Comprimido' },
  { name: 'Omeprazol Sandoz 20mg', subtitle: 'Omeprazol · Capsula' },
];

const MED_DATABASE: Med[] = [
  { name: 'Clavulin 500mg', subtitle: 'Amoxicilina · capsulas' },
  { name: 'Clavamox 875mg', subtitle: 'Amoxicilina · Comprimido' },
  { name: 'Claritromicina 500mg', subtitle: 'Claritromicina · Comprimido' },
  { name: 'Clonazepam 2mg', subtitle: 'Clonazepam · Comprimido' },
  { name: 'Cipralex 10mg', subtitle: 'Escitalopram · Comprimido' },
  { name: 'Celecoxib 200mg', subtitle: 'Celecoxib · Capsula' },
  { name: 'Cetoprofeno 100mg', subtitle: 'Cetoprofeno · Comprimido' },
  { name: 'Brufen 600', subtitle: 'Ibuprofeno · Comprimido' },
  { name: 'Ben-U-Ron 1g', subtitle: 'Paracetamol · Comprimido' },
  { name: 'Omeprazol Sandoz 20mg', subtitle: 'Omeprazol · Capsula' },
  { name: 'Amoxicilina 500mg', subtitle: 'Amoxicilina · Capsula' },
  { name: 'Aspirina 500mg', subtitle: 'Ácido Acetilsalicílico · Comprimido' },
  { name: 'Daflon 500mg', subtitle: 'Diosmina · Comprimido' },
  { name: 'Donepezilo 10mg', subtitle: 'Donepezilo · Comprimido' },
  { name: 'Enalapril 20mg', subtitle: 'Enalapril · Comprimido' },
  { name: 'Fluoxetina 20mg', subtitle: 'Fluoxetina · Capsula' },
  { name: 'Losartan 50mg', subtitle: 'Losartan · Comprimido' },
  { name: 'Metformina 850mg', subtitle: 'Metformina · Comprimido' },
  { name: 'Pantoprazol 20mg', subtitle: 'Pantoprazol · Comprimido' },
  { name: 'Sinvastatina 20mg', subtitle: 'Sinvastatina · Comprimido' },
  { name: 'Plavix 75mg', subtitle: 'Clopidogrel · Comprimido' },
  { name: 'Losec 20mg', subtitle: 'Omeprazol · Capsula' },
  { name: 'Cozaar 50mg', subtitle: 'Losartan · Comprimido' },
];

/**
 * 9.2/9.3 Search — Figma nodes 1028:5871 / 1028:5890.
 * Focused search bar with popular suggestions (empty) or filtered results (typed).
 */
export function SearchScreen() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) return [];
    return MED_DATABASE
      .filter((m) => m.name.toLowerCase().startsWith(trimmed))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt'));
  }, [trimmed]);

  const showPopular = trimmed.length === 0;
  const items = showPopular ? POPULAR : results;

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
      <StatusBar variant="dark" />

      {/* Search + suggestions section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          padding: '0 var(--space-md)',
          marginTop: 'var(--space-xl)',
        }}
      >
        {/* Search row: input + cancel */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-xs)',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {/* Search bar */}
          <div
            style={{
              flex: 1,
              height: 44,
              minHeight: 44,
              background: 'var(--color-neutral-surface)',
              border: inputFocused ? '2px solid var(--color-brand-primary)' : '1.5px solid var(--color-text-tertiary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 0 30px 0 rgba(0,0,0,0.05)',
              padding: '0 var(--space-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
            }}
          >
            <img
              src={iconSearch}
              alt=""
              aria-hidden
              style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder=""
              style={{
                flex: 1,
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

          {/* Cancel button */}
          <button
            type="button"
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-sm)',
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-brand-primary)',
                whiteSpace: 'nowrap',
              }}
            >
              Cancelar
            </span>
          </button>
        </div>

        {/* Header — only for popular suggestions */}
        {showPopular && (
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
                color: 'var(--color-text-tertiary)',
              }}
            >
              Sugestões Populares
            </h2>
          </div>
        )}

        {/* Results / suggestions list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            overflow: 'auto',
          }}
        >
          {!showPopular && items.length === 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                padding: 'var(--space-2xl) var(--space-md)',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-body-l)',
                  lineHeight: 'var(--line-height-body-l)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Nenhum resultado encontrado.
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-text-tertiary)',
                  textAlign: 'center',
                }}
              >
                Verifique o nome ou tente outra pesquisa.
              </p>
            </div>
          )}
          {items.map((item) => (
            <div key={item.name}>
                <button
                  type="button"
                  onClick={() => navigate('/identify', { state: { medName: item.name, medSubtitle: item.subtitle.split(' · ')[0] } })}
                  style={{
                    background: 'transparent',
                    minHeight: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 'var(--space-md)',
                    paddingRight: 'var(--space-xs)',
                    paddingTop: 'var(--space-xs)',
                    paddingBottom: 'var(--space-xs)',
                    borderRadius: 'var(--radius-md)',
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
                      {item.name}
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
                      {item.subtitle}
                    </span>
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={iconChevronRight}
                      alt=""
                      style={{ width: 16, height: 16, display: 'block' }}
                    />
                  </div>
                </button>
              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: 'var(--color-text-tertiary)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
