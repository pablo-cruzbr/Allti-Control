'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from './editForm.module.scss';
import { ComprasProps } from "@/lib/getCompras.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";


type Status = {
  id: string;
  name: string;
};

type Props = {
  compra: ComprasProps;
  onClose: () => void;
};

export default function EditComprasForm({ compra, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    itemSolicitado: compra.itemSolicitado,
    solicitante: compra.solicitante,
    motivoDaSolicitacao: compra.motivoDaSolicitacao,
    preco: compra.preco,
    linkDeCompra: compra.linkDeCompra,
    statusCompras_id: (compra.statusCompras as any)?.id || '',
  });

  const [statusList, setStatusList] = useState<Status[]>([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = await getCookieClient();
        const response = await api.get('/liststatuscompras', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatusList(response.data);
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      }
    };

    fetchStatus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async () => {
  try {
    const token = await getCookieClient();

    await api.patch(
      `/compra/update/${compra.id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Card atualizado com sucesso!");
    onClose();
    router.refresh();
    
  } catch (err: any) {
  console.error("Erro ao atualizar:", err?.response?.data ?? err?.message ?? String(err));
  alert("Erro ao atualizar os dados.");
}
};


  return (
    <div className={styles.editForm}>
      
      <h3>
        <HiOutlinePencilSquare className={styles.icon}/>
        Editar Card</h3>

      <input
        type="text"
        name="itemSolicitado"
        value={form.itemSolicitado}
        onChange={handleChange}
        placeholder="Item Solicitado"
      />

      <input
        type="text"
        name="solicitante"
        value={form.solicitante}
        onChange={handleChange}
        placeholder="Solicitante"
      />

      <input
        type="text"
        name="motivoDaSolicitacao"
        value={form.motivoDaSolicitacao}
        onChange={handleChange}
        placeholder="Motivo da Solicitação"
      />

      <input
        type="number"
        name="preco"
        value={form.preco}
        onChange={handleChange}
        placeholder="Preço"
      />

      <input
        type="text"
        name="linkDeCompra"
        value={form.linkDeCompra}
        onChange={handleChange}
        placeholder="Link de Compra"
      />
  <p>Selecione o Status: </p>
      <select
        name="statusCompras_id"
        value={form.statusCompras_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione o status</option>
        {statusList.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>

      <div className={styles.buttonArea}>
        <button onClick={handleSubmit}>
          <FaRegSave className={styles.iconButton}/>
          Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
