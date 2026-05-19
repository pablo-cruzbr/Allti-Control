"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";

import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
import "./calendar.css"; 

interface SchedulerEvent {
  id: string | number;
  start_date: Date;
  end_date: Date;
  text: string;
  color?: string;
  status?: string;
  description?: string;
}

interface CalendarProps {
  initialToken?: string;
  events?: any[]; 
}

export default function Calendar({ initialToken, events }: CalendarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const schedulerInstance = useRef<any>(null);
  const isInitialized = useRef(false);
  const router = useRouter();

  const [selectedEvent, setSelectedEvent] = useState<SchedulerEvent | null>(null);

  const parseToScheduler = useCallback((data: any[]) => {
    return data.map((os: any) => ({
      id: os.id,
      text: `OS ${os.numeroOS}: ${os.cliente?.name || "Chamado"}`,
      start_date: new Date(os.created_at),
      end_date: os.endedAt 
        ? new Date(os.endedAt) 
        : new Date(new Date(os.created_at).getTime() + 60 * 60 * 1000),
      color: os.statusOrdemdeServico?.name === "CONCLUIDA" ? "#10b981" : "#f59e0b",
      status: os.statusOrdemdeServico?.name,
      description: os.descricaodoProblemaouSolicitacao
    }));
  }, []);

  const fetchOrders = useCallback(async (token: string) => {
    if (!schedulerInstance.current) return;
    try {
      const { data } = await api.get("/ordens", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.controles) {
        const formatted = parseToScheduler(data.controles);
        schedulerInstance.current.clearAll();
        schedulerInstance.current.parse(formatted);
      }
    } catch (err) {
      console.error("Erro ao carregar Ordens:", err);
    }
  }, [parseToScheduler]);

  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return;

    const initScheduler = async () => {
      const schedulerModule = await import("dhtmlx-scheduler");
      const scheduler = schedulerModule.default;
      schedulerInstance.current = scheduler;

      scheduler.i18n.setLocale("pt");
      
      // MANTENDO A SKIN TERRACE PARA ALINHAMENTO IGUAL À IMAGEM
      scheduler.skin = "terrace"; 
      
      scheduler.config.readonly = true;
      scheduler.config.header = ["day", "week", "month", "date", "prev", "today", "next"];
      
      if (containerRef.current) {
        // Altura fixa ou calculada é essencial para o DHTMLX não bugar
        scheduler.init(containerRef.current, new Date(), "month");
        isInitialized.current = true;

        if (events && events.length > 0) {
          scheduler.clearAll();
          scheduler.parse(parseToScheduler(events));
        } else {
          const token = initialToken || (await getCookieClient());
          if (token) fetchOrders(token);
        }
      }

      scheduler.attachEvent("onClick", (id: string) => {
        const ev = scheduler.getEvent(id);
        setSelectedEvent({ ...ev });
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
  }, [events, parseToScheduler, fetchOrders, initialToken]);

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <div 
        ref={containerRef} 
        className="dhx_cal_container shadow-sm border rounded-xl" 
        style={{ width: "100%", height: "600px", backgroundColor: "#fff" }}
      >
        <div className="dhx_cal_navline">
          <div className="dhx_cal_prev_button">&nbsp;</div>
          <div className="dhx_cal_next_button">&nbsp;</div>
          <div className="dhx_cal_today_button"></div>
          <div className="dhx_cal_date"></div>
          <div className="dhx_cal_tab" data-tab="day"></div>
          <div className="dhx_cal_tab" data-tab="week"></div>
          <div className="dhx_cal_tab" data-tab="month"></div>
        </div>
        <div className="dhx_cal_header"></div>
        <div className="dhx_cal_data"></div>
      </div>

      {selectedEvent && (
        <div className="calendar-modal-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b pb-4 mb-4">
               <div>
                 <h2 className="text-xl font-bold text-slate-800" style={{ color: "#4b328a" }}>
                    {selectedEvent.text}
                 </h2>
                 <p className="text-sm text-slate-500">Status: <strong>{selectedEvent.status}</strong></p>
               </div>
               <button onClick={() => setSelectedEvent(null)} className="text-2xl hover:text-red-500">&times;</button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold uppercase text-slate-400">Data de Abertura</span>
                <p className="text-slate-700">{new Date(selectedEvent.start_date).toLocaleString('pt-BR')}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => router.push(`/dashboard/tickets/${selectedEvent.id}`)}
                className="flex-1 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                style={{ backgroundColor: "#4b328a" }}
              >
                Gerenciar Chamado
              </button>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-3 border font-semibold rounded-lg hover:bg-slate-50 transition-all"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}