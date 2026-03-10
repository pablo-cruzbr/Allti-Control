"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";

import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
import "../calendar/calendar.css";

interface SchedulerEvent {
  id: number | string;
  start_date: string | Date;
  end_date: string | Date;
  text: string;
}

export default function Calendar({ initialToken }: { initialToken?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const schedulerInstance = useRef<any>(null);
  const isInitialized = useRef(false); 
  const router = useRouter();

  const [selectedEvent, setSelectedEvent] = useState<SchedulerEvent | null>(null);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async (token: string) => {
    if (!schedulerInstance.current) return;
    try {
      const { data } = await api.get("/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Dados brutos recebidos:", data);

      const schedulerData = data.map((ev: any) => ({
        ...ev,
        start_date: new Date(ev.start_date),
        end_date: new Date(ev.end_date),
      }));

      schedulerInstance.current.clearAll();
      schedulerInstance.current.parse(schedulerData);
      schedulerInstance.current.render(); 
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return;

    const initScheduler = async () => {
      const schedulerModule = await import("dhtmlx-scheduler");
      const scheduler = schedulerModule.default;
      schedulerInstance.current = scheduler;

      scheduler.config.xml_date = "%Y-%m-%d %H:%i"; 
      scheduler.i18n.setLocale("pt");
      scheduler.skin = "terrace";
      scheduler.config.header = ["day", "week", "month", "date", "prev", "today", "next"];
      scheduler.config.details_on_dblclick = false;
      scheduler.config.details_on_create = false;

      if (containerRef.current) {
        scheduler.init(containerRef.current, new Date(), "month");
        isInitialized.current = true;

        const token = initialToken || (await getCookieClient());
        if (token) {
          fetchEvents(token);
        }
      }

      scheduler.attachEvent("onEmptyClick", (date: Date) => {
        const endDate = new Date(date);
        endDate.setHours(date.getHours() + 1);
        setNewEventDate(date);
        setSelectedEvent({ id: "", text: "", start_date: date, end_date: endDate });
        return true;
      });

      scheduler.attachEvent("onClick", (id: string) => {
        const ev = scheduler.getEvent(id);
        setSelectedEvent({ ...ev });
        setNewEventDate(null);
        return true;
      });
    };

    initScheduler();

    return () => {
      if (schedulerInstance.current) {
        schedulerInstance.current.clearAll();
        isInitialized.current = false;
      }
    };
  }, [fetchEvents, initialToken]);

  const formatTimeForInput = (date: Date | string) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? "00:00" : d.toTimeString().slice(0, 5);
  };

  const handleTimeChange = (type: "start" | "end", timeValue: string) => {
    if (!selectedEvent) return;
    const [hours, minutes] = timeValue.split(":").map(Number);
    const newDate = new Date(type === "start" ? selectedEvent.start_date : selectedEvent.end_date);
    newDate.setHours(hours, minutes, 0);

    setSelectedEvent(prev => prev ? { ...prev, [type === "start" ? "start_date" : "end_date"]: newDate } : null);
  };

  const handleSaveEvent = async () => {
    const token = initialToken || (await getCookieClient());
    if (!token || !selectedEvent) return;

    setLoading(true);
    try {
      const payload = {
        text: selectedEvent.text || "Sem título",
        start_date: new Date(selectedEvent.start_date).toISOString(),
        end_date: new Date(selectedEvent.end_date).toISOString(),
      };

      if (newEventDate) {
        await api.post("/events", payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await api.put(`/events/${selectedEvent.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      }

      await fetchEvents(token);
      setSelectedEvent(null);
      setNewEventDate(null);
      alert("✅ Salvo com sucesso!");
    } catch (err: any) {
      console.error("Erro ao salvar:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent || !confirm("Deseja realmente excluir?")) return;
    const token = initialToken || (await getCookieClient());

    if (!selectedEvent.id || String(selectedEvent.id).length > 10) {
      schedulerInstance.current.deleteEvent(selectedEvent.id);
      setSelectedEvent(null);
      return;
    }

    try {
      setLoading(true);
      await api.delete(`/events/${selectedEvent.id}`, { headers: { Authorization: `Bearer ${token}` } });
      schedulerInstance.current.deleteEvent(selectedEvent.id);
      setSelectedEvent(null);
      router.refresh();
    } catch (err) {
      alert("Erro ao excluir.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div style={{ width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "600px" }}>
        <div className="dhx_cal_navline">
          <div className="dhx_cal_prev_button">&nbsp;</div>
          <div className="dhx_cal_next_button">&nbsp;</div>
          <div className="dhx_cal_today_button"></div>
          <div className="dhx_cal_date"></div>
          <div className="dhx_cal_tab" {...{ name: "month_tab" } as any}></div>
          <div className="dhx_cal_tab" {...{ name: "week_tab" } as any}></div>
          <div className="dhx_cal_tab" {...{ name: "day_tab" } as any}></div>
        </div>
        <div className="dhx_cal_header"></div>
        <div className="dhx_cal_data"></div>
      </div>

      {selectedEvent && (
        <div className="calendar-modal-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="titleClient">{newEventDate ? "Novo Registro" : "Editar Registro"}</h2>
            <label>Descrição</label>
            <input
              type="text"
              autoFocus
              value={selectedEvent.text}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, text: e.target.value })}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <div style={{ flex: 1 }}>
                <label>Início</label>
                <input type="time" value={formatTimeForInput(selectedEvent.start_date)} onChange={(e) => handleTimeChange("start", e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Fim</label>
                <input type="time" value={formatTimeForInput(selectedEvent.end_date)} onChange={(e) => handleTimeChange("end", e.target.value)} />
              </div>
            </div>
            <div className="buttons">
              <button onClick={handleDeleteEvent} className="px-4 py-2 bg-red-500 text-white rounded">Excluir</button>
              <button onClick={handleSaveEvent} disabled={loading} style={{ backgroundColor: loading ? "#ccc" : "#4b328a", color: "white" }}>
                {loading ? "Salvando..." : "💾 Salvar"}
              </button>
              <button onClick={() => setSelectedEvent(null)}>❌ Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}