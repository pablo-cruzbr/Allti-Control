'use client';

import { useGlobalModal } from "@/provider/GlobalModalProvider";
import { ModalCompras } from './modalCardCompras';
import { ModalAssistenciaTecnica } from './modalCardAssistenciaTecnica';
import { ModalLaudoTecnico } from "./modalCardLaudoTecnico";
import { ModalLaboratorio } from "./modalCardLaboratorio";
import { ModalMaquinasPendentesLab } from "./modalCardMaquinasPendentesLab";
import { ModalMaquinasPendentesOro } from "./modalCardMaquinasPendentesOro";
import { ModalDocumentacaoTecnica } from "./modalCardDocumentacaoTecnica";
import { ModalOrdemdeServico } from "./modalCardTickets";
import { ModalCardEstabilizadores } from "./modalCardEstabilizadores";
export default function GlobalModal() {
  const { isOpen, modalType, modalData, closeModal } = useGlobalModal();

  if (!isOpen) return null;

  return (
    <dialog open style={{ zIndex: 999, background: 'white' }}>
      {modalType === 'compras' && <ModalCompras data={modalData} />}
      {modalType === 'assistencia' && <ModalAssistenciaTecnica data={modalData} />}
      {modalType === 'laudotecnico' && <ModalLaudoTecnico data={modalData}/>}
      {modalType === 'laboratorio' && <ModalLaboratorio data={modalData}/>}
      {modalType === 'maquinasPendentesLab' && <ModalMaquinasPendentesLab data={modalData}/>}
      {modalType === 'maquinasPendentesOro' && <ModalMaquinasPendentesOro data={modalData}/>}
      {modalType === 'documentacaoTecnica' && <ModalDocumentacaoTecnica data={modalData}/>}
      {modalType === 'OrdemdeServico' && <ModalOrdemdeServico data={modalData}/>}
      {modalType === 'Estabilizadores' && <ModalCardEstabilizadores data={modalData}/>}
    </dialog>
  );
}
