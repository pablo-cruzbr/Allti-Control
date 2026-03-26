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
import { ModalCliente } from "./modalCliente";

import { useEffect } from "react";

export default function GlobalModal() {
  const { isOpen, modalType, modalData, closeModal } = useGlobalModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !modalType) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={closeModal}
    >
      <div 
        style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={closeModal}
          style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
        >
          ✖
        </button>

        {modalType === 'compras' && <ModalCompras data={modalData} />}
        {modalType === 'assistencia' && <ModalAssistenciaTecnica data={modalData} />}
        {modalType === 'laudotecnico' && <ModalLaudoTecnico data={modalData}/>}
        {modalType === 'laboratorio' && <ModalLaboratorio data={modalData}/>}
        {modalType === 'maquinasPendentesLab' && <ModalMaquinasPendentesLab data={modalData}/>}
        {modalType === 'maquinasPendentesOro' && <ModalMaquinasPendentesOro data={modalData}/>}
        {modalType === 'documentacaoTecnica' && <ModalDocumentacaoTecnica data={modalData}/>}
        {modalType === 'OrdemdeServico' && <ModalOrdemdeServico data={modalData}/>}
        {modalType === 'Estabilizadores' && <ModalCardEstabilizadores data={modalData}/>}
        {modalType === 'cliente' && <ModalCliente data={modalData}/>}
      </div>
    </div>
  );
}
