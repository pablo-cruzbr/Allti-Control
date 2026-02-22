"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGlobalModal } from "@/provider/GlobalModalProvider";
import { MaquinasPendentesOroProps } from "@/lib/getMaquinasPendentesOro.type";
import EditMaquinasPendentesOroForm from "./EditCardMaquinasPendentesOro";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface ModalMaquinasPendentesOroProps {
  data: MaquinasPendentesOroProps[];
}

export function ModalMaquinasPendentesOro({ data }: ModalMaquinasPendentesOroProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const maquinasOro: MaquinasPendentesOroProps | undefined = modalData?.[0] || modalData;
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  function handleRefresh() {
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (modalType === "maquinasPendentesOro" && !maquinasOro) {
      closeModal();
    }
  }, [maquinasOro, modalType, closeModal]);

  if (modalType !== "maquinasPendentesOro" || !isOpen || !maquinasOro) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          <h2>DETALHES DE MÁQUINAS PENDENTES ORO</h2>

          {isEditing ? (
            <EditMaquinasPendentesOroForm
              maquinasPendentesOro={maquinasOro}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <>
              <span className={styles.itemSolicitado}>
                <p className={styles.item}>
                  <b>Patrimônio do Equipamento:</b>
                  <span>{maquinasOro.equipamento?.patrimonio ?? "-"}</span>
                </p>
                <p className={styles.item}>
                  <b>Nome do Equipamento:</b>
                  <span>{maquinasOro.equipamento?.name ?? "-"}</span>
                </p>
                <p className={styles.item}>
                  <b>Data da Instalação:</b>
                  <span>
                    {maquinasOro.datadaInstalacao
                      ? new Date(maquinasOro.datadaInstalacao).toLocaleDateString("pt-BR")
                      : "-"}
                  </span>
                </p>
                <p className={styles.item}>
                  <b>OS de Instalação:</b>
                  <span>{maquinasOro.osInstalacao ?? "-"}</span>
                </p>
                <p className={styles.item}>
                  <b>OS de Retirada:</b>
                  <span>{maquinasOro.osRetirada ?? "-"}</span>
                </p>
                <p className={styles.item}>
                  <b>Status:</b>
                  <span>{maquinasOro.statusMaquinasPendentesOro?.name ?? "-"}</span>
                </p>
                <p className={styles.item}>
                  <b>Instituição/Unidade:</b>
                  <span>{maquinasOro.instituicaoUnidade?.name ?? "-"}</span>
                </p>
                <p className={styles.item}>
                  <b>Data de Criação:</b>
                  <span>
                    {maquinasOro.created_at
                      ? new Date(maquinasOro.created_at).toLocaleDateString("pt-BR")
                      : "-"}
                  </span>
                </p>
              </span>

              <div className={styles.areaButton}>
                <button
                  className={styles.buttonBuy}
                  onClick={() => setIsEditing(true)}
                >
                  <HiOutlinePencilSquare className={styles.icon} />
                  Editar
                </button>
                <button
                  className={styles.buttonBuy}
                  onClick={handleRefresh}
                >
                  Concluir e Fechar
                </button>
              </div>
            </>
          )}
        </article>
      </section>
    </dialog>
  );
}
