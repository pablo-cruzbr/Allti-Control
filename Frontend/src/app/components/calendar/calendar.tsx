"use client";
import "../calendar/calendar.css";
import { useEffect, useRef, useState } from "react";
import scheduler from "dhtmlx-scheduler";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
import { useRouter } from "next/navigation";

interface SchedulerEvent {
  id: number | string;
  start_date: string | Date;
  end_date: string | Date;
  text: string;
}

export default function Calendar() {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<SchedulerEvent | null>(null);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);

  // --- Buscar eventos na API
  const fetchEvents = async (token: string) => {
    try {
      const { data } = await api.get<SchedulerEvent[]>("/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      scheduler.parse(
        data.map((ev) => ({
          ...ev,
          start_date: new Date(ev.start_date),
          end_date: new Date(ev.end_date),
        }))
      );
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
    }
  };

  // --- Criar evento na API
  const createEvent = async (event: SchedulerEvent, token: string) => {
    const { data } = await api.post<SchedulerEvent>(
      "/events",
      {
        text: event.text,
        start_date: new Date(event.start_date).toISOString(),
        end_date: new Date(event.end_date).toISOString(),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    scheduler.addEvent({
      id: data.id,
      text: data.text,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
    });

    router.refresh();
    return data;
  };

  // -- ATUALIZAR EVENTO

  // --- Atualizar evento na API
const updateEvent = async (event: SchedulerEvent, token: string) => {
  try {
    const { data } = await api.put<SchedulerEvent>(
      "/events",
      {
        id: event.id,
        text: event.text,
        start_date: new Date(event.start_date).toISOString(),
        end_date: new Date(event.end_date).toISOString(),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Atualiza o evento no scheduler
    scheduler.updateEvent(event.id, {
      id: data.id,
      text: data.text,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
    });

    return data;
  } catch (err) {
    console.error("Erro ao atualizar evento:", err);
    throw err;
  }
};


  // --- Inicializar scheduler
  useEffect(() => {
    if (!container.current) return;

    const initScheduler = async () => {
      const token = (await getCookieClient()) as string;
      if (!token) return;

      scheduler.i18n.setLocale("pt");
      scheduler.skin = "terrace";
      scheduler.config.header = ["day", "week", "month", "date", "prev", "today", "next"];
      scheduler.xy.scale_width = 70;
      scheduler.config.drag_move = true;
      scheduler.config.drag_resize = true;
      scheduler.config.drag_create = true;
      scheduler.config.dblclick_create = false;
      scheduler.config.details_on_dblclick = false;
      scheduler.config.details_on_create = false;

      scheduler.init(container.current, new Date(), "month");

      fetchEvents(token);

      // Criar novo evento
      scheduler.attachEvent("onEmptyClick", (date: Date) => {
        setNewEventDate(date);
        setSelectedEvent({ id: "", text: "", start_date: date, end_date: date });
        return true;
      });

      // Selecionar evento existente
      scheduler.attachEvent("onClick", (id: number) => {
        const ev = scheduler.getEvent(id) as SchedulerEvent;
        setSelectedEvent(ev);
        setNewEventDate(null);
        return true;
      });
    };

    initScheduler();

    return () => {
      scheduler.clearAll();
      if (container.current) container.current.innerHTML = "";
    };
  }, []);

  // --- Salvar evento
const handleSaveEvent = async () => {
  const token = (await getCookieClient()) as string;
  if (!token || !selectedEvent) return;

  if (newEventDate) {
    // Criar evento
    await createEvent(selectedEvent, token);
  } else {
    // Atualizar evento existente
    await updateEvent(selectedEvent, token);
  }

    if (token) {
    await fetchEvents(token);
  }

  router.refresh();
  setSelectedEvent(null);
  setNewEventDate(null);
};

const handleDeleteEvent = async () => {
  if (!selectedEvent) return;

  const confirmDelete = confirm("Tem certeza que deseja deletar este evento?");
  if (!confirmDelete) return;

  const token = (await getCookieClient()) as string;
  if (!token) return;

  try {
    await deleteEvent(selectedEvent.id, token);
    setSelectedEvent(null);
    setNewEventDate(null);
  } catch (err) {
    // erro já tratado em deleteEvent
  }
};


// --- Deletar Evento

// --- Deletar evento na API
const deleteEvent = async (id: number | string, token: string) => {
  try {
    // Garante que o ID seja enviado como string
    await api.delete(`/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Remove do scheduler local
    if (scheduler.getEvent(id)) {
      scheduler.deleteEvent(id);
    }

    // Recarrega todos os eventos do backend
    await fetchEvents(token);

  } catch (err: any) {
    console.error("Erro ao deletar evento:", err.response?.data || err.message);
    alert("Não foi possível deletar o evento. Verifique o console.");
    throw err;
  }
};



  // --- Atualizar horas do evento
  const handleTimeChange = (type: "start" | "end", value: string) => {
    if (!selectedEvent) return;
    const [hours, minutes] = value.split(":").map(Number);

    const date = new Date(
      type === "start" ? selectedEvent.start_date : selectedEvent.end_date
    );
    date.setHours(hours, minutes, 0, 0);

    setSelectedEvent({
      ...selectedEvent,
      start_date: type === "start" ? date : selectedEvent.start_date,
      end_date: type === "end" ? date : selectedEvent.end_date,
    });
  };

  // --- Formatar hora local
  const formatTime = (date: Date | string) => {
    if (!(date instanceof Date)) return "00:00";
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={container} style={{ width: "100%", height: "600px" }}></div>

      {selectedEvent && (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal-content">
            <h2>{newEventDate ? "Novo Evento" : "Detalhes do Evento"}</h2>

            {/* Painel de detalhes */}
            <div className="event-details-panel">
              <h3>📅 Resumo do Evento</h3>
              <p>
                <strong>Título:</strong> {selectedEvent.text || "Sem título"}
              </p>
              <p>
                <strong>Início:</strong>{" "}
                {new Date(selectedEvent.start_date).toLocaleString("pt-BR")}
              </p>
              <p>
                <strong>Fim:</strong>{" "}
                {new Date(selectedEvent.end_date).toLocaleString("pt-BR")}
              </p>
              <hr />
            </div>

            {/* Inputs */}
            <label>Descrição:</label>
            <input
              type="text"
              value={selectedEvent.text}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, text: e.target.value })
              }
            />

            <label>Hora de Início:</label>
            <input
              type="time"
              value={formatTime(selectedEvent.start_date)}
              onChange={(e) => handleTimeChange("start", e.target.value)}
            />

            <label>Hora de Fim:</label>
            <input
              type="time"
              value={formatTime(selectedEvent.end_date)}
              onChange={(e) => handleTimeChange("end", e.target.value)}
            />

            {/* Botões */}
            <div className="buttons">
              <button
              onClick={handleDeleteEvent}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Excluir
            </button>
              <button onClick={handleSaveEvent}>💾 Salvar</button>
              <button onClick={() => setSelectedEvent(null)}>❌ Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
