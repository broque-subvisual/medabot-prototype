import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StatusBar } from '@/components/chrome/StatusBar';
import { useOnboarding } from '@/context/OnboardingContext';
import iconChevronLeft from '@/assets/icon-chevron-left.svg';
import iconPaperclip from '@/assets/icon-paperclip.svg';


interface LocationState {
  medName?: string;
  medSubtitle?: string;
  voiceConversation?: { question: string; answer: string }[];
}

/* ── Per-medication content ── */
interface MedContent {
  title: string;
  subtitle: string;
  infoBlocks: { title: string; body?: string; bullets?: string[] }[];
  chips: Record<string, { question: string; answer: string; thinkTime: number }>;
  freeAnswers: string[];
  banner: { type: 'warning' | 'danger'; text: string };
}

const BRUFEN: MedContent = {
  title: 'Brufen',
  subtitle: 'Ibuprofeno',
  infoBlocks: [
    { title: 'O que é?', body: 'É um medicamento com ibuprofeno usado para dor e febre.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substancia ativa: ibuprofeno.',
        '· Indicação: dor, inflamação, febre.',
        '· Uso habitual: curto prazo.',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tens estômago sensível, problemas renais, asma ou alergia a anti-inflamatórios, convém ter cuidado.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Brufen pode interagir com medicamentos para a tensão arterial, como alguns anti-hipertensores, e também com anticoagulantes, aspirina e outros anti-inflamatórios.\nSe estás a tomar medicação para a hipertensão, é importante confirmar com o médico ou farmacêutico antes de usar.',
      thinkTime: 2400,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'O Brufen pede precaução em pessoas com hipertensão e pode interagir com medicamentos para a tensão arterial, incluindo anti hipertensores.',
      thinkTime: 2000,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'Os efeitos mais comuns podem incluir dor de estômago, náuseas, azia ou tonturas. Em pessoas com hipertensão, pode também interferir com o controlo da tensão arterial.\nSe notares inchaço, falta de ar, dor no peito ou subida da tensão, procura ajuda médica.',
      thinkTime: 1800,
    },
  },
  freeAnswers: [
    'O Brufen deve ser tomado preferencialmente com alimentos para reduzir o risco de irritação gástrica. Não exceda a dose recomendada sem orientação médica.',
    'Em geral, o ibuprofeno não é recomendado durante a gravidez, especialmente no terceiro trimestre. Consulte o seu médico antes de tomar qualquer medicação.',
    'A dose habitual para adultos é de 200 a 400 mg, até três vezes por dia. Respeite sempre o intervalo mínimo de 6 horas entre tomas.',
    'O Brufen pode ser utilizado em crianças a partir dos 6 meses, mas a dose deve ser ajustada ao peso corporal. Consulte o pediatra.',
    'Não é aconselhável misturar o Brufen com bebidas alcoólicas, pois aumenta o risco de hemorragia gástrica e danos no fígado.',
    'Se esqueceu uma toma, tome-a assim que se lembrar. No entanto, se já estiver próximo da hora da próxima toma, não duplique a dose.',
    'O ibuprofeno pode mascarar sinais de infeção. Se tiver febre persistente durante mais de 3 dias, consulte o médico.',
    'Guarde o Brufen num local seco, à temperatura ambiente, fora do alcance de crianças. Não utilize após o prazo de validade.',
    'Em caso de sobredosagem, procure assistência médica imediatamente. Os sintomas podem incluir náuseas, vómitos e dor abdominal.',
    'O Brufen pode causar sonolência em algumas pessoas. Se sentir este efeito, evite conduzir ou operar máquinas pesadas.',
  ],
  banner: {
    type: 'warning',
    text: 'Devido ao teu histórico de hipertensão recomendo que vejas possíveis interações e efeitos secundários.',
  },
};

const CLAVULIN: MedContent = {
  title: 'Clavulin',
  subtitle: 'Amoxicilina + Clavulanato',
  infoBlocks: [
    { title: 'O que é?', body: 'É um antibiótico que combina amoxicilina com ácido clavulânico, usado para tratar infeções bacterianas.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substância ativa: amoxicilina + ácido clavulânico.',
        '· Indicação: infeções respiratórias, urinárias, otites, sinusites.',
        '· Uso habitual: tratamento de curta duração (7–14 dias).',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tens alergia a penicilinas ou cefalosporinas, problemas hepáticos ou histórico de icterícia associada a este medicamento, não deves tomar sem orientação médica.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Clavulin pode interagir com anticoagulantes como a varfarina, aumentando o risco de hemorragia. Também pode reduzir a eficácia dos contracetivos orais.\nSe estás a tomar metotrexato ou alopurinol, informa o médico antes de usar.',
      thinkTime: 2400,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'O Clavulin deve ser tomado no início das refeições para melhorar a absorção e reduzir possíveis efeitos gastrointestinais. Respeite sempre os horários prescritos.',
      thinkTime: 2000,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'Os efeitos mais comuns incluem diarreia, náuseas e erupções cutâneas. Em casos raros, podem ocorrer reações alérgicas graves.\nSe notares inchaço da face, dificuldade em respirar ou erupção cutânea generalizada, procura ajuda médica imediatamente.',
      thinkTime: 1800,
    },
  },
  freeAnswers: [
    'O Clavulin é um antibiótico e deve ser tomado durante todo o período prescrito, mesmo que se sinta melhor antes de terminar o tratamento.',
    'Não interrompa o tratamento sem consultar o médico. A interrupção precoce pode levar a resistência bacteriana.',
    'O Clavulin pode causar diarreia. Se esta for persistente ou grave, contacte o seu médico.',
    'Mantenha o Clavulin no frigorífico após reconstituição. A suspensão oral tem validade limitada após preparação.',
    'Se vomitar dentro de 30 minutos após tomar o Clavulin, pode repetir a dose. Caso contrário, aguarde a próxima toma.',
    'O consumo de álcool não é recomendado durante o tratamento com antibióticos, pois pode aumentar os efeitos secundários.',
    'Se desenvolver sinais de infeção fúngica (manchas brancas na boca), informe o médico. Pode ser necessário tratamento adicional.',
    'O Clavulin pode alterar os resultados de alguns testes laboratoriais. Informe o laboratório de que está a tomar este medicamento.',
    'Em caso de reação alérgica prévia a penicilinas, o Clavulin está contraindicado. Informe sempre o médico sobre alergias.',
    'A dose de Clavulin varia conforme a gravidade da infeção. Siga sempre a posologia indicada pelo médico.',
  ],
  banner: {
    type: 'danger',
    text: 'Tens alergia à penicilina. O Clavulin pertence a esta família e pode não ser seguro.',
  },
};

