import { Router, Request, Response } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';

// --- Middlewares ---
import { isAuthenticated } from "./Middleware/isAuthenticated";
import { can } from "./Middleware/can";

// --- Controllers: Usuários ---
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListUserController } from "./controllers/user/ListUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

// --- Controllers: Status e Categorias ---
import { CreateClienteController } from "./controllers/status_categorias/cliente/CreateClienteController";
import { ListClienteController } from "./controllers/status_categorias/cliente/ListClienteController";
import { RemoveClienteController } from "./controllers/status_categorias/cliente/RemoveClienteController";
import { DetailClienteController } from "./controllers/status_categorias/cliente/DetailClienteController";
import { UpdateClienteController } from "./controllers/status_categorias/cliente/UpdateClienteController";

import { CreateSetorController } from "./controllers/status_categorias/setor/CreateSetorController";
import { ListSetoresController } from "./controllers/status_categorias/setor/ListSetoresController";
import { RemoveSetorController } from "./controllers/status_categorias/setor/RemoveSetorController";

import { CreateInstituicaoUnidadeController } from "./controllers/status_categorias/instituicaoUnidade/CreateInstituicaoUnidadeController";
import { ListInstituicaoUnidadeController } from "./controllers/status_categorias/instituicaoUnidade/ListInstituicaoUnidadeController";
import { RemoveInstituicaoUnidadeController } from "./controllers/status_categorias/instituicaoUnidade/RemoveInstituicaoUnidadeController";
import { UpdateInstituicaoUnidadeController } from "./controllers/status_categorias/tipodeInsituicaoUnidade/UpdateInstituicaoUnidadeController";

import { CreateStatusOrdemdeServicoController } from "./controllers/status_categorias/statusOrdemdeServico/CreateStatusOrdemdeServicoController";
import { ListStatusOrdemdeServicoController } from "./controllers/status_categorias/statusOrdemdeServico/ListStatusOrdemdeServicoController";
import { RemoveStatusOrdemServicoController } from "./controllers/status_categorias/statusOrdemdeServico/RemoveStatusOrdemServicoController";

import { CreatetipodeChamadoController } from "./controllers/status_categorias/tipodeChamado/CreatetipodeChamadoController";
import { ListtipodeChamadoController } from "./controllers/status_categorias/tipodeChamado/ListtipodeChamadoController";

import { CreateTecnicoController } from "./controllers/status_categorias/tecnico/CreateTecnicoController";
import { ListTecnicoController } from "./controllers/status_categorias/tecnico/ListTecnicoController";
import { RemoveTecnicoController } from "./controllers/status_categorias/tecnico/RemoveTecnicoController";

import { CreateEquipamentoController } from "./controllers/status_categorias/equipamento/CreateEquipamentoController";
import { ListEquipamentoController } from "./controllers/status_categorias/equipamento/ListEquipamentoController";
import { RemoveEquipamentoController } from "./controllers/status_categorias/equipamento/RemoveEquipamentoController";
import { UpdateEquipamentoController } from "./controllers/status_categorias/equipamento/UpdateEquipamentoController";

// --- Controllers: Operação OS e Tempo ---
import { CreateOrdemServicoController } from "./controllers/controles_forms/OrdemdeServico/CreateOrdemdeServicoController";
import { ListOrdemdeServicoController } from "./controllers/controles_forms/OrdemdeServico/ListOrdemdeServicoController";
import { GetOrdemdeServicoByIdController } from "./controllers/controles_forms/OrdemdeServico/ListByIdOrdemdeServicoController";
import { UpdateOrdemdeServicoService } from "./services/controles_forms/OrdemdeServico/UpdateOrdemdeServicoService";
import { TimeOrdemDeServicoController } from "./controllers/controles_forms/OrdemdeServico/time/timeOrdemdeServicoController";
import { AssinaturaController } from "./controllers/controles_forms/OrdemdeServico/assinatura/saveAssinatura";
import { fotoController } from "./services/controles_forms/FotoOrdensTec/fotoController";

// --- Outros ---
import { getEventsController, createEventController, updateEventController, deleteEventController } from "../src/controllers/Eventos/EventosControllers";
import { ListAtividadePadraoController } from "./controllers/status_categorias/Atividade/ListAtividadePadraoController";
import { CreatetipodeOrdemdeServicoController } from "./controllers/status_categorias/tipodeOrdemdeServico/CreateTipodeOrdemdeServicoController";
import { ListtipodeOrdemdeServicoController } from "./controllers/status_categorias/tipodeOrdemdeServico/ListTipodeOrdemdeServicoController";
import { CreateStatusPrioridadeController } from "./controllers/status_categorias/statusUrgencia/CreateStatusPrioridadeController";
import { ListStatusUrgenciaController } from "./controllers/status_categorias/statusUrgencia/ListStatusUrgenciaController";
import { CreateInformacoesSetorController } from "./controllers/status_categorias/setor/informacoessetor/CreateInformacoesSetorController";
import { ListInformacaoesSetoresController } from "./controllers/status_categorias/setor/informacoessetor/ListInformacoesSetorController";
import { UpdateInformacoesSetorController } from "./controllers/status_categorias/setor/informacoessetor/UpdateInformacoesSetorController";

