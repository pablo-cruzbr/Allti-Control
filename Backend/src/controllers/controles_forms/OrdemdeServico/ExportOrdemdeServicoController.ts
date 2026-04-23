import { Request, Response } from "express";
import { ListOrdemdeServicoService } from "../../../services/controles_forms/OrdemdeServico/ListOrdemdeServicoService";
import ExcelJS from "exceljs";

class ExportOrdemdeServicoController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id as string;
    const { startDate, endDate, cliente_id, instituicao_id } = req.query;

    const listService = new ListOrdemdeServicoService();

    // 1. Reutilizamos o Service de Listagem para pegar os dados filtrados
    const { controles } = await listService.execute({
      user_id,
      startDate: startDate as string,
      endDate: endDate as string,
      cliente_id: cliente_id as string,
      instituicao_id: instituicao_id as string,
    });

    // 2. Iniciamos a criação da Planilha
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Relatório de OS");

    // 3. Definimos as colunas (Headers)
    worksheet.columns = [
      { header: "Nº OS", key: "numeroOS", width: 10 },
      { header: "DATA CADASTRO", key: "created_at", width: 20 },
      { header: "TAREFA", key: "tarefa", width: 25 },
      { header: "CLIENTE", key: "cliente", width: 30 },
      { header: "UNIDADE", key: "unidade", width: 30 },
      { header: "TÉCNICO", key: "tecnico", width: 20 },
      { header: "STATUS", key: "status", width: 15 },
      { header: "HISTÓRICO/DESCRIÇÃO", key: "descricao", width: 50 },
    ];

    // 4. Mapeamos os dados do banco para as linhas do Excel
    controles.forEach((os) => {
      worksheet.addRow({
        numeroOS: os.numeroOS || "N/A",
        created_at: os.created_at ? new Date(os.created_at).toLocaleString('pt-BR') : "",
        tarefa: os.tarefa?.name || "Não definida",
        cliente: os.cliente?.name || "Sem Cliente",
        unidade: os.instituicaoUnidade?.name || "Sem Unidade",
        tecnico: os.tecnico?.name || os.nameTecnico || "Não Atribuído",
        status: os.statusOrdemdeServico?.name || "N/A",
        descricao: os.descricaodoProblemaouSolicitacao || "",
      });
    });

    // Estilização básica do cabeçalho
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // 5. Configuramos o Response para Download de Arquivo
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + `Relatorio_OS_${Date.now()}.xlsx`
    );

    // Escreve o buffer e envia para o cliente
    await workbook.xlsx.write(res);
    res.status(200).end();
  }
}

export { ExportOrdemdeServicoController };