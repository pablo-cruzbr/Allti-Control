import { Router} from "express";
import uploadConfig from './config/multer';

import {CreateUserController} from './controllers/user/CreateUserController'
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./Middleware/isAuthenticated";
import { CreateClienteController } from "./controllers/status categorias/cliente/CreateClienteController";
import { CreateSetorController } from "./controllers/status categorias/setor/CreateSetorController";
import { ListClienteController } from "./controllers/status categorias/cliente/ListClienteController";
import { RemoveClienteController } from "./controllers/status categorias/cliente/RemoveClienteController";
import { ListSetoresController } from "./controllers/status categorias/setor/ListSetoresController";
import { RemoveSetorController } from "./controllers/status categorias/setor/RemoveSetorController";
import { CreateInstituicaoUnidadeController } from "./controllers/status categorias/instituicaoUnidade/CreateInstituicaoUnidadeController";
import { ListInstituicaoUnidadeController } from "./controllers/status categorias/instituicaoUnidade/ListInstituicaoUnidadeController";
import { RemoveInstituicaoUnidadeController } from "./controllers/status categorias/instituicaoUnidade/RemoveInstituicaoUnidadeController";
import { CreateStatusOrdemdeServicoController } from "./controllers/status categorias/statusOrdemdeServico/CreateStatusOrdemdeServicoController";
import { ListStatusOrdemdeServicoController } from "./controllers/status categorias/statusOrdemdeServico/ListStatusOrdemdeServicoController";
import { RemoveStatusOrdemServicoController } from "./controllers/status categorias/statusOrdemdeServico/RemoveStatusOrdemServicoController";
import { CreatetipodeChamadoController } from "./controllers/status categorias/tipodeChamado/CreatetipodeChamadoController";
import { ListtipodeChamadoService } from "./services/status_categorias/tipodeChamado/ListtipodeChamadoService";
import { CreateTecnicoController } from "./controllers/status categorias/tecnico/CreateTecnicoController";
import { ListTecnicoController } from "./controllers/status categorias/tecnico/ListTecnicoController";
import { RemoveTecnicoController } from "./controllers/status categorias/tecnico/RemoveTecnicoController";
import { CreateEquipamentoController } from "./controllers/status categorias/equipamento/CreateEquipamentoController";
import { ListEquipamentoController } from "./controllers/status categorias/equipamento/ListEquipamentoController";
import { RemoveEquipamentoController } from "./controllers/status categorias/equipamento/RemoveEquipamentoController";
import { CreatestatusMaquinasPendentesController } from "./controllers/status categorias/statusMaquinasPendentesLab/CreatestatusMaquinasPendentesController";
import { ListMaquinasPendentesLabController } from "./controllers/status categorias/statusMaquinasPendentesLab/ListMaquinasPendentesLabController";
import { ListMaquinasPendentesOroController } from "./controllers/status categorias/statusMaquinasPendentesOro/ListstatusMaquinasPendentesOroController";
import { CreatestatusMaquinasPendentesOroController } from "./controllers/status categorias/statusMaquinasPendentesOro/CreatestatusMaquinasPendentesOroController";
import { CreatestatusControlledeLaboratorioController } from "./controllers/status categorias/statusControlledeLaboratorio/CreatestatusControlledeLaboratorioController";
import { ListstatusControlleLaboratioController } from "./controllers/status categorias/statusControlledeLaboratorio/ListstatusControlledeLaboratioController";
import { CreateStatusComprasController } from "./controllers/status categorias/statusCompras/CreateStatusComprasController";
import { ListStatusComprasController } from "./controllers/status categorias/statusCompras/ListStatusComprasController";
import { CreateStatusReparoController } from "./controllers/status categorias/statusReparo/CreateStatusReparoController";
import { ListstatusReparoController } from "./controllers/status categorias/statusReparo/LitstatusReparoController";
import { CreateControledeAssistenciaTecnicaController } from "./controllers/controles_forms/ControledeAssistenciaTecnica/CreateControledeAssistenciaTecnicaController";
import { ListControledeAssistenciaTecnicaController } from "./controllers/controles_forms/ControledeAssistenciaTecnica/ListControledeAssistenciaTecnicaController";
import { CreateOrdemServicoController } from "./controllers/controles_forms/OrdemdeServico/CreateOrdemdeServicoController";
import { CreateStatusPrioridadeController } from "./controllers/status categorias/statusUrgencia/CreateStatusPrioridadeController";
import { ListStatusUrgenciaController } from "./controllers/status categorias/statusUrgencia/ListStatusUrgenciaController";
import { DeleteControledeAssistenciaTecnicaController } from "./controllers/controles_forms/ControledeAssistenciaTecnica/DeleteControledeAssistenciaTecnicaController";
import { CreateControledeLaudoTecnicoController } from "./controllers/controles_forms/ControledeLaudoTécnico/CreateControledeLaudoTécnicoController";
import { ListControledeLaudoTecnicoController } from "./controllers/controles_forms/ControledeLaudoTécnico/ListControledeLaudoTecnicoController";
import { DeleteControledeLaudoTecnicoController } from "./controllers/controles_forms/ControledeLaudoTécnico/DeleteControledeLaudoTecnicoController";
import { CreateControledeLaboratorioController } from "./controllers/controles_forms/ControledeLaboratorio/CreateControledeLaboratorioController";
import { ListControledeLaboratorioController } from "./controllers/controles_forms/ControledeLaboratorio/ListControledeLaboratorioController";
import { DeleteControledeLaboratorioController } from "./controllers/controles_forms/ControledeLaboratorio/DeleteControledeLaboratorioController";
import { CreateControledeMaquinasPendentesLabController } from "./controllers/controles_forms/ControledeMaquinasPendentesLab/CreateControledeMaquinasPendentesLabController";
import { ListControledeMaquinasPendentesLabController } from "./controllers/controles_forms/ControledeMaquinasPendentesLab/ListControledeMaquinasPendentesLabController";
import { DeleteControledeMaquinasPendentesLabController } from "./controllers/controles_forms/ControledeMaquinasPendentesLab/DeleteControledeMaquinasPendentesLabController";
import { CreateControledeMaquinasPendentesOroController } from "./controllers/controles_forms/ControledeMaquinasPendentesOro/CreateControledeMaquinasPendentesOroController";
import { ListControledeMaquinasPendentesOroController } from "./controllers/controles_forms/ControledeMaquinasPendentesOro/ListControledeMaquinasPendentesOroController";
import { DeleteControledeMaquinasPendentesOroController } from "./controllers/controles_forms/ControledeMaquinasPendentesOro/DeleteControledeMaquinasPendentesLabController";
import { CreateDocumentacaoTecnicaController } from "./controllers/controles_forms/DocumentacaoTecnica/CreateDocumentacaoTecnicaController";
import { ListDocumentacaoTecnicaController } from "./controllers/controles_forms/DocumentacaoTecnica/ListDocumentacaoTecnicaController";
import { DeleteDocumentacaoTecnicaController } from "./controllers/controles_forms/DocumentacaoTecnica/DeleteDocumentacaoTecnicaController";
import { CreateSolicitacaodeComprasController } from "./controllers/controles_forms/SolicitacaodeCompras/CreateSolicitacaodeComprasController";
import { ListSolicitacaodeComprasController } from "./controllers/controles_forms/SolicitacaodeCompras/ListSolicitacaodeComprasController";
import { DeleteSolicitacaodeComprasController } from "./controllers/controles_forms/SolicitacaodeCompras/DeleteSolicitacaodeComprasController";