const BEURON: MedContent = {
  title: 'Ben-U-Ron',
  subtitle: 'Paracetamol',
  infoBlocks: [
    { title: 'O que é?', body: 'É um medicamento com paracetamol usado para aliviar dores ligeiras a moderadas e reduzir a febre.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substância ativa: paracetamol.',
        '· Indicação: dor, febre.',
        '· Uso habitual: curto prazo, conforme necessário.',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tens problemas hepáticos, consomes álcool regularmente ou tens insuficiência renal, deves ter cuidado e consultar o médico antes de tomar.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Ben-U-Ron pode interagir com anticoagulantes como a varfarina, aumentando o risco de hemorragia. Também pode haver interação com medicamentos para a epilepsia e a tuberculose.\nEvita tomar com outros medicamentos que contenham paracetamol para não exceder a dose máxima diária.',
      thinkTime: 2400,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'A dose habitual para adultos é de 1g (1 comprimido) até 3 vezes por dia, com um intervalo mínimo de 6 horas entre tomas. Não exceder 3g por dia.',
      thinkTime: 2000,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'O paracetamol é geralmente bem tolerado nas doses recomendadas. Raramente podem ocorrer reações alérgicas cutâneas.\nEm caso de sobredosagem, pode causar danos graves no fígado. Se tomares mais do que a dose recomendada, procura ajuda médica imediatamente.',
      thinkTime: 1800,
    },
  },
  freeAnswers: [
    'O Ben-U-Ron pode ser tomado com ou sem alimentos. A absorção é ligeiramente mais rápida em jejum.',
    'Não tome mais de 3 comprimidos de 1g por dia, a menos que o médico indique o contrário.',
    'O paracetamol é considerado seguro durante a gravidez nas doses recomendadas, mas consulte sempre o médico.',
    'Evite o consumo de álcool enquanto toma Ben-U-Ron, pois aumenta o risco de lesão hepática.',
    'O Ben-U-Ron pode ser dado a crianças, mas a dose deve ser ajustada ao peso. Consulte o pediatra.',
    'Se a dor ou febre persistirem por mais de 3 dias, consulte o médico.',
    'Não combine o Ben-U-Ron com outros medicamentos que contenham paracetamol para evitar sobredosagem.',
    'Guarde à temperatura ambiente, protegido da humidade e fora do alcance das crianças.',
    'Em caso de sobredosagem acidental, procure ajuda médica imediata mesmo na ausência de sintomas.',
    'O Ben-U-Ron não tem efeito anti-inflamatório significativo. Para inflamação, pode ser necessário outro medicamento.',
  ],
  banner: {
    type: 'warning',
    text: 'O paracetamol em excesso pode causar danos hepáticos graves. Respeite sempre a dose máxima diária.',
  },
};

const OMEPRAZOL: MedContent = {
  title: 'Omeprazol',
  subtitle: 'Omeprazol',
  infoBlocks: [
    { title: 'O que é?', body: 'É um medicamento inibidor da bomba de protões que reduz a produção de ácido no estômago.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substância ativa: omeprazol.',
        '· Indicação: azia, refluxo, úlceras gástricas.',
        '· Uso habitual: tratamento de curta a média duração.',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tens problemas hepáticos graves ou tomas clopidogrel, deves informar o médico. O uso prolongado pode afetar a absorção de magnésio e cálcio.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Omeprazol pode interagir com o clopidogrel, reduzindo a sua eficácia. Também pode afetar a absorção de medicamentos que dependem da acidez gástrica, como o cetoconazol ou a digoxina.\nInforma sempre o médico sobre toda a medicação que estás a tomar.',
      thinkTime: 2400,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'O Omeprazol deve ser tomado em jejum, de preferência 30 minutos antes do pequeno-almoço. As cápsulas devem ser engolidas inteiras, sem mastigar.',
      thinkTime: 2000,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'Os efeitos mais comuns incluem dor de cabeça, diarreia, náuseas e dor abdominal. O uso prolongado pode estar associado a deficiência de magnésio e aumento do risco de fraturas ósseas.\nSe sentires sintomas como cãibras ou palpitações, consulta o médico.',
      thinkTime: 1800,
    },
  },
  freeAnswers: [
    'O Omeprazol é mais eficaz quando tomado 30 minutos antes da primeira refeição do dia.',
    'Não interrompa o tratamento abruptamente sem consultar o médico, especialmente em tratamentos prolongados.',
    'O uso prolongado de Omeprazol deve ser reavaliado periodicamente pelo médico.',
    'Se toma Omeprazol há mais de 1 ano, o médico pode recomendar análises para verificar os níveis de magnésio.',
    'O Omeprazol pode ser tomado durante a gravidez apenas se estritamente necessário e sob orientação médica.',
    'Não tome antiácidos ao mesmo tempo que o Omeprazol. Espaçe pelo menos 2 horas.',
    'As cápsulas não devem ser abertas nem mastigadas. Se tiver dificuldade em engolir, consulte o farmacêutico.',
    'O Omeprazol pode alterar resultados de testes para tumores neuroendócrinos. Informe o laboratório.',
    'Guarde à temperatura ambiente, protegido da humidade. Não utilize após o prazo de validade.',
    'Se os sintomas de refluxo persistirem após 2 semanas de tratamento, consulte o médico.',
  ],
  banner: {
    type: 'warning',
    text: 'O uso prolongado de omeprazol pode afetar a absorção de nutrientes. Consulte o médico sobre a duração do tratamento.',
  },
};

