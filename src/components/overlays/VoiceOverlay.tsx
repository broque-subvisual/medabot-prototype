import { useEffect, useRef, useState } from 'react';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';

type Phase = 'idle' | 'listening' | 'transcribing' | 'thinking' | 'answering';

interface ConversationEntry {
  question: string;
  answer: string;
}

const SIMULATED_EXCHANGES = [
  {
    transcript: 'Posso tomar este medicamento com o estômago vazio?',
    response: 'Recomenda-se tomar com alimentos para reduzir o risco de irritação gástrica. Se precisar de tomar em jejum, beba bastante água e consulte o seu médico ou farmacêutico.',
  },
  {
    transcript: 'E se eu estiver a tomar outros medicamentos?',
    response: 'É importante informar o seu médico sobre todos os medicamentos que está a tomar, incluindo suplementos e produtos naturais. Alguns podem interagir entre si e alterar a eficácia ou aumentar os efeitos secundários.',
  },
  {
    transcript: 'Durante quanto tempo posso tomar?',
    response: 'A duração do tratamento depende da indicação. Para dor aguda, recomenda-se o menor tempo possível. Para tratamentos prolongados, o médico deve reavaliar periodicamente a necessidade de continuar.',
  },
  {
    transcript: 'Posso conduzir enquanto tomo este medicamento?',
    response: 'Em geral, este medicamento não afeta a capacidade de condução. No entanto, se sentir tonturas, sonolência ou visão turva, evite conduzir ou operar máquinas até os sintomas desaparecerem.',
  },
  {
    transcript: 'Há algum efeito se beber álcool?',
    response: 'O consumo de álcool durante o tratamento pode aumentar o risco de irritação gástrica e hemorragia. Recomenda-se evitar ou limitar o consumo de bebidas alcoólicas enquanto tomar este medicamento.',
  },
];

interface VoiceOverlayProps {
  medName: string;
  onClose: (entries: ConversationEntry[]) => void;
}

