import { OnboardingInfo } from './OnboardingInfo';
import iconCamera from '@/assets/icon-camera.svg';

/** 5.2_Camara_info — Figma node 1028:5941 */
export function CameraScreen() {
  return (
    <OnboardingInfo
      icon={iconCamera}
      title="Câmara inteligente"
      body="Pode fotografar a embalagem de qualquer medicamento para o identificar automaticamente."
      activeIndex={0}
      nextRoute="/onboarding/meds"
      skipRoute="/onboarding/profile-selection"
    />
  );
}
