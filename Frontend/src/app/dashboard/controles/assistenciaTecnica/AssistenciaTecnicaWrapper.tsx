'use client';

import { ModalProvider } from '@/provider/AssistenciaTecnica';
import AssistenciaTecnicaList from './AssistenciaTecnicaList';
import { AssistenciaTecnicaResponse } from '@/lib/getAssistenciaTecnica.type';

interface Props {
  assistenciaData: AssistenciaTecnicaResponse;
}

export default function AssistenciaTecnicaWrapper({ assistenciaData }: Props) {
  return (
    <ModalProvider>
      <AssistenciaTecnicaList assistenciaData={assistenciaData} />
    </ModalProvider>
  );
}