import { DetailComprasController } from "./controllers/controles_forms/SolicitacaodeCompras/DetailSolicitacaodeComprasController";
import { DetailAssistenciaTecnicaController } from "./controllers/controles_forms/ControledeAssistenciaTecnica/DetailControledeAssistenciaTecnicaController";
import { ListUserController } from "./controllers/user/ListUserController";
import { DetailLaudoTenicoController } from "./controllers/controles_forms/ControledeLaudoTécnico/DetailControledeLaudoTenicoController";
import { DetailControledeLaboratorioController } from "./controllers/controles_forms/ControledeLaboratorio/DetailControledeLaboratorioController";
import { DetailMaquinasPendentesLabController } from "./controllers/controles_forms/ControledeMaquinasPendentesLab/DetailMaquinasPendentesLabController";
import { DetailControledeMaquinasPendentesOroController } from "./controllers/controles_forms/ControledeMaquinasPendentesOro/DetailControledeMaquinasPendentesOroController";
import { DetailDocumentacaoTecnicaController } from "./controllers/controles_forms/DocumentacaoTecnica/DetailDocumentacaoTecnicaController";
import { DetailClienteController } from "./controllers/status categorias/cliente/DetailClienteController";
import { UpdateSolicitacaodeComprasController } from "./controllers/controles_forms/SolicitacaodeCompras/UpdateSolicitacaodeComprasController";
import { UpdateDocumentacaoTecnicaController } from "./controllers/controles_forms/DocumentacaoTecnica/UpdateDocumentacaoTecnicaController";
import { UpdateAssistenciaTecnicaController } from "./controllers/controles_forms/ControledeAssistenciaTecnica/UpdateControlledeAssistenciaTecnicaController";
import { UpdateControllerdeLaudoTecnicoController } from "./controllers/controles_forms/ControledeLaudoTécnico/UpdateControllerdeLaudoTecnicoController";
import { UpdateControledeLaboratorioController } from "./controllers/controles_forms/ControledeLaboratorio/UpdateControledeLaboratorioController";
import { UpdateControledeMaquinasPendentesLabController } from "./controllers/controles_forms/ControledeMaquinasPendentesLab/UpdateControledeMaquinasPendentesLabController";
import { UpdateControledeMaquinasPendentesOroController } from "./controllers/controles_forms/ControledeMaquinasPendentesOro/UpdateControledeMaquinasPendentesOroController";
import { ListOrdemdeServicoController } from "./controllers/controles_forms/OrdemdeServico/ListOrdemdeServicoController";
import { ListtipodeChamadoController } from "./controllers/status categorias/tipodeChamado/ListtipodeChamadoController";
import { UpdateOrdemdeServicoService } from "./services/controles_forms/OrdemdeServico/UpdateOrdemdeServicoService";
import { getEventsController, createEventController, updateEventController, deleteEventController } from "../src/controllers/Eventos/EventosControllers";
import multer from 'multer';