const PLAVIX: MedContent = {
  title: 'Plavix',
  subtitle: 'Clopidogrel',
  infoBlocks: [
    { title: 'O que é?', body: 'É um medicamento antiagregante plaquetário que impede a formação de coágulos sanguíneos, protegendo contra enfartes e AVC.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substância ativa: clopidogrel.',
        '· Indicação: prevenção de eventos trombóticos (enfarte, AVC, doença arterial periférica).',
        '· Uso habitual: tratamento prolongado, conforme indicação médica.',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tens hemorragia ativa, úlcera gástrica, problemas hepáticos graves ou vais ser submetido a cirurgia, informa o médico antes de tomar.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Plavix pode interagir com o omeprazol, que reduz a sua eficácia antiagregante. Se precisares de proteção gástrica, o pantoprazol é geralmente preferido.\nTambém interage com anticoagulantes (varfarina), anti-inflamatórios (ibuprofeno) e alguns antidepressivos. Como tomas Atenolol para a hipertensão, a combinação é geralmente segura, mas informa sempre o médico.',
      thinkTime: 2600,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'A dose habitual é de 75 mg, uma vez por dia. Pode ser tomado com ou sem alimentos, sempre à mesma hora.\nComo tens hipertensão e tomas Atenolol, o Plavix complementa a proteção cardiovascular. Não interrompas o tratamento sem consultar o médico.',
      thinkTime: 2200,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'Os efeitos mais comuns incluem hemorragias (nódoas negras, hemorragia nasal, sangramento gengival), diarreia e dor abdominal.\nComo tomas Sinvastatina, a combinação é segura mas fica atento a dores musculares inexplicáveis. Se notares fezes escuras, sangue na urina ou hemorragia prolongada, procura ajuda médica imediata.',
      thinkTime: 2000,
    },
  },
  freeAnswers: [
    'O Plavix deve ser tomado todos os dias à mesma hora para manter um nível constante no sangue. Não duplique a dose se se esquecer.',
    'Evite tomar omeprazol com Plavix. Se precisar de proteção gástrica, o pantoprazol é a alternativa recomendada.',
    'Antes de qualquer cirurgia ou procedimento dentário, informe o médico de que toma Plavix. Pode ser necessário suspender 5 a 7 dias antes.',
    'O Plavix aumenta o risco de hemorragia. Evite desportos de contacto e tenha cuidado com cortes.',
    'Não tome aspirina em simultâneo sem indicação médica, pois aumenta o risco de hemorragia.',
    'O consumo de álcool deve ser moderado, pois pode aumentar o risco de hemorragia gástrica.',
    'Se desenvolver nódoas negras frequentes ou hemorragias que demoram a parar, consulte o médico.',
    'Guarde à temperatura ambiente, protegido da humidade e da luz solar direta.',
    'O Plavix é geralmente prescrito após eventos cardiovasculares ou colocação de stents. A duração do tratamento é definida pelo cardiologista.',
    'Não interrompa o Plavix sem orientação médica. A interrupção abrupta pode aumentar o risco de trombose.',
  ],
  banner: {
    type: 'danger',
    text: 'Tens Doença Hepática Grave registada no perfil. O Plavix é metabolizado pelo fígado e está contraindicado em insuficiência hepática grave, podendo aumentar o risco de hemorragia.',
  },
};

const LOSEC: MedContent = {
  title: 'Losec',
  subtitle: 'Omeprazol',
  infoBlocks: [
    { title: 'O que é?', body: 'É a marca comercial do omeprazol, um inibidor da bomba de protões que reduz a produção de ácido gástrico.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substância ativa: omeprazol.',
        '· Indicação: azia, refluxo gastroesofágico, úlceras gástricas e duodenais.',
        '· Uso habitual: tratamento de curta a média duração (2–8 semanas).',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tomas clopidogrel (Plavix), informa o médico porque o omeprazol pode reduzir a eficácia desse medicamento. O uso prolongado pode afetar a absorção de magnésio, cálcio e vitamina B12.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Losec pode reduzir a eficácia do clopidogrel (Plavix), um antiagregante plaquetário. Se tomares ambos, o médico pode optar pelo pantoprazol como alternativa.\nTambém pode interagir com a Sinvastatina que tomas, embora o risco seja baixo. Informa o médico sobre toda a tua medicação.',
      thinkTime: 2400,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'Toma o Losec em jejum, 30 minutos antes do pequeno-almoço. Engole a cápsula inteira com água, sem mastigar.\nComo tens hipertensão e tomas Atenolol, não há interação significativa com o Losec. Mantém os horários regulares.',
      thinkTime: 2000,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'Os efeitos mais comuns incluem dor de cabeça, diarreia, náuseas e dor abdominal. O uso prolongado pode levar a deficiência de magnésio, maior risco de fraturas ósseas e deficiência de vitamina B12.\nSe sentires cãibras musculares, palpitações ou fadiga inexplicável, consulta o médico.',
      thinkTime: 1800,
    },
  },
  freeAnswers: [
    'O Losec é mais eficaz quando tomado 30 minutos antes da primeira refeição do dia, em jejum.',
    'Se também toma Plavix (clopidogrel), informe o médico pois pode ser necessário trocar para pantoprazol.',
    'Não interrompa o tratamento abruptamente sem consultar o médico, especialmente em tratamentos prolongados.',
    'O uso prolongado de Losec deve ser reavaliado periodicamente. Peça ao médico para reavaliar a necessidade.',
    'Se toma Losec há mais de 1 ano, o médico pode recomendar análises de magnésio e vitamina B12.',
    'As cápsulas não devem ser abertas nem mastigadas. Se tiver dificuldade em engolir, consulte o farmacêutico.',
    'Não tome antiácidos ao mesmo tempo. Espaçe pelo menos 2 horas entre o Losec e outros medicamentos gástricos.',
    'O Losec pode ser tomado durante a gravidez apenas se estritamente necessário e sob orientação médica.',
    'Guarde à temperatura ambiente, protegido da humidade. Não utilize após o prazo de validade.',
    'Se os sintomas de refluxo persistirem após 2 semanas, consulte o médico para reavaliação.',
  ],
  banner: {
    type: 'warning',
    text: 'Se também tomas clopidogrel (Plavix), o omeprazol pode reduzir a sua eficácia. Confirma com o médico.',
  },
};

