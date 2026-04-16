import { ChipPickerScreen } from './ChipPickerScreen';
import { useOnboarding } from '@/context/OnboardingContext';

/** Chips visíveis por defeito (Figma 1028:6313) */
const VISIBLE_CONDITIONS = [
  'Hipertensão',
  'Gota',
  'Diabetes Tipo 2',
  'Asma',
  'Hipotiroidismo',
  'DPOC',
  'Epilepsia',
  'Osteoporose',
  'Insónia',
];

/** Base de dados — 50 condições crónicas mais comuns */
const ALL_CONDITIONS = [
  // Cardiovasculares
  'Hipertensão',
  'Insuficiência cardíaca',
  'Doença coronária',
  'Arritmia cardíaca',
  'Fibrilhação auricular',
  'Doença arterial periférica',
  'AVC (sequelas)',
  // Metabólicas / Endócrinas
  'Diabetes Tipo 1',
  'Diabetes Tipo 2',
  'Hipotiroidismo',
  'Hipertiroidismo',
  'Dislipidemia',
  'Obesidade',
  'Síndrome metabólica',
  'Gota',
  // Respiratórias
  'Asma',
  'DPOC',
  'Bronquite crónica',
  'Apneia do sono',
  'Fibrose pulmonar',
  // Musculoesqueléticas
  'Osteoporose',
  'Artrite reumatoide',
  'Osteoartrose',
  'Fibromialgia',
  'Lombalgia crónica',
  'Espondilite anquilosante',
  // Neurológicas
  'Epilepsia',
  'Enxaqueca crónica',
  'Doença de Parkinson',
  'Esclerose múltipla',
  'Alzheimer',
  'Neuropatia periférica',
  // Gastrointestinais
  'Doença de Crohn',
  'Colite ulcerosa',
  'Síndrome do intestino irritável',
  'Refluxo gastroesofágico',
  'Doença celíaca',
  'Hepatite crónica',
  'Cirrose hepática',
  // Renais / Urológicas
  'Doença renal crónica',
  'Hiperplasia benigna da próstata',
  // Psiquiátricas
  'Depressão',
  'Ansiedade generalizada',
  'Perturbação bipolar',
  'Insónia',
  // Dermatológicas
  'Psoríase',
  'Eczema / Dermatite atópica',
  // Oncológicas (em acompanhamento)
  'Cancro em remissão',
  // Autoimunes / Outras
  'Lúpus eritematoso sistémico',
  'Anemia crónica',
  'HIV / SIDA',
];

/** 5.12_Conditions — Figma 1028:6313. Step 4/5. */
interface ConditionsProps {
  nextRoute?: string;
}

export function ConditionsScreen({ nextRoute = '/onboarding/lifestyle' }: ConditionsProps) {
  const { data, update } = useOnboarding();
  return (
    <ChipPickerScreen
      title="Condições"
      heading="Condições crónicas"
      body="Selecione condições de saúde relevantes."
      searchPlaceholder="Pesquisar condição"
      options={VISIBLE_CONDITIONS}
      allOptions={ALL_CONDITIONS}
      activeIndex={3}
      nextRoute={nextRoute}
      initialSelected={data.conditions}
      onSelectionChange={(sel) => update({ conditions: sel })}
    />
  );
}