import { fotoController } from "./services/controles_forms/FotoOrdensTec/fotoController";
import { ListByStatusTicketsController } from "./controllers/controles_forms/OrdemdeServico/ListByStatusTicketsController";
import { ListByTecnicosTicketsController } from "./controllers/controles_forms/OrdemdeServico/ListByTecnicosTicketsController";
import { CreateStatusEstabilizadoresController } from "./controllers/status categorias/statusEstabilizadores/CreateStatusEstabilizadoresController";
import { ListStatusEstabilizadoresController } from "./controllers/status categorias/statusEstabilizadores/ListStatusEstabilizadoresController";
import { CreateEquipamentoEstabilizadorController } from "./controllers/status categorias/EquipamentoEstabilizador/CreateEquipamentoEstabilizadorController";
import { ListEsquipamentoEstabilizadorController } from "./controllers/status categorias/EquipamentoEstabilizador/ListEquipamentoEstabilizadorController";
import { CreateControledeEstabilizadoresController } from "./controllers/controles_forms/ControledeEstabilizadores/CreateControledeEstabilizadoresController";
import { ListControledeEstabilizadoresService } from "./services/controles_forms/ControledeEstabilizadores/ListControledeEstabilizadoresService";
import { ListControledeEstabilizadoresController } from "./controllers/controles_forms/ControledeEstabilizadores/ListControledeEstabilizadoresController";
import { UpdateControledeEstabilizadoresController } from "./controllers/controles_forms/ControledeEstabilizadores/UpdateControledeEstabilizadoresController";
import { CreatetipodeInstituicaoUnidadeController } from "./controllers/status categorias/tipodeInsituicaoUnidade/CreatetipodeInstituicaoUnidadeController";
import { ListtipoInsituicaoUnidadeController } from "./controllers/status categorias/tipodeInsituicaoUnidade/ListtipoInsituicaoUnidadeController";
import { timeOrdemDeServicoController } from "./controllers/controles_forms/OrdemdeServico/time/timeOrdemdeServicoController";
import { CreateAssinaturaController } from "./controllers/controles_forms/OrdemdeServico/assinatura/CreateAssinaturaController";
import { SaveAssinaturaController } from "./controllers/controles_forms/OrdemdeServico/assinatura/GetAssinaturaController";
import { AssinaturaController } from "./controllers/controles_forms/OrdemdeServico/assinatura/saveAssinatura";
import { CreateInformacoesSetorController } from "./controllers/status categorias/setor/informacoessetor/CreateInformacoesSetorController";
import { ListInformacaoesSetoresController } from "./controllers/status categorias/setor/informacoessetor/ListInformacoesSetorController";
import { GetOrdemdeServicoByIdController } from "./controllers/controles_forms/OrdemdeServico/ListByIdOrdemdeServicoController";
import { CreatetipodeOrdemdeServicoController } from "./controllers/status categorias/tipodeOrdemdeServico/CreateTipodeOrdemdeServicoController";
import { ListtipodeOrdemdeServicoController } from "./controllers/status categorias/tipodeOrdemdeServico/ListTipodeOrdemdeServicoController";
import { can } from "./Middleware/can";
import { UpdateClienteController } from "./controllers/status categorias/cliente/UpdateClienteController";
import { UpdateInstituicaoUnidadeController } from "./controllers/status categorias/tipodeInsituicaoUnidade/UpdateInstituicaoUnidadeController";
import { UpdateInformacoesSetorController } from "./controllers/status categorias/setor/informacoessetor/UpdateInformacoesSetorController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { UpdateEquipamentoController } from "./controllers/status categorias/equipamento/UpdateEquipamentoController";
const router = Router();
//get,post, update, delete

