import { ChipPickerScreen } from './ChipPickerScreen';
import { useOnboarding } from '@/context/OnboardingContext';

/** Chips visíveis por defeito (Figma 1028:6255) */
const VISIBLE_ALLERGIES = [
  'Penicilina',
  'Ibuprofeno',
  'Aspirina',
  'Sulfamidas',
  'Codeína',
  'Marisco',
  'Glúten',
  'Amendoim',
  'Lactose',
];

/** Base de dados completa — 30 alergias mais comuns (medicamentos + alimentos) */
const ALL_ALLERGIES = [
  // Medicamentos
  'Penicilina',
  'Amoxicilina',
  'Ampicilina',
  'Ibuprofeno',
  'Aspirina',
  'Naproxeno',
  'Diclofenac',
  'Sulfamidas',
  'Codeína',
  'Tramadol',
  'Morfina',
  'Tetraciclina',
  'Eritromicina',
  'Cefalosporinas',
  'Anestésicos locais',
  'Contraste iodado',
  'Insulina',
  'Anticonvulsivantes',
  // Alimentos
  'Marisco',
  'Glúten',
  'Amendoim',
  'Lactose',
  'Leite de vaca',
  'Ovo',
  'Soja',
  'Trigo',
  'Peixe',
  'Frutos de casca rija',
  'Sésamo',
  'Latex',
];

/** 5.11_Allergies — Figma 1028:6255. Step 3/5. */
interface AllergiesProps {
  nextRoute?: string;
}

export function AllergiesScreen({ nextRoute = '/onboarding/conditions' }: AllergiesProps) {
  const { data, update } = useOnboarding();
  return (
    <ChipPickerScreen
      title="Alergias"
      heading="Tem alguma alergia?"
      body="Selecione as alergias conhecidas ou pesquise abaixo."
      searchPlaceholder="Pesquisar alergias"
      options={VISIBLE_ALLERGIES}
      allOptions={ALL_ALLERGIES}
      activeIndex={2}
      nextRoute={nextRoute}
      initialSelected={data.allergies}
      onSelectionChange={(sel) => update({ allergies: sel })}
    />
  );
}
