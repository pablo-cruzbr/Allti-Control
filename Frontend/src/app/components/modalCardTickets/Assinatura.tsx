"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import styles from "../modalCardCompras/editForm.module.scss";
import { OrdemdeServicoProps } from "@/lib/getOrdemdeServico.type";
import { getCookieClient } from "@/lib/cookieClient";
import { FaSignature } from "react-icons/fa";

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
  const [fotos, setFotos] = useState<FotoProps[]>([]);
  const [selectedFoto, setSelectedFoto] = useState<{ id: string; url: string } | null>(null);
  
  const [assinaturaUrl, setAssinaturaUrl] = useState<string | null>(
    ordemdeServico.bannerassinatura || null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getCookieClient();

        if (!assinaturaUrl) {
          const res = await api.get(`/assinatura/${ordemdeServico.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          const url = res.data?.bannerassinatura || res.data?.assinatura || res.data?.assinaturaDigital;
          if (url) setAssinaturaUrl(url);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [ordemdeServico.id, ordemdeServico.bannerassinatura]);

  return (
    <div className={styles.editForm}>
      <h3 className={styles.detailTitle}>
        <FaSignature size={20} className={styles.icon} />
        Assinatura Digital
      </h3>

      <div className={styles.detailContent}>
        <div className={styles.fotosGrid}>
          {assinaturaUrl ? (
            <div 
              className={styles.fotoCard} 
              onClick={() => setSelectedFoto({ id: "assinatura", url: assinaturaUrl })}
            >
              <img 
                src={assinaturaUrl} 
                alt="Assinatura" 
                onError={(e) => console.log("Erro ao carregar imagem:", assinaturaUrl)}
              />
              <p className={styles.labelFoto}>Assinatura Capturada</p>
            </div>
          ) : (
            <p className={styles.emptyText}>Nenhuma assinatura encontrada para esta OS.</p>
          )}

          {fotos.map((foto) => (
            <div key={foto.id} className={styles.fotoCard} onClick={() => setSelectedFoto(foto)}>
              <img src={foto.url} alt="Foto da OS" />
            </div>
          ))}
        </div>

        <div className={styles.infoAssinante} style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
          <p><strong>Quem Assinou:</strong> {ordemdeServico.assinante || "Não informado"}</p>
        </div>
      </div>

      <div className={styles.buttonArea}>
        <button className={styles.cancelButton} onClick={onClose} type="button">
          Fechar
        </button>
      </div>

      {selectedFoto && (
        <div className={styles.lightbox} onClick={() => setSelectedFoto(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxActions}>
              <button className={styles.closeBtn} onClick={() => setSelectedFoto(null)}>✕</button>
            </div>
            <img src={selectedFoto.url} alt="Visualização" style={{ backgroundColor: '#fff' }} />
          </div>
        </div>
      )}
    </div>
  );
}