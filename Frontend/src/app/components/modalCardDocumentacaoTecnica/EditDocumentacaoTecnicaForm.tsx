'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { DocumentacaoTecnicaProps } from "@/lib/getDocumentacaoTecnica.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Tecnicos = { id: string; name: string };
type Clientes = { id: string; name: string };
type Instituicoes = { id: string; name: string; endereco: string };

type Props = {
  documentacaoTecnica: DocumentacaoTecnicaProps;
  onClose: () => void;
};

export default function EditDocumentacaoForm({ documentacaoTecnica, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    cliente_id: '',
    tecnico_id: '',
    instituicaoUnidade_id: '',
  });

  const [tecnicosList, setTecnicosList] = useState<Tecnicos[]>([]);
  const [clientesList, setClientesList] = useState<Clientes[]>([]);
  const [instituicaoUnidadeList, setInstituicoesList] = useState<Instituicoes[]>([]);
  const [listsLoaded, setListsLoaded] = useState(false);

  // Buscar listas de selects
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = await getCookieClient();
        const [tecnicos, instituicoes, clientes] = await Promise.all([
          api.get('/listtecnico', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/listinstuicao', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/listcliente', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setTecnicosList(tecnicos.data.controles ?? []); // seguindo padrão Assistência Técnica
        setInstituicoesList(instituicoes.data.instituicoes ?? []);
        setClientesList(clientes.data.controles ?? []);
        setListsLoaded(true);
      } catch (error) {
        console.error('Erro ao buscar listas:', error);
      }
    };
    fetchLists();
  }, []);

  // Preencher formulário com os dados existentes
  useEffect(() => {
    if (listsLoaded && documentacaoTecnica) {
      setForm({
        titulo: documentacaoTecnica.titulo ?? '',
        descricao: documentacaoTecnica.descricao ?? '',
        cliente_id: documentacaoTecnica.cliente?.id ?? '', // agora usa id
        tecnico_id: documentacaoTecnica.tecnico?.id ?? '', // agora usa id
        instituicaoUnidade_id: documentacaoTecnica.instituicaoUnidade?.id ?? '', // agora usa id
      });
    }
  }, [listsLoaded, documentacaoTecnica]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getCookieClient();
      await api.patch(
        `documentacaotecnica/update/${documentacaoTecnica.id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Card atualizado com sucesso!");
      onClose();
      router.refresh();
    } catch (err: any) {
      console.error("Erro ao atualizar:", err?.response?.data ?? err?.message ?? String(err));
      alert("Erro ao atualizar os dados.");
    }
  };

  if (!listsLoaded) {
    return (
      <div className={styles.editForm}>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className={styles.editForm}>
      <h3>
        <HiOutlinePencilSquare className={styles.icon} />
        Editar Card
      </h3>

      <p>Título</p>
      <input
        type="text"
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Insira o título"
      />

      <p>Descrição</p>
      <textarea
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        rows={4}
      />

      <p>Cliente</p>
      <select
        name="cliente_id"
        value={form.cliente_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione o cliente</option>
        {clientesList.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.name}
          </option>
        ))}
      </select>

      <p>Técnico</p>
      <select
        name="tecnico_id"
        value={form.tecnico_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione o técnico</option>
        {tecnicosList.map((tecnico) => (
          <option key={tecnico.id} value={tecnico.id}>
            {tecnico.name}
          </option>
        ))}
      </select>

      <p>Instituição Unidade</p>
      <select
        name="instituicaoUnidade_id"
        value={form.instituicaoUnidade_id}
        onChange={handleChange}
        className={styles.input}
      >
        <option value="">Selecione a instituição</option>
        {instituicaoUnidadeList.map((instituicao) => (
          <option key={instituicao.id} value={instituicao.id}>
            {instituicao.name}
          </option>
        ))}
      </select>

      <div className={styles.buttonArea}>
        <button onClick={handleSubmit}>
          <FaRegSave className={styles.iconButton} />
          Salvar
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