const router = Router();
const upload = multer(uploadConfig.upload());

// --- Instâncias de Controllers (Classes) ---
const timeController = new TimeOrdemDeServicoController();
const fotoControllerInstance = new fotoController();
const assinaturaController = AssinaturaController;

// ============================================================
// 1. AUTENTICAÇÃO E USUÁRIOS
// ============================================================
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/listusers', isAuthenticated, can(['ADMIN']), new ListUserController().handle);
router.get('/users/detail', isAuthenticated, new DetailUserController().handle);
router.patch('/user/update/:id', isAuthenticated, can(['ADMIN']), new UpdateUserController().handle);

// ============================================================
// 2. CONFIGURAÇÕES (ACESSO RESTRITO: ADM)
// ============================================================
router.post('/categorycliente', isAuthenticated, can(['ADMIN']), new CreateClienteController().handle);
router.get('/listcliente', isAuthenticated, new ListClienteController().handle);
router.patch('/cliente/:id', isAuthenticated, can(['ADMIN']), new UpdateClienteController().handle);
router.delete('/deletecliente', isAuthenticated, can(['ADMIN']), new RemoveClienteController().handle);

router.post('/categorysetor', isAuthenticated, can(['ADMIN']), new CreateSetorController().handle);
router.get('/listsetores', isAuthenticated, new ListSetoresController().handle);
router.post('/informacoessetor', isAuthenticated, can(['ADMIN']), new CreateInformacoesSetorController().handle);
router.get('/listinformacoessetor', isAuthenticated, new ListInformacaoesSetoresController().handle);
router.patch('/informacoessetor/:id', isAuthenticated, can(['ADMIN']), new UpdateInformacoesSetorController().handle);

router.post('/tecnico', isAuthenticated, can(['ADMIN']), new CreateTecnicoController().handle);
router.get('/listtecnico', isAuthenticated, new ListTecnicoController().handle);
router.delete('/removertecnico/:id', isAuthenticated, can(['ADMIN']), new RemoveTecnicoController().handle);

router.post('/equipamento', isAuthenticated, can(['ADMIN']), new CreateEquipamentoController().handle);
router.get('/listequipamento', isAuthenticated, new ListEquipamentoController().handle);
router.patch('/equipamento/:id', isAuthenticated, can(['ADMIN']), new UpdateEquipamentoController().handle);

// ============================================================
// 3. OPERAÇÃO: ORDEM DE SERVIÇO
// ============================================================
router.post('/ordemdeservico', isAuthenticated, new CreateOrdemServicoController().handle);
router.get('/listordemdeservico', isAuthenticated, new ListOrdemdeServicoController().handle);
router.get('/ordemdeservico/:id', isAuthenticated, new GetOrdemdeServicoByIdController().handle);
router.get('/listatividade', isAuthenticated, new ListAtividadePadraoController().handle);

// --- Update Principal da OS ---
router.patch(
  '/ordemdeservico/update/:id',
  isAuthenticated, 
  upload.array('files'),
  new UpdateOrdemdeServicoService().handle.bind(new UpdateOrdemdeServicoService())
);

// --- Controle de Tempo (Corrigido) ---
router.patch("/ordemdeservico/iniciar/:id", isAuthenticated, (req, res) => timeController.iniciar(req, res));
router.patch("/ordemdeservico/concluir/:id", isAuthenticated, (req, res) => timeController.concluir(req, res));
router.patch("/ordemdeservico/pausar/:id", isAuthenticated, (req, res) => timeController.pausar(req, res));
router.patch("/ordemdeservico/retomar/:id", isAuthenticated, (req, res) => timeController.retomar(req, res));
router.patch("/ordemdeservico/atualizar-tempo/:id", isAuthenticated, (req, res) => timeController.atualizarTempo(req, res));
router.get("/ordemdeservico/tempo/:id", isAuthenticated, (req, res) => timeController.lerTempo(req, res));

// --- Assinatura (Corrigido e sem duplicatas) ---
router.patch("/assinatura/:id", isAuthenticated, (req, res) => assinaturaController.atualizar(req, res));
router.get("/assinatura/:ordemId", isAuthenticated, (req, res) => assinaturaController.buscar(req, res));

// --- Fotos ---
router.post('/foto', isAuthenticated, new fotoController().handle);
router.get('/foto/:id', isAuthenticated, (req, res) => fotoControllerInstance.listByOrdem(req, res));
router.delete('/foto/:id', isAuthenticated, new fotoController().delete);

// ============================================================
// 4. STATUS E AUXILIARES
// ============================================================
router.get('/liststatusordemdeservico', isAuthenticated, new ListStatusOrdemdeServicoController().handle);
router.get('/liststatusprioridade', isAuthenticated, new ListStatusUrgenciaController().handle);
router.get('/listtipodechamado', isAuthenticated, new ListtipodeChamadoController().handle);
router.get('/listtipodeordemdeservico', isAuthenticated, new ListtipodeOrdemdeServicoController().handle);

// ============================================================
// 5. EVENTOS
// ============================================================
router.get("/events", isAuthenticated, getEventsController);
router.post("/events", isAuthenticated, createEventController); 
router.put("/events", isAuthenticated, updateEventController);
router.delete("/events/:id", isAuthenticated, deleteEventController);

export { router };