/**
 * StatusBar — Figma nodes `1028:5906` (white) e `1028:5041` (black).
 * SVG exportado directo do Figma (pixel-perfect).
 */
import statusBarWhite from '@/assets/status-bar-white.svg';
import statusBarBlack from '@/assets/status-bar-black.svg';

interface StatusBarProps {
  variant?: 'white' | 'black' | 'dark';
}

export function StatusBar({ variant = 'white' }: StatusBarProps) {
  const src = variant === 'white' ? statusBarWhite : statusBarBlack; // 'dark' uses same as 'black'
  return (
    <div
      style={{
        height: 59,
        width: '100%',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