//const upload = multer(uploadConfig.upload("./tmp"));

const upload = multer(uploadConfig.upload());

const fotoControllerInstance = new fotoController();

// ============================================================
// 1. AUTENTICAÇÃO E USUÁRIOS
// ============================================================
router.post('/users', new CreateUserController().handle); // Cadastro inicial
router.post('/session', new AuthUserController().handle); // Login

// Apenas ADM pode listar todos os usuários do sistema
router.get('/listusers', isAuthenticated, can(['ADMIN']), new ListUserController().handle);
router.get('/users/detail', isAuthenticated, new DetailUserController().handle);
router.patch('/user/update/:id', isAuthenticated, can(['ADMIN']), new UpdateUserController().handle);
// ============================================================
// 2. CONFIGURAÇÕES E CATEGORIAS (ACESSO RESTRITO: ADM)
// ============================================================

// --- Cliente ---
router.post('/categorycliente', isAuthenticated, can(['ADMIN']), new CreateClienteController().handle);
router.delete('/deletecliente', isAuthenticated, can(['ADMIN']), new RemoveClienteController().handle);
router.get('/listcliente', isAuthenticated, new ListClienteController().handle); // Técnicos podem ver a lista
router.get('/cliente/detail', isAuthenticated, new DetailClienteController().handle);
router.patch('/cliente/:id',  isAuthenticated, can(['ADMIN']), new UpdateClienteController().handle);

