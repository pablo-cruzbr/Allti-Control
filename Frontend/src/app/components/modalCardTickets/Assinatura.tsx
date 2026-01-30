"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import styles from "../modalCardCompras/editForm.module.scss";
import { OrdemdeServicoProps } from "@/lib/getOrdemdeServico.type";
import { getCookieClient } from "@/lib/cookieClient";
import { FaSignature } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";

type Status = { id: string; name: string };
type Tecnicos = { id: string; name: string };

type Props = {
  ordemdeServico: OrdemdeServicoProps;
  onClose: () => void;
};

type FotoProps = {
  id: string;
  url: string;
  ordemdeServico_id: string;
};

export default function Assinatura({ ordemdeServico, onClose }: Props) {
  const router = useRouter();

  const [fotos, setFotos] = useState<FotoProps[]>([]);
  const [selectedFoto, setSelectedFoto] = useState<FotoProps | null>(null);
  const [assinaturaUrl, setAssinaturaUrl] = useState<string | null>(null);
  const [assinante, setAssinante] = useState<string | null>(null)


  // Buscar fotos
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await getCookieClient();

      // Buscar assinatura
      const assinaturaRes = await api.get(`/assinatura/${ordemdeServico.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Assinatura GET:", assinaturaRes.data);

      setAssinaturaUrl(assinaturaRes.data.assinatura || null);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  fetchData();
}, [ordemdeServico.id]);


  // Função para deletar foto
  const handleDeleteFoto = async (id: string) => {
    try {
      const token = await getCookieClient();

      await api.delete(`/foto/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Atualiza estado local (remove a foto sem precisar recarregar a página)
      setFotos((prev) => prev.filter((foto) => foto.id !== id));
      setSelectedFoto(null);
    } catch (error) {
      console.error("Erro ao deletar foto:", error);
    }
  };

  return (
    <div className={styles.editForm}>
      <h3>
        <FaSignature size={20} className={styles.icon} />
        Assinatura da Ordem de Serviço:
      </h3>
     
 <div className={styles.fotosGrid}>
  {assinaturaUrl && (
    <div className={styles.fotoCard} onClick={() => setSelectedFoto({ id: "assinatura", url: assinaturaUrl, ordemdeServico_id: ordemdeServico.id })}>
      <img src={assinaturaUrl} alt="Assinatura" />
    </div>
     
  )}
  <p>Quem Assinou: {ordemdeServico.assinante || "Sem Assinatura"}</p> 

  {fotos == null ? (
    <p>Carregando imagens...</p>
  ) : Array.isArray(fotos) && fotos.length > 0 ? (
    fotos.map((foto) => (
      <div key={foto.id} className={styles.fotoCard} onClick={() => setSelectedFoto(foto)}>
        <img src={foto.url} alt={`Foto ${foto.id}`} />
      </div>
    ))
  ) : (
    !assinaturaUrl && <p>Nenhuma Assinatura adicionada para esta ordem.</p>
  )}
</div>



      <div className={styles.buttonArea}>
        <button onClick={onClose} type="button">
          Fechar
        </button>
      </div>

      {selectedFoto && (
        <div className={styles.lightbox} onClick={() => setSelectedFoto(null)}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
             <div className={styles.lightboxActions}>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteFoto(selectedFoto.id)}>🗑 Excluir
              </button>

              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedFoto(null)}>✕
              </button>
            </div>

            <img src={selectedFoto.url} alt="Visualização" />
           
          </div>
        </div>
      )}
    </div>
  );
}
