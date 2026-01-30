import { Request, Response } from "express";
import { getEventsService, createEventService, updateEventService, deleteEventService } from "../../../src/services/Eventos/EventoService";

// ---------------------
// Controllers
// ---------------------
export async function getEventsController(req: Request, res: Response) {
  try {
    const events = await getEventsService();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
}

export async function createEventController(req: Request, res: Response) {
  try {
    const { text, start_date, end_date } = req.body;
    if (!text || !start_date || !end_date) {
      return res.status(400).json({ error: "Campos obrigatórios" });
    }
    const event = await createEventService({ text, start_date, end_date });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar evento" });
  }
}

export async function updateEventController(req: Request, res: Response) {
  try {
    const { id, ...data } = req.body;
    if (!id) return res.status(400).json({ error: "ID obrigatório" });

    const event = await updateEventService(Number(id), data);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar evento" });
  }
}

export async function deleteEventController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID obrigatório" });

    const event = await deleteEventService(Number(id));
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar evento" });
  }
}