// --- Setor ---
router.post('/categorysetor', isAuthenticated, can(['ADMIN']), new CreateSetorController().handle);
router.delete('/deletesetor', isAuthenticated, can(['ADMIN']), new RemoveSetorController().handle);
router.get('/listsetores', isAuthenticated, new ListSetoresController().handle);
router.post('/informacoessetor', isAuthenticated, can(['ADMIN']), new CreateInformacoesSetorController().handle);
router.get('/listinformacoessetor', isAuthenticated, new ListInformacaoesSetoresController().handle);
router.patch('/informacoessetor/:id',  isAuthenticated, can(['ADMIN']), new UpdateInformacoesSetorController().handle);

// --- Instituição / Unidade ---
router.post('/categoryintituicao', isAuthenticated, can(['ADMIN']), new CreateInstituicaoUnidadeController().handle);
router.delete('/deleteinstituicao', isAuthenticated, can(['ADMIN']), new RemoveInstituicaoUnidadeController().handle);
router.get('/listinstuicao', isAuthenticated, new ListInstituicaoUnidadeController().handle);
router.post('/tipodeinstituicaounidade', isAuthenticated, can(['ADMIN']), new CreatetipodeInstituicaoUnidadeController().handle);
router.get('/listtipodeinstituicaounidade', isAuthenticated, new ListtipoInsituicaoUnidadeController().handle);
router.patch('/instituicaounidade/:id',  isAuthenticated, can(['ADMIN']), new UpdateInstituicaoUnidadeController().handle);

// --- Tecnico ---
router.post('/tecnico', isAuthenticated, can(['ADMIN']), new CreateTecnicoController().handle);
router.delete('/removertecnico/:id', isAuthenticated, can(['ADMIN']), new RemoveTecnicoController().handle);
router.get('/listtecnico', isAuthenticated, new ListTecnicoController().handle);

// --- Equipamento ---
router.post('/equipamento', isAuthenticated, can(['ADMIN']), new CreateEquipamentoController().handle);
router.delete('/deleteequipamento/:id', isAuthenticated, can(['ADMIN']), new RemoveEquipamentoController().handle);
router.get('/listequipamento', isAuthenticated, new ListEquipamentoController().handle);
router.patch('/equipamento/:id',  isAuthenticated, can(['ADMIN']), new UpdateEquipamentoController().handle);


// ============================================================
// 3. STATUS E PRIORIDADES (SISTEMA: ADM)
// ============================================================
router.post('/statusordemdeservico', isAuthenticated, can(['ADMIN']), new CreateStatusOrdemdeServicoController().handle);
router.delete('/removestatusordemdeservico', isAuthenticated, can(['ADMIN']), new RemoveStatusOrdemServicoController().handle);

router.post('/statusprioridade', isAuthenticated, can(['ADMIN']), new CreateStatusPrioridadeController().handle);
router.post('/tipodechamado', isAuthenticated, can(['ADMIN']), new CreatetipodeChamadoController().handle);
router.post("/tipodeordemdeservico", isAuthenticated, can(['ADMIN']), new CreatetipodeOrdemdeServicoController().handle);

// Getters de Status permanecem públicos para os formulários funcionarem
router.get('/liststatusordemdeservico', isAuthenticated, new ListStatusOrdemdeServicoController().handle);
router.get('/liststatusprioridade', isAuthenticated, new ListStatusUrgenciaController().handle);
router.get('/listtipodechamado', isAuthenticated, new ListtipodeChamadoController().handle);
router.get('/listtipodeordemdeservico', isAuthenticated, new ListtipodeOrdemdeServicoController().handle);

// ============================================================
// 4. OPERAÇÃO: ORDEM DE SERVIÇO (TÉCNICOS E ADM)
// ============================================================
router.post('/ordemdeservico', isAuthenticated, new CreateOrdemServicoController().handle);
router.get('/listordemdeservico', isAuthenticated, new ListOrdemdeServicoController().handle);
router.get('/ordemdeservico/:id', isAuthenticated, new GetOrdemdeServicoByIdController().handle);

