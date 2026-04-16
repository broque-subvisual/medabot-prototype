import { OnboardingInfo } from './OnboardingInfo';
import iconChat from '@/assets/icon-chat-bubble.svg';

/** 5.4_Doubts_info — Figma node 1028:5989 */
export function DoubtsScreen() {
  return (
    <OnboardingInfo
      icon={iconChat}
      title="Tire as sua dúvidas"
      body="Faça perguntas e receba respostas adaptadas ao seu perfil e medicação."
      activeIndex={2}
      nextRoute="/onboarding/profile-selection"
      skipRoute="/onboarding/profile-selection"
    />
  );
}
