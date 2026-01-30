'use client';

import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { AssistenciaTecnicaProps } from '../../../lib/getAssistenciaTecnica.type';
import { useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import EditAssistenciaTecnicaForm from './EditCardAssistenciaTecnicaForm';

interface ModalAssistenciaTecnicaProps {
  data: AssistenciaTecnicaProps[];
}

export function ModalAssistenciaTecnica({ data }: ModalAssistenciaTecnicaProps) {
  const { closeModal } = useGlobalModal();
  const assist = data?.[0];
  const [IsEditing, setIsEditing] = useState(false)
  const router = useRouter();

  function handleRefresh(){
  router.refresh();
  closeModal();
}

  if (!assist) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#526D82" />
          </button>
          <h2>DETALHES DO CARD ASSISTÊNCIA TÉCNICA</h2>

         {IsEditing ? (
            <EditAssistenciaTecnicaForm
               assistenciaTecnica={assist}
              onClose={() => setIsEditing(false)}
                />
              ):(
          <>

          <p className={styles.item}>
              <b>Data de Retirada:</b> <span>{assist.dataDeRetirada ? new Date(assist.dataDeRetirada).toLocaleDateString('pt-BR') : '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Mes e Ano:</b> <span>
                {assist.mesAno
                  ? new Date(assist.mesAno).toLocaleDateString('pt-BR', {
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : '-'}
              </span>
            </p>

          <span className={styles.itemSolicitado}>
            <p className={styles.item}>
              <b>Cliente:</b> {assist.cliente?.name ?? 'Não informado'}
            </p>
          </span>

          <section className={styles.content}>
            
             <p className={styles.item}>
              <b>Nome:</b> <span>{assist.name ?? '-'}</span>
            </p>


            <p className={styles.item}>
              <b>Observações:</b> <span>{assist.observacoes ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Assistência:</b> <span>{assist.assistencia ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>OS da Assistência:</b> <span>{assist.osDaAssistencia ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Equipamento:</b> <span>{assist.equipamento?.name ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Patrimônio do Equipamento:</b> <span>{assist.equipamento?.patrimonio ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Instituição / Unidade:</b> <span>{assist.instituicaoUnidade?.name ?? '-'}</span>
            </p>

           

            <p className={styles.item}>
              <b>Técnico Responsável:</b> <span>{assist.tecnico?.name ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Nome do Chamado:</b> <span>{assist.idChamado ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Status:</b> <span>{typeof assist.statusReparo === 'object' ? assist.statusReparo?.name : assist.statusReparo ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Data de Criação:</b> <span>{assist.created_at ? new Date(assist.created_at).toLocaleString('pt-BR') : '-'}</span>
            </p>
          </section>

          <div className={styles.areaButton}>

             <button
            className={styles.buttonBuy}
            onClick={() => setIsEditing(true)}
            >
              <HiOutlinePencilSquare className={styles.icon}/>
              Editar
            </button>

            <button className={styles.buttonBuy} onClick={handleRefresh}>Concluir e Fechar</button>
          </div>
          </> 
          )}
        </article>
      </section>
    </dialog>
  );
}