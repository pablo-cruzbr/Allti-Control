-- CreateEnum
CREATE TYPE "StatusReparo" AS ENUM ('AGUARDANDO_REPARO', 'REPARO_FINALIZADO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT,
    "setor_id" TEXT,
    "instituicao_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "setores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instituicaoUnidade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instituicaoUnidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipoDeSolicitacao" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipoDeSolicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tecnico" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdemdeServico" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "problemaOuSolicitacao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT,
    "tecnico_id" TEXT NOT NULL,
    "statusOrdemdeServico_id" TEXT NOT NULL,
    "tipodesolicitacao_id" TEXT NOT NULL,
    "instituicaoUnidade_id" TEXT NOT NULL,

    CONSTRAINT "OrdemdeServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormTecnico" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "solucao" TEXT NOT NULL,
    "assinatura" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "statusOrdemdeServico_id" TEXT NOT NULL,
    "ordemDeServico_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormTecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipamento" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "patrimonio" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controleDeAssistenciaTecnica" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mesAno" TIMESTAMP(3) NOT NULL,
    "idChamado" TEXT NOT NULL,
    "assistencia" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "osDaAssistencia" TEXT NOT NULL,
    "dataDeRetirada" TIMESTAMP(3) NOT NULL,
    "status" "StatusReparo" NOT NULL DEFAULT 'AGUARDANDO_REPARO',
    "equipamento_id" TEXT NOT NULL,
    "instituicaoUnidade_id" TEXT NOT NULL,
    "tecnico_id" TEXT NOT NULL,
    "cliente_id" TEXT,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "controleDeAssistenciaTecnica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controleDeLaudoTecnico" (
    "id" TEXT NOT NULL,
    "descricaodoProblema" TEXT NOT NULL,
    "mesAno" TIMESTAMP(3) NOT NULL,
    "osLab" TEXT NOT NULL,
    "instituicaoUnidade_id" TEXT NOT NULL,
    "equipamento_id" TEXT NOT NULL,
    "tecnico_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "controleDeLaudoTecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controleDeLaboratio" (
    "id" TEXT NOT NULL,
    "nomedoEquipamento" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "defeito" TEXT NOT NULL,
    "osDeAbertura" TEXT NOT NULL,
    "osDeDevolucao" TEXT NOT NULL,
    "data_de_Chegada" TIMESTAMP(3) NOT NULL,
    "data_de_Finalizacao" TIMESTAMP(3) NOT NULL,
    "statusControledeLaboratorio_id" TEXT NOT NULL,
    "instituicao_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "equipamento_id" TEXT NOT NULL,

    CONSTRAINT "controleDeLaboratio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusControledeLaboratorio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statusControledeLaboratorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controleDeMaquinasPendentesLaboratorio" (
    "id" TEXT NOT NULL,
    "numeroDeSerie" TEXT NOT NULL,
    "ssd" TEXT NOT NULL,
    "idDaOs" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "equipamento_id" TEXT NOT NULL,
    "statusMaquinasPendentesLab_id" TEXT NOT NULL,

    CONSTRAINT "controleDeMaquinasPendentesLaboratorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusControledeMaquinasPendentesLab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statusControledeMaquinasPendentesLab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controledeMaquinasPendentesOro" (
    "id" TEXT NOT NULL,
    "datadaInstalacao" TIMESTAMP(3) NOT NULL,
    "osInstalacao" TEXT NOT NULL,
    "osRetirada" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "equipamento_id" TEXT NOT NULL,
    "instituicaoUnidade_id" TEXT NOT NULL,
    "statusMaquinasPendentesOro_id" TEXT NOT NULL,

    CONSTRAINT "controledeMaquinasPendentesOro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusControledeMaquinasPendentesOro" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statusControledeMaquinasPendentesOro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentacaoTecnica" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT,
    "tecnico_id" TEXT NOT NULL,
    "instituicao_id" TEXT,

    CONSTRAINT "documentacaoTecnica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacaoDeCompras" (
    "id" TEXT NOT NULL,
    "itemSolicitado" TEXT NOT NULL,
    "solicitante" TEXT NOT NULL,
    "motivoDaSolicitacao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "linkDeCompra" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "statusCompras_id" TEXT NOT NULL,

    CONSTRAINT "solicitacaoDeCompras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoesDeCompras" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "solicitacoesDeCompras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FormTecnico_ordemDeServico_id_key" ON "FormTecnico"("ordemDeServico_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_instituicao_id_fkey" FOREIGN KEY ("instituicao_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemdeServico" ADD CONSTRAINT "OrdemdeServico_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemdeServico" ADD CONSTRAINT "OrdemdeServico_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemdeServico" ADD CONSTRAINT "OrdemdeServico_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemdeServico" ADD CONSTRAINT "OrdemdeServico_tipodesolicitacao_id_fkey" FOREIGN KEY ("tipodesolicitacao_id") REFERENCES "tipoDeSolicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemdeServico" ADD CONSTRAINT "OrdemdeServico_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_ordemDeServico_id_fkey" FOREIGN KEY ("ordemDeServico_id") REFERENCES "OrdemdeServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" ADD CONSTRAINT "controleDeAssistenciaTecnica_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" ADD CONSTRAINT "controleDeAssistenciaTecnica_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" ADD CONSTRAINT "controleDeAssistenciaTecnica_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" ADD CONSTRAINT "controleDeAssistenciaTecnica_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeLaudoTecnico" ADD CONSTRAINT "controleDeLaudoTecnico_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeLaudoTecnico" ADD CONSTRAINT "controleDeLaudoTecnico_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeLaudoTecnico" ADD CONSTRAINT "controleDeLaudoTecnico_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeLaboratio" ADD CONSTRAINT "controleDeLaboratio_statusControledeLaboratorio_id_fkey" FOREIGN KEY ("statusControledeLaboratorio_id") REFERENCES "statusControledeLaboratorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeLaboratio" ADD CONSTRAINT "controleDeLaboratio_instituicao_id_fkey" FOREIGN KEY ("instituicao_id") REFERENCES "instituicaoUnidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeLaboratio" ADD CONSTRAINT "controleDeLaboratio_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeLaboratio" ADD CONSTRAINT "controleDeLaboratio_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeMaquinasPendentesLaboratorio" ADD CONSTRAINT "controleDeMaquinasPendentesLaboratorio_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeMaquinasPendentesLaboratorio" ADD CONSTRAINT "controleDeMaquinasPendentesLaboratorio_statusMaquinasPende_fkey" FOREIGN KEY ("statusMaquinasPendentesLab_id") REFERENCES "statusControledeMaquinasPendentesLab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controledeMaquinasPendentesOro" ADD CONSTRAINT "controledeMaquinasPendentesOro_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controledeMaquinasPendentesOro" ADD CONSTRAINT "controledeMaquinasPendentesOro_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controledeMaquinasPendentesOro" ADD CONSTRAINT "controledeMaquinasPendentesOro_statusMaquinasPendentesOro__fkey" FOREIGN KEY ("statusMaquinasPendentesOro_id") REFERENCES "statusControledeMaquinasPendentesOro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentacaoTecnica" ADD CONSTRAINT "documentacaoTecnica_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentacaoTecnica" ADD CONSTRAINT "documentacaoTecnica_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentacaoTecnica" ADD CONSTRAINT "documentacaoTecnica_instituicao_id_fkey" FOREIGN KEY ("instituicao_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacaoDeCompras" ADD CONSTRAINT "solicitacaoDeCompras_statusCompras_id_fkey" FOREIGN KEY ("statusCompras_id") REFERENCES "solicitacoesDeCompras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