const CLAVAMOX: MedContent = {
  title: 'Clavamox',
  subtitle: 'Amoxicilina + Ácido Clavulânico',
  infoBlocks: [
    { title: 'O que é?', body: 'É um antibiótico que combina amoxicilina com ácido clavulânico para tratar infeções bacterianas resistentes à amoxicilina simples.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substância ativa: amoxicilina + ácido clavulânico.',
        '· Indicação: infeções respiratórias, urinárias, otites, sinusites, infeções de pele.',
        '· Uso habitual: tratamento de curta duração (5–14 dias).',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tens alergia a penicilinas ou cefalosporinas, este medicamento pode causar reação alérgica grave. Informa sempre o médico sobre as tuas alergias.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Clavamox pode interagir com anticoagulantes como a varfarina, aumentando o risco de hemorragia. Também pode reduzir a eficácia dos contracetivos orais.\nCom a tua medicação atual (Atenolol e Sinvastatina), não há interações significativas conhecidas. No entanto, informa sempre o médico.',
      thinkTime: 2400,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'O Clavamox deve ser tomado no início das refeições para melhorar a absorção e reduzir possíveis efeitos gastrointestinais.\nRespeita os horários prescritos e completa todo o tratamento, mesmo que te sintas melhor antes.',
      thinkTime: 2000,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'Os efeitos mais comuns incluem diarreia, náuseas, vómitos e erupções cutâneas. Em casos raros, podem ocorrer reações alérgicas graves (anafilaxia).\n⚠️ IMPORTANTE: Tens alergia registada à penicilina. O Clavamox contém amoxicilina, que pertence à família das penicilinas. Procura ajuda médica imediata se sentires inchaço, dificuldade em respirar ou erupção cutânea.',
      thinkTime: 2000,
    },
  },
  freeAnswers: [
    'O Clavamox é um antibiótico e deve ser tomado durante todo o período prescrito, mesmo que os sintomas melhorem antes.',
    'A interrupção precoce do tratamento pode levar a resistência bacteriana e recaída da infeção.',
    'Tome o Clavamox no início das refeições para melhor absorção e menor risco de desconforto gástrico.',
    'Se vomitar dentro de 30 minutos após tomar, pode repetir a dose. Caso contrário, aguarde a próxima toma.',
    'Mantenha a suspensão oral no frigorífico após preparação. Tem validade limitada, por isso verifique o prazo.',
    'O consumo de álcool não é recomendado durante o tratamento com antibióticos.',
    'Se desenvolver diarreia intensa ou persistente, contacte o médico. Pode ser necessário ajustar o tratamento.',
    'Em caso de sinais de infeção fúngica (manchas brancas na boca), informe o médico.',
    'O Clavamox pode alterar resultados de testes laboratoriais. Informe o laboratório de que está a tomar este medicamento.',
    'A dose varia conforme a gravidade e tipo de infeção. Siga sempre a posologia indicada pelo médico.',
  ],
  banner: {
    type: 'danger',
    text: 'Tens alergia registada à penicilina. O Clavamox contém amoxicilina, que pertence à família das penicilinas, e pode causar reação alérgica grave.',
  },
};

const COZAAR: MedContent = {
  title: 'Cozaar',
  subtitle: 'Losartan',
  infoBlocks: [
    { title: 'O que é?', body: 'É um medicamento anti-hipertensor da classe dos antagonistas dos recetores da angiotensina II (ARA II), usado para controlar a tensão arterial.' },
    {
      title: 'Resumo rápido',
      bullets: [
        '· Substância ativa: losartan potássico.',
        '· Indicação: hipertensão arterial, proteção renal em diabéticos, insuficiência cardíaca.',
        '· Uso habitual: tratamento prolongado/crónico.',
      ],
    },
    {
      title: 'Atenção antes de tomar',
      body: 'Se tens problemas renais graves, estenose bilateral das artérias renais, estás grávida ou a amamentar, não deves tomar sem orientação médica.',
    },
  ],
  chips: {
    'Interações': {
      question: 'Quais as interações que devo ter em conta?',
      answer: 'O Cozaar pode interagir com o Atenolol que já tomas, pois ambos baixam a tensão, pelo que a combinação requer monitorização cuidadosa para evitar hipotensão.\nTambém interage com anti-inflamatórios (ibuprofeno), suplementos de potássio e diuréticos poupadores de potássio. A Sinvastatina não apresenta interação significativa.',
      thinkTime: 2600,
    },
    'Como tomar': {
      question: 'No meu caso como devo tomar?',
      answer: 'A dose habitual é de 50 a 100 mg, uma vez por dia. Pode ser tomado com ou sem alimentos, sempre à mesma hora.\nComo já tomas Atenolol para a hipertensão, a associação com Cozaar deve ser monitorizada pelo médico para ajustar as doses.',
      thinkTime: 2200,
    },
    'Efeitos secundários': {
      question: 'Quais os efeitos secundários?',
      answer: 'Os efeitos mais comuns incluem tonturas, cansaço e hipotensão (tensão baixa), especialmente no início do tratamento ou quando combinado com outros anti-hipertensores como o Atenolol.\nSe sentires tonturas ao levantar, visão turva, ou desmaios, contacta o médico para ajuste de dose.',
      thinkTime: 2000,
    },
  },
  freeAnswers: [
    'O Cozaar deve ser tomado todos os dias à mesma hora, mesmo que se sinta bem. A hipertensão é silenciosa.',
    'Evite tomar anti-inflamatórios como ibuprofeno regularmente, pois podem reduzir o efeito do Cozaar na tensão arterial.',
    'Levante-se devagar de posições sentadas ou deitadas para evitar tonturas, especialmente nas primeiras semanas.',
    'Não tome suplementos de potássio ou substitutos de sal com potássio sem consultar o médico.',
    'Se estiver a planear uma gravidez, informe o médico. O Cozaar está contraindicado durante a gravidez.',
    'Mantenha uma dieta com baixo teor de sal para potenciar o efeito do medicamento.',
    'Se se esquecer de uma toma, tome-a assim que se lembrar. Se já estiver próximo da hora seguinte, salte a toma esquecida.',
    'Monitorize a tensão arterial regularmente, especialmente se tomar outros medicamentos para a hipertensão.',
    'O Cozaar pode causar aumento do potássio no sangue. O médico pode pedir análises regulares.',
    'Guarde à temperatura ambiente, protegido da humidade e da luz. Não utilize após o prazo de validade.',
  ],
  banner: {
    type: 'warning',
    text: 'Já tomas Atenolol para a hipertensão. A combinação com Cozaar requer monitorização da tensão para evitar hipotensão.',
  },
};

function getMedContent(name?: string): MedContent {
  if (!name) return BRUFEN;
  const lower = name.toLowerCase();
  if (lower.startsWith('plavix')) return PLAVIX;
  if (lower.startsWith('losec')) return LOSEC;
  if (lower.startsWith('clavamox')) return CLAVAMOX;
  if (lower.startsWith('cozaar')) return COZAAR;
  if (lower.startsWith('brufen e')) return BRUFEN;
  if (lower.startsWith('clavulin')) return CLAVULIN;
  if (lower.startsWith('ben-u-ron')) return BEURON;
  if (lower.startsWith('omeprazol')) return OMEPRAZOL;
  if (lower.startsWith('brufen')) return BRUFEN;
  return BRUFEN;
}

/** Delay before all text blocks appear (ms after mount). */
const TEXT_DELAY = 500;

type VoicePhase = 'idle' | 'listening' | 'transcribing' | 'thinking' | 'answering';

const VOICE_EXCHANGES = [
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
];

let freeAnswerIndex = 0;

type ChatEntry = { question: string; answer: string };

/**
 * 8.1_Chat / 9.9_Chat — dynamic medication info screen.
 * Adapts content, banner, and chip answers based on the medication.
 */
