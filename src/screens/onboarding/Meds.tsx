import { OnboardingInfo } from './OnboardingInfo';
import iconPill from '@/assets/icon-pill.svg';

/** 5.3_Meds_info — Figma node 1028:5973 */
export function MedsScreen() {
  return (
    <OnboardingInfo
      icon={iconPill}
      title="Informação clara"
      body="Receba explicações em linguagem simples sobre o medicamento, os seu efeitos e preocupações."
      activeIndex={1}
      nextRoute="/onboarding/doubts"
      skipRoute="/onboarding/profile-selection"
    />
  );
}