export function VoiceOverlay({ medName, onClose }: VoiceOverlayProps) {
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [exchangeIndex, setExchangeIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  /* Auto-scroll to bottom when content changes */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [conversation, currentTranscript, currentResponse, phase]);

  /* Phase transitions */
  useEffect(() => {
    const exchange = SIMULATED_EXCHANGES[exchangeIndex % SIMULATED_EXCHANGES.length];

    if (phase === 'listening') {
      const t = setTimeout(() => {
        setCurrentTranscript('');
        setCurrentResponse('');
        setPhase('transcribing');
      }, 3000);
      return () => clearTimeout(t);
    }
    if (phase === 'transcribing') {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setCurrentTranscript(exchange.transcript.slice(0, i));
        if (i >= exchange.transcript.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('thinking'), 800);
        }
      }, 35);
      return () => clearInterval(interval);
    }
    if (phase === 'thinking') {
      const t = setTimeout(() => setPhase('answering'), 2200);
      return () => clearTimeout(t);
    }
    if (phase === 'answering') {
      setCurrentResponse(exchange.response);
      const t = setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          { question: exchange.transcript, answer: exchange.response },
        ]);
        setCurrentTranscript('');
        setCurrentResponse('');
        setExchangeIndex((prev) => prev + 1);
        setPhase('idle');
        setTimeout(() => setPhase('listening'), 1500);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [phase, exchangeIndex]);

  function handleMicTap() {
    if (phase === 'idle' || phase === 'answering') {
      if (phase === 'answering') {
        const exchange = SIMULATED_EXCHANGES[exchangeIndex % SIMULATED_EXCHANGES.length];
        setConversation((prev) => [
          ...prev,
          { question: exchange.transcript, answer: exchange.response },
        ]);
        setCurrentTranscript('');
        setCurrentResponse('');
        setExchangeIndex((prev) => prev + 1);
      }
      setPhase('listening');
    }
  }

  function handleClose() {
    let allEntries = [...conversationRef.current];
    if (phase === 'answering') {
      const exchange = SIMULATED_EXCHANGES[exchangeIndex % SIMULATED_EXCHANGES.length];
      allEntries.push({ question: exchange.transcript, answer: exchange.response });
    }
    onClose(allEntries);
  }

  const isListening = phase === 'listening';
  const showCurrentExchange = phase === 'transcribing' || phase === 'thinking' || phase === 'answering';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        background: 'var(--color-neutral-background)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 55,
      }}
    >
      <style>{`
        @keyframes vo-pulseRing {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes vo-waveBar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @keyframes vo-thinkDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes vo-fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NavBar */}
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--space-md)',
          flexShrink: 0,
          marginTop: 50,
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fechar"
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
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-title-m)',
            lineHeight: 'var(--line-height-title-m)',
            color: 'var(--color-text-primary)',
          }}
        >
          {medName}
        </span>
        <div style={{ width: 44, height: 44, opacity: 0 }} aria-hidden />
      </div>

      {/* AI disclaimer */}
      <p
        style={{
          margin: 0,
          padding: 'var(--space-2xs) var(--space-md)',
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-micro)',
          lineHeight: 'var(--line-height-micro)',
          color: 'var(--color-text-tertiary)',
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        Gerado por IA · Informação educativa · Consulte um profissional.
      </p>

      {/* Scrollable conversation area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 16,
          padding: 'var(--space-sm) var(--space-md)',
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        {conversation.map((entry, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                style={{
                  background: 'var(--color-brand-primary-light)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  maxWidth: '85%',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-text-secondary)',
                  textAlign: 'right',
                }}
              >
                {entry.question}
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--font-size-body-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {entry.answer}
            </p>
          </div>
        ))}

        {showCurrentExchange && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'vo-fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                style={{
                  background: 'var(--color-brand-primary-light)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  maxWidth: '85%',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-body-m)',
                  lineHeight: 'var(--line-height-body-m)',
                  color: 'var(--color-text-secondary)',
                  textAlign: 'right',
                }}
              >
                {currentTranscript}
                {phase === 'transcribing' && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: 14,
                      background: 'var(--color-brand-primary)',
                      marginLeft: 2,
                      animation: 'vo-waveBar 1s ease-in-out infinite',
                      verticalAlign: 'text-bottom',
                    }}
                  />
                )}
              </div>
            </div>

            {phase === 'thinking' && (
              <div style={{ display: 'flex', gap: 6 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--color-brand-primary)',
                      animation: `vo-thinkDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}

            {phase === 'answering' && (
              <div style={{ animation: 'vo-fadeIn 0.5s ease' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-body-m)',
                    lineHeight: 'var(--line-height-body-m)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {currentResponse}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom: mic button + status */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          paddingBottom: 'var(--space-lg)',
          paddingTop: 'var(--space-sm)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isListening && (
            <>
              <div
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  border: '2px solid var(--color-brand-primary)',
                  animation: 'vo-pulseRing 1.5s ease-out infinite',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  border: '2px solid var(--color-brand-primary)',
                  animation: 'vo-pulseRing 1.5s ease-out 0.4s infinite',
                }}
              />
            </>
          )}

          <button
            type="button"
            onClick={handleMicTap}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: isListening
                ? 'var(--color-brand-primary)'
                : 'var(--color-brand-primary-light)',
              border: isListening
                ? 'none'
                : '2px solid var(--color-brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.3s ease, border 0.3s ease',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 3,
                alignItems: 'center',
                height: 24,
              }}
            >
              {[0.6, 0.9, 1, 0.7, 0.5].map((baseHeight, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: 24 * baseHeight,
                    borderRadius: 2,
                    background: isListening ? 'white' : 'var(--color-brand-primary)',
                    animation: isListening
                      ? `vo-waveBar 0.8s ease-in-out ${i * 0.12}s infinite`
                      : 'none',
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </div>
          </button>
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-micro)',
            lineHeight: 'var(--line-height-micro)',
            color: 'var(--color-text-tertiary)',
            textAlign: 'center',
          }}
        >
          {phase === 'idle' && 'Toque para falar'}
          {phase === 'listening' && 'A ouvir...'}
          {phase === 'transcribing' && 'A transcrever...'}
          {phase === 'thinking' && 'A pensar...'}
          {phase === 'answering' && 'Toque para perguntar novamente'}
        </p>
      </div>
    </div>
  );
}