export function MedInfoScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const med = getMedContent(state?.medName);

  const { addRecentMed, data: profileData } = useOnboarding();
  const hasProfile = !!profileData.name;
  const [showText, setShowText] = useState(!!state?.voiceConversation?.length);

  /* Register this medication as recently viewed */
  useEffect(() => {
    const today = new Date();
    const date = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    addRecentMed({ name: med.title, subtitle: med.subtitle, date });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [conversation, setConversation] = useState<ChatEntry[]>(
    state?.voiceConversation || []
  );
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [showThinking, setShowThinking] = useState(false);
  const [showLatestAnswer, setShowLatestAnswer] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [freeQuestion, setFreeQuestion] = useState<string | null>(null);
  const [inputFocused, setInputFocused] = useState(false);

  const isDanger = med.banner.type === 'danger';
  const bannerBg = isDanger ? 'var(--color-danger-bg, #fef2f2)' : 'var(--color-warning-bg)';
  const bannerColor = isDanger ? 'var(--color-danger-text, #991b1b)' : 'var(--color-warning-text)';
  const [showDangerModal, setShowDangerModal] = useState(hasProfile && isDanger);
  const [showBanner, setShowBanner] = useState(hasProfile);
  const [voicePhase, setVoicePhase] = useState<VoicePhase | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [voiceExIdx, setVoiceExIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), TEXT_DELAY);
    return () => clearTimeout(timer);
  }, []);

  /* Handle chip click — show thinking, then answer */
  useEffect(() => {
    if (!activeChip) return;
    const data = med.chips[activeChip];
    setShowThinking(false);
    setShowLatestAnswer(false);

    const t1 = setTimeout(() => setShowThinking(true), 400);
    const t2 = setTimeout(() => {
      setShowThinking(false);
      setShowLatestAnswer(true);
      setConversation((prev) => [...prev, { question: data.question, answer: data.answer }]);
    }, data.thinkTime);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activeChip]);

  /* Handle free text question */
  useEffect(() => {
    if (!freeQuestion) return;
    setActiveChip(null);
    setShowThinking(false);
    setShowLatestAnswer(false);

    const t1 = setTimeout(() => setShowThinking(true), 400);
    const t2 = setTimeout(() => {
      setShowThinking(false);
      setShowLatestAnswer(true);
      const answer = med.freeAnswers[freeAnswerIndex % med.freeAnswers.length];
      freeAnswerIndex++;
      setConversation((prev) => [
        ...prev,
        { question: freeQuestion, answer },
      ]);
      setFreeQuestion(null);
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [freeQuestion]);

  /* Voice phase transitions */
  useEffect(() => {
    if (!voicePhase) return;
    const exchange = VOICE_EXCHANGES[voiceExIdx % VOICE_EXCHANGES.length];

    if (voicePhase === 'listening') {
      const t = setTimeout(() => {
        setVoiceTranscript('');
        setVoiceResponse('');
        setVoicePhase('transcribing');
      }, 3000);
      return () => clearTimeout(t);
    }
    if (voicePhase === 'transcribing') {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVoiceTranscript(exchange.transcript.slice(0, i));
        if (i >= exchange.transcript.length) {
          clearInterval(interval);
          setTimeout(() => setVoicePhase('thinking'), 800);
        }
      }, 35);
      return () => clearInterval(interval);
    }
    if (voicePhase === 'thinking') {
      const t = setTimeout(() => setVoicePhase('answering'), 2200);
      return () => clearTimeout(t);
    }
    if (voicePhase === 'answering') {
      setVoiceResponse(exchange.response);
      const t = setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          { question: exchange.transcript, answer: exchange.response },
        ]);
        setVoiceTranscript('');
        setVoiceResponse('');
        setVoiceExIdx((prev) => prev + 1);
        setVoicePhase('idle');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [voicePhase, voiceExIdx]);

  /* Auto-scroll when voice adds content */
  useEffect(() => {
    if (voicePhase) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [voiceTranscript, voiceResponse, voicePhase, conversation]);

  function handleVoiceTap() {
    if (!voicePhase || voicePhase === 'idle') {
      setVoicePhase('listening');
    } else if (voicePhase === 'answering') {
      const exchange = VOICE_EXCHANGES[voiceExIdx % VOICE_EXCHANGES.length];
      setConversation((prev) => [
        ...prev,
        { question: exchange.transcript, answer: exchange.response },
      ]);
      setVoiceTranscript('');
      setVoiceResponse('');
      setVoiceExIdx((prev) => prev + 1);
      setVoicePhase('listening');
    }
  }

  function handleVoiceClose() {
    setVoicePhase(null);
    setVoiceTranscript('');
    setVoiceResponse('');
  }

  function handleSubmit() {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    setFreeQuestion(text);
  }

  const chips = ['Interações', 'Como tomar', 'Efeitos secundários'].filter(
    (c) => c !== activeChip,
  );

  /* The pending question (shown immediately, before answer arrives) */
  const pendingQuestion = activeChip && !showLatestAnswer
    ? med.chips[activeChip].question
    : freeQuestion;

  return (
    <div
      className="phone-frame"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, var(--color-neutral-background) 0%, var(--color-neutral-surface) 100%)',
        overflow: 'hidden',
      }}
    >
      <StatusBar variant="dark" />

      {/* Screen_content — flex-1, pb 8 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 'var(--space-xs)',
          minHeight: 0,
        }}
      >
        {/* NavBar — h44, px 16 */}
        <div
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--space-md)',
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={() => navigate(hasProfile ? -1 : '/guest')}
            aria-label="Voltar"
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
            {med.title}
          </span>
          <div style={{ width: 44, height: 44, opacity: 0 }} aria-hidden />
        </div>

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          {/* Scrollable content */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 'var(--space-md)',
              paddingRight: 'var(--space-md)',
              paddingTop: 'var(--space-2xs)',
              minHeight: 0,
              overflow: 'auto',
            }}
          >
            {/* AI disclaimer */}
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-micro)',
                lineHeight: 'var(--line-height-micro)',
                color: 'var(--color-text-tertiary)',
                textAlign: 'center',
                width: '100%',
                flexShrink: 0,
              }}
            >
              Gerado por IA · Informação educativa · Consulte um profissional.
            </p>

            {/* Alert banner — sticky at top of scroll area */}
            {showBanner && (
              <div
                style={{
                  width: '100%',
                  padding: '8px var(--space-sm)',
                  background: bannerBg,
                  borderRadius: 'var(--radius-xsm)',
                  boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: 6,
                  alignItems: 'flex-start',
                  flexShrink: 0,
                  position: 'sticky',
                  top: 0,
                  zIndex: 5,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                  style={{ flexShrink: 0, marginTop: 2 }}
                >
                  <circle cx="12" cy="12" r="10" stroke={bannerColor} strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="12" stroke={bannerColor} strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1" fill={bannerColor} />
                </svg>
                <p
                  style={{
                    margin: 0,
                    flex: 1,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--font-size-caption)',
                    lineHeight: 'var(--line-height-caption)',
                    color: bannerColor,
                  }}
                >
                  {med.banner.text}
                </p>
                <button
                  type="button"
                  onClick={() => setShowBanner(false)}
                  aria-label="Fechar alerta"
                  style={{
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke={bannerColor} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}

            {/* Info_blocks — clips content so text slides up from behind the separator */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 1,
                width: '100%',
                overflow: 'hidden',
                minHeight: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 19,
                  width: '100%',
                  maxWidth: 357,
                  transform: showText ? 'translateY(0)' : 'translateY(100%)',
                  opacity: showText ? 1 : 0,
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                }}
              >
                {med.infoBlocks.map((block) => (
                  <div
                    key={block.title}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      width: '100%',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: 'var(--font-size-body-m)',
                        lineHeight: 'var(--line-height-body-m)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {block.title}
                    </p>
                    {block.body && (
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
                        {block.body}
                      </p>
                    )}
                    {block.bullets && (
                      <div
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontWeight: 'var(--font-weight-regular)',
                          fontSize: 'var(--font-size-body-m)',
                          lineHeight: 'var(--line-height-body-m)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {block.bullets.map((line) => (
                          <p key={line} style={{ margin: 0 }}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Completed conversation entries */}
                {conversation.map((entry, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 19, width: '100%' }}>
                    {/* User bubble */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                      <div
                        style={{
                          background: 'var(--color-brand-primary-light)',
                          borderRadius: 12,
                          padding: 10,
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
                    {/* AI answer */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        width: '100%',
                        ...(i === conversation.length - 1 && showLatestAnswer
                          ? { animation: 'fadeSlideUp 0.5s ease' }
                          : {}),
                      }}
                    >
                      {entry.answer.split('\n').map((line, j) => (
                        <p
                          key={j}
                          style={{
                            margin: 0,
                            fontFamily: 'var(--font-family)',
                            fontWeight: 'var(--font-weight-regular)',
                            fontSize: 'var(--font-size-body-m)',
                            lineHeight: 'var(--line-height-body-m)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Pending user question (before answer arrives) */}
                {pendingQuestion && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <div
                      style={{
                        background: 'var(--color-brand-primary-light)',
                        borderRadius: 12,
                        padding: 10,
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: 'var(--font-size-body-m)',
                        lineHeight: 'var(--line-height-body-m)',
                        color: 'var(--color-text-secondary)',
                        textAlign: 'right',
                      }}
                    >
                      {pendingQuestion}
                    </div>
                  </div>
                )}

                {/* Typing indicator — 3 animated dots */}
                {showThinking && (
                  <div style={{ display: 'flex', gap: 6, paddingTop: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--color-brand-primary)',
                          animation: `typingDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Voice transcript bubble */}
                {voiceTranscript && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', animation: 'fadeSlideUp 0.3s ease' }}>
                    <div
                      style={{
                        background: 'var(--color-brand-primary-light)',
                        borderRadius: 12,
                        padding: 10,
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: 'var(--font-size-body-m)',
                        lineHeight: 'var(--line-height-body-m)',
                        color: 'var(--color-text-secondary)',
                        textAlign: 'right',
                      }}
                    >
                      {voiceTranscript}
                      {voicePhase === 'transcribing' && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: 2,
                            height: 14,
                            background: 'var(--color-brand-primary)',
                            marginLeft: 2,
                            animation: 'voiceCursor 1s ease-in-out infinite',
                            verticalAlign: 'text-bottom',
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Voice thinking dots */}
                {voicePhase === 'thinking' && (
                  <div style={{ display: 'flex', gap: 6, paddingTop: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--color-brand-primary)',
                          animation: `typingDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Voice AI response */}
                {voicePhase === 'answering' && voiceResponse && (
                  <div style={{ animation: 'fadeSlideUp 0.5s ease', width: '100%' }}>
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
                      {voiceResponse}
                    </p>
                  </div>
                )}

                <style>{`
                  @keyframes typingDot {
                    0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
                    40% { opacity: 1; transform: scale(1); }
                  }
                  @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes voiceCursor {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                  @keyframes pulseRing {
                    0% { transform: scale(1); opacity: 0.4; }
                    100% { transform: scale(1.8); opacity: 0; }
                  }
                  @keyframes waveBar {
                    0%, 100% { transform: scaleY(0.4); }
                    50% { transform: scaleY(1); }
                  }
                  @keyframes voiceWaveFlow {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-8%); }
                    50% { transform: translateX(-16%); }
                    75% { transform: translateX(-8%); }
                    100% { transform: translateX(0); }
                  }
                  @keyframes voiceWaveFlow2 {
                    0% { transform: translateX(0); }
                    30% { transform: translateX(-10%); }
                    70% { transform: translateX(-5%); }
                    100% { transform: translateX(0); }
                  }
                `}</style>
              </div>
            </div>

            {/* Quick action chips — separator + chips row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-xs)',
                alignItems: 'center',
                flexShrink: 0,
                width: '100%',
              }}
            >
              <div
                style={{ width: '100%', height: 1, background: '#e0e0e0' }}
              />
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                {chips.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveChip(label)}
                    style={{
                      height: 36,
                      padding: '0 var(--space-sm)',
                      background: 'var(--color-brand-primary-light)',
                      border: '1px solid #b0c4e8',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: 'var(--font-size-body-m)',
                      lineHeight: 'var(--line-height-body-m)',
                      color: 'var(--color-brand-primary)',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — white bg, gap 4, pb 24 */}
      <div
        style={{
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2xs)',
          alignItems: 'center',
          paddingBottom: 'var(--space-lg)',
          flexShrink: 0,
        }}
      >
        {/* Unified TalkBar — morphs between text and voice modes */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-xs)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 var(--space-md)',
            width: '100%',
            height: 48,
          }}
        >
          {/* Left: Paperclip — collapses in voice mode */}
          <div
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginLeft: voicePhase != null ? -36 : 0,
              opacity: voicePhase != null ? 0 : 1,
              transition: voicePhase != null
                ? 'opacity 0.2s ease, margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0.15s'
                : 'margin-left 0s, opacity 0s ease 0.2s',
              pointerEvents: voicePhase != null ? 'none' : 'auto',
            }}
          >
            <img
              src={iconPaperclip}
              alt="Anexar"
              style={{ width: 24, height: 24, display: 'block', color: 'var(--color-text-tertiary)', flexShrink: 0 }}
            />
          </div>

          {/* Center: Input (text mode) / Waveform bar (voice mode) */}
          <div
            style={{
              flex: 1,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 0,
              position: 'relative',
            }}
          >
            {/* Text input — collapses in voice mode */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: voicePhase != null ? 0 : 1,
                transform: voicePhase != null ? 'scaleX(0.8)' : 'scaleX(1)',
                transition: 'opacity 0.3s ease, transform 0.35s ease',
                pointerEvents: voicePhase != null ? 'none' : 'auto',
                position: voicePhase != null ? 'absolute' : 'relative',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Faça uma pergunta..."
                style={{
                  height: 32,
                  width: '100%',
                  border: inputFocused
                    ? '2px solid var(--color-brand-primary)'
                    : '1.5px solid var(--color-text-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0 10px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: 12,
                  color: 'var(--color-text-primary)',
                  background: 'transparent',
                  outline: 'none',
                }}
              />
            </form>
            {/* Waveform bar — fades in during voice mode */}
            <div
              onClick={handleVoiceTap}
              role="button"
              tabIndex={0}
              style={{
                position: voicePhase != null ? 'relative' : 'absolute',
                width: '100%',
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-brand-primary-light)',
                border: '1.5px solid var(--color-brand-primary)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: voicePhase != null ? 1 : 0,
                transform: voicePhase != null ? 'scaleX(1)' : 'scaleX(0.8)',
                transition: 'opacity 0.35s ease 0.05s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
                pointerEvents: voicePhase != null ? 'auto' : 'none',
                cursor: voicePhase != null ? 'pointer' : 'default',
              }}
            >
              {/* Voice waveform — filled wave like audio visualizer */}
              {voicePhase === 'listening' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    borderRadius: 'inherit',
                  }}
                >
                  {/* Primary filled wave — 30% bottom with fade-out gradient */}
                  <svg
                    viewBox="0 0 800 100"
                    preserveAspectRatio="none"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '-100%',
                      width: '300%',
                      height: '30%',
                      animation: 'voiceWaveFlow 3s ease-in-out infinite',
                    }}
                  >
                    <defs>
                      <linearGradient id="waveGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
                        <stop offset="40%" stopColor="var(--color-brand-primary)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0.12" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,55 C10,40 25,20 40,25 C55,30 65,55 80,68 C95,78 110,82 125,75 C140,65 155,38 170,22 C185,20 200,35 215,48 C230,60 245,78 260,78 C275,74 290,50 305,32 C320,22 335,25 350,40 C365,52 380,70 395,78 C410,82 425,75 440,60 C455,42 470,22 485,20 C500,24 515,42 530,60 C545,74 560,82 575,76 C590,65 605,38 620,22 C635,20 650,30 665,48 C680,65 695,80 710,78 C725,72 740,45 755,28 C770,20 785,30 800,55 L800,100 L0,100 Z"
                      fill="url(#waveGrad1)"
                    />
                  </svg>
                  {/* Secondary filled wave — different rhythm, 30% bottom */}
                  <svg
                    viewBox="0 0 800 100"
                    preserveAspectRatio="none"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '-60%',
                      width: '300%',
                      height: '30%',
                      animation: 'voiceWaveFlow2 3.5s ease-in-out infinite',
                    }}
                  >
                    <defs>
                      <linearGradient id="waveGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
                        <stop offset="45%" stopColor="var(--color-brand-primary)" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0.06" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,50 C15,35 30,18 50,22 C70,28 85,52 100,65 C115,78 130,76 150,60 C170,42 185,20 205,18 C225,22 240,40 260,58 C280,72 295,80 315,70 C335,52 350,25 370,18 C390,20 405,38 425,55 C445,70 460,80 480,72 C500,58 515,30 535,18 C555,20 570,36 590,52 C610,68 625,80 645,74 C665,60 680,32 700,18 C720,18 735,32 755,48 C775,66 790,80 800,50 L800,100 L0,100 Z"
                      fill="url(#waveGrad2)"
                    />
                  </svg>
                </div>
              )}
              {/* Status text */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-caption)',
                  lineHeight: 'var(--line-height-caption)',
                  color: 'var(--color-brand-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {voicePhase === 'idle' && 'Toque para falar'}
                {voicePhase === 'listening' && 'A ouvir...'}
                {voicePhase === 'transcribing' && 'A transcrever...'}
                {voicePhase === 'thinking' && 'A pensar...'}
                {voicePhase === 'answering' && 'Toque para falar'}
              </span>
            </div>
          </div>

          {/* Right: Voice button / Close button — morphs between states */}
          <div
            style={{
              flexShrink: 0,
              width: 36,
              height: 36,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Voice waveform button — visible in text mode */}
            <button
              type="button"
              onClick={() => setVoicePhase('listening')}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'var(--color-brand-primary)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: voicePhase != null ? 0 : 1,
                transform: voicePhase != null ? 'scale(0.5) rotate(90deg)' : 'scale(1) rotate(0)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                pointerEvents: voicePhase != null ? 'none' : 'auto',
              }}
            >
              <div style={{ display: 'flex', gap: 2, alignItems: 'center', height: 16 }}>
                {[0.6, 0.9, 1, 0.7, 0.5].map((baseHeight, i) => (
                  <div
                    key={i}
                    style={{
                      width: 2,
                      height: `${100 * baseHeight}%`,
                      borderRadius: 2,
                      background: 'white',
                    }}
                  />
                ))}
              </div>
            </button>
            {/* Close button — visible in voice mode */}
            <button
              type="button"
              onClick={handleVoiceClose}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: voicePhase != null ? 1 : 0,
                transform: voicePhase != null ? 'scale(1) rotate(0)' : 'scale(0.5) rotate(-90deg)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                pointerEvents: voicePhase != null ? 'auto' : 'none',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Danger alert modal overlay */}
      {showDangerModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-xl)',
            animation: 'overlay-backdrop-fade 300ms ease-in',
          }}
        >
          <div
            style={{
              background: 'var(--color-neutral-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)',
              maxWidth: 300,
              width: '100%',
              boxShadow: '0px 16px 48px rgba(0,0,0,0.2)',
            }}
          >
            {/* Danger icon */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--color-danger-bg, #fef2f2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="var(--color-danger-text, #991b1b)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-title-m)',
                lineHeight: 'var(--line-height-title-m)',
                color: 'var(--color-danger-text, #991b1b)',
                textAlign: 'center',
              }}
            >
              Alerta de segurança
            </p>

            {/* Message */}
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                fontSize: 'var(--font-size-body-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
              }}
            >
              {med.banner.text}
            </p>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => setShowDangerModal(false)}
              style={{
                width: '100%',
                height: 44,
                background: 'var(--color-danger-text, #991b1b)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-body-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
