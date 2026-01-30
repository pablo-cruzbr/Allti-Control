'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './documentacaoTecnica.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { ModalContext } from '@/provider/compras';
import { DocumentacaoTecnicaProps } from '@/lib/getDocumentacaoTecnica.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { LuRefreshCcw } from "react-icons/lu";


interface Props {
  DocumentacaoTecnica: DocumentacaoTecnicaProps[];
}

export default function DocumentacaoTecnicaList({ DocumentacaoTecnica}: Props) {
  const { openModal } = useGlobalModal();
  
  const router = useRouter(); 

   async function handleDetailDocumentacaoTecnica(documentacaoTecnica: DocumentacaoTecnicaProps) {
        openModal('documentacaoTecnica', [documentacaoTecnica]);
      }

  function getStatusCliente(status: string | { name: string | string }): string {
  if (typeof status === 'string') {
    return status;
  }

  // Verifica se name existe e é uma string
  if (status && typeof status.name === 'string') {
    return status.name;
  }

  return '-';
}
  
  async function handleAddCardDocumentacaoTecnica(){
    //alert('TESTE!!!!')
    router.push('/dashboard/formulariosadd/formularioDocumentacaoTecnica');
  }

  
function handlerefresh(){
    router.refresh();
  }

  async function handleDeleteCardDocumentacaoTecnica(id: string) {
    try {
      const token = getCookieClient();

      await api.delete(`/deletedocumentacaotecnica/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id,
        },
      });

      console.log("Removido com sucesso:", id);
      router.refresh(); //Atualiza a Pagina logo após apagar o card.

    } catch (error) {
      console.error("Erro ao deletar a compra:", error);
    }
  }

  return (
    <section>
    <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Documentação Tecnica</h1>

        <div className={styles.actions}>
            <button className={styles.button}
            onClick={handleAddCardDocumentacaoTecnica}
            >Criar Nova Documentação</button>
            <LuRefreshCcw onClick={handlerefresh} className={styles.refresh}/>
        </div>
    </div>

    
      <div className={styles.listContainer}> 
       {DocumentacaoTecnica.map((documentacaotecnica, index) => (
    <div
         key={documentacaotecnica.id ?? `doc-${index}`} 
        onClick={() => handleDetailDocumentacaoTecnica(documentacaotecnica)}
        className={styles.list}
  >
    <div className={styles.clientDetail}>
      <p className={`${styles.field} ${styles.name}`}>
        <strong>Titulo: </strong>{documentacaotecnica.titulo}
      </p>

       <p className={`${styles.field} ${styles.name}`}>
        <strong>Tecnico: </strong> {documentacaotecnica.tecnico.name} 
      </p>
      
      <p className={`${styles.field} ${styles.tecnico}`}>
        <strong>Cliente: </strong> {documentacaotecnica.cliente.name} 
      </p>
      <p className={`${styles.field} ${styles.data}`}>
                <strong>Data/Hora:</strong>{" "}
                    {documentacaotecnica.created_at
                  ? new Date(documentacaotecnica.created_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Não informado"}
              </p>
      <FaRegTrashAlt
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteCardDocumentacaoTecnica(documentacaotecnica.id)
    
        }}
        className={styles.iconTrash}
      />
    </div>
  </div>
))}
      </div>
     
    </section>
  );
}