router.patch(
  '/ordemdeservico/update/:id',
  isAuthenticated, 
  upload.array('files'),
  new UpdateOrdemdeServicoService().handle.bind(new UpdateOrdemdeServicoService())
);

// --- Controle de Laboratorio ---

// --- Outros Status (Laboratório, Compras, Reparo) ---
router.post('/statusMaquinasPendentesLab', isAuthenticated, new CreatestatusMaquinasPendentesController().handle);
router.get('/liststatusMaquinasPendentesLab', isAuthenticated, new ListMaquinasPendentesLabController().handle);
router.post('/statusMaquinasPendentesOro', isAuthenticated, new CreatestatusMaquinasPendentesOroController().handle);
router.get('/liststatusMaquinasPendentesOro', isAuthenticated, new ListMaquinasPendentesOroController().handle);
router.post('/statuscontrolledeLaboratorio', isAuthenticated, new CreatestatusControlledeLaboratorioController().hadle);
router.get('/listcontrolledeLaboratorio', isAuthenticated, new ListstatusControlleLaboratioController().handle);
router.post('/statuscompras', isAuthenticated, new CreateStatusComprasController().handle);
router.get('/liststatuscompras', isAuthenticated, new ListStatusComprasController().handle);
router.post('/statusreparo', isAuthenticated, new CreateStatusReparoController().handle);
router.get('/liststatusreparo', isAuthenticated, new ListstatusReparoController().handle);


// --- Controle de Tempo e Assinaturas ---
router.patch("/ordemdeservico/iniciar/:id", isAuthenticated, timeOrdemDeServicoController.iniciar);
router.patch("/ordemdeservico/concluir/:id", isAuthenticated, timeOrdemDeServicoController.concluir);
router.patch("/assinatura/:id", isAuthenticated, AssinaturaController.atualizar);
router.get("/assinatura/:ordemId", isAuthenticated, AssinaturaController.buscar);


// ============================================================
// 5. FORMULÁRIOS TÉCNICOS E LAUDOS (TÉCNICOS E ADM)
// ============================================================

// Assistência Técnica
router.post('/controledeassistenciatecnica', isAuthenticated, new CreateControledeAssistenciaTecnicaController().handle);
router.delete('/controledeassistenciatecnica/:id', isAuthenticated, can(['ADMIN']), new DeleteControledeAssistenciaTecnicaController().handle);

// Laudo Técnico
router.post('/controledelaudotecnico', isAuthenticated, new CreateControledeLaudoTecnicoController().handle);
router.delete('/deletecontroledelaudotecnico/:id', isAuthenticated, can(['ADMIN']), new DeleteControledeLaudoTecnicoController().handle);

// Compras e Documentação (Criação livre, Deletar apenas ADM)
router.post('/solicitacaodecompras', isAuthenticated, new CreateSolicitacaodeComprasController().handle);
router.delete('/deletedesolicitacaodecompras/:id', isAuthenticated, can(['ADMIN']), new DeleteSolicitacaodeComprasController().handle);

router.get('/listdocumentacaotecnica', isAuthenticated, new ListDocumentacaoTecnicaController().handle);
router.post('/documentacaotecnica', isAuthenticated, new CreateDocumentacaoTecnicaController().handle);
router.delete('/deletedocumentacaotecnica/:id', isAuthenticated, can(['ADMIN']), new DeleteDocumentacaoTecnicaController().handle);


// ============================================================
// 6. EVENTOS E CALENDÁRIO
// ============================================================
router.get("/events", isAuthenticated, getEventsController);
router.post("/events", isAuthenticated, createEventController); 
router.put("/events", isAuthenticated, updateEventController);
router.delete("/events/:id", isAuthenticated, deleteEventController);
export { router };
