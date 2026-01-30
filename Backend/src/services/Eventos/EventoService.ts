import prismaClient from "../../prisma";
import { SchedulerEvent } from "../Eventos/Evento.type";

// Services
export async function getEventsService(): Promise<SchedulerEvent[]> {
  const events = await prismaClient.event.findMany({
    orderBy: { start_date: "asc" },
  });

  // converte Date para string ISO para frontend
  return events.map(ev => ({
    id: ev.id,
    text: ev.text,
    start_date: ev.start_date.toISOString(),
    end_date: ev.end_date.toISOString(),
  }));
}

export async function createEventService(data: Omit<SchedulerEvent, "id">): Promise<SchedulerEvent> {
  const event = await prismaClient.event.create({
    data: {
      text: data.text,
      start_date: new Date(data.start_date), // converte string para Date
      end_date: new Date(data.end_date),
    },
  });

  return {
    id: event.id,
    text: event.text,
    start_date: event.start_date.toISOString(),
    end_date: event.end_date.toISOString(),
  };
}

export async function updateEventService(id: number, data: Partial<Omit<SchedulerEvent, "id">>): Promise<SchedulerEvent> {
  const event = await prismaClient.event.update({
    where: { id },
    data: {
      text: data.text,
      start_date: data.start_date ? new Date(data.start_date) : undefined,
      end_date: data.end_date ? new Date(data.end_date) : undefined,
    },
  });

  return {
    id: event.id,
    text: event.text,
    start_date: event.start_date.toISOString(),
    end_date: event.end_date.toISOString(),
  };
}

export async function deleteEventService(id: number): Promise<SchedulerEvent> {
  const event = await prismaClient.event.delete({ where: { id } });
  return {
    id: event.id,
    text: event.text,
    start_date: event.start_date.toISOString(),
    end_date: event.end_date.toISOString(),
  };
}
