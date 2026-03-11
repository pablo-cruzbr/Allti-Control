"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

import { BiHome, BiTask, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoGameControllerOutline, IoEnterOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FiUserPlus } from "react-icons/fi";
import { LiaUserAstronautSolid } from "react-icons/lia";

import logo from "../../../../public/Logo11.svg";
import styles from "../sidebar/Sidebar.module.scss";

type DropdownKeys = "tickets" | "controles" | "clientes" | "cadastros";

export default function Sidebar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);

  const [dropdowns, setDropdowns] = useState<Record<DropdownKeys, boolean>>({
    tickets: false,
    controles: false,
    clientes: false,
    cadastros: false,
  });

  const syncUserPermissions = useCallback(async () => {
    const token = getCookie("session") || getCookie("token");

    if (!token) {
      console.warn("⚠️ [Sidebar] Token não encontrado no cookie 'session'.");
      setRole("USER"); 
      setIsSyncing(false);
      return;
    }

    try {
      // Busca dado fresco com timestamp para evitar cache do navegador
      const response = await api.get(`/users/detail?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const serverRole = response.data.role?.toUpperCase() || "USER";

      setRole(serverRole);
      setCookie("role", serverRole); // Sincroniza o cookie de role com o banco
      
      console.log(`✅ [Sidebar] Sincronizado com Banco: ${serverRole}`);
    } catch (error: any) {
      console.error("❌ [Sidebar] Erro na API:", error.response?.status);
      setRole("USER");
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Pequeno delay para garantir que os cookies estejam prontos para leitura
    const timer = setTimeout(() => {
      syncUserPermissions();
    }, 200);

    // Sincroniza sempre que você voltar para a aba do navegador
    window.addEventListener("focus", syncUserPermissions);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", syncUserPermissions);
    };
  }, [syncUserPermissions]);

  const handleLogout = () => {
    deleteCookie("session");
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("user_id");
    setRole(null);
    router.push("/");
  };

  const toggleDropdown = (key: DropdownKeys) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Evita erro de Hydration (Mismatch entre servidor e cliente)
  if (!mounted) return null;

  const isAdmin = role === "ADMIN";

  return (
    <nav className={styles.menu}>
      {/* Barra de Status de Segurança */}
      <div style={{
        fontSize: '10px',
        background: isAdmin ? '#2e7d32' : '#c62828',
        color: 'white',
        padding: '5px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        {isSyncing ? "VERIFICANDO..." : `PERFIL: ${role}`}
      </div>

      <div className={styles.logo}>
        <Image src={logo} alt="Logo" width={200} height={48} priority />
      </div>

      <div className={styles.menuList}>
        <Link href="/dashboard/ticketscount" className={styles.item}>
          <BiHome /> <span>Dashboard</span>
        </Link>

        {/* Tickets */}
        <div className={styles.itemContainer}>
          <div className={styles.item} onClick={() => toggleDropdown("tickets")} style={{ cursor: "pointer" }}>
            <BiTask /> <span>Tickets</span>
            {dropdowns.tickets ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {dropdowns.tickets && (
            <div className={styles.dropdown}>
              <Link href="/dashboard/tickets" className={styles.subItem}>Lista de Tickets</Link>
              <Link href="/AreadeUsuario/formularioAddTickets" className={styles.subItem}>Abrir um Ticket</Link>
            </div>
          )}
        </div>

        {/* Controles */}
        <div className={styles.itemContainer}>
          <div className={styles.item} onClick={() => toggleDropdown("controles")} style={{ cursor: "pointer" }}>
            <IoGameControllerOutline /> <span>Controles</span>
            {dropdowns.controles ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {dropdowns.controles && (
            <div className={styles.dropdown}>
              <Link href="/dashboard/controles/equipamentos" className={styles.subItem}>Lista de Máquinas</Link>
              <Link href="/dashboard/controles/assistenciaTecnica" className={styles.subItem}>Assistência Técnica</Link>
              <Link href="/dashboard/controles/laudoTecnico" className={styles.subItem}>Laudo Técnico</Link>
              <Link href="/dashboard/controles/laboratorio" className={styles.subItem}>Laboratório</Link>
            </div>
          )}
        </div>

        {/* Seção Protegida - Só aparece se role === ADMIN */}
        {isAdmin && (
          <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.05)', borderRadius: '4px' }}>
            <div className={styles.itemContainer}>
              <div className={styles.item} onClick={() => toggleDropdown("clientes")} style={{ cursor: "pointer" }}>
                <FaRegUserCircle /> <span>Clientes</span>
                {dropdowns.clientes ? <BiChevronUp /> : <BiChevronDown />}
              </div>
              {dropdowns.clientes && (
                <div className={styles.dropdown}>
                  <Link href="/dashboard/clientesprivados" className={styles.subItem}>Clientes Privados</Link>
                  <Link href="/dashboard/clientesMunicipais" className={styles.subItem}>Clientes Municipais</Link>
                  <Link href="/dashboard/setor" className={styles.subItem}>Lista Setores</Link>
                </div>
              )}
            </div>

            <div className={styles.itemContainer}>
              <div className={styles.item} onClick={() => toggleDropdown("cadastros")} style={{ cursor: "pointer" }}>
                <FiUserPlus /> <span>Cadastros</span>
                {dropdowns.cadastros ? <BiChevronUp /> : <BiChevronDown />}
              </div>
              {dropdowns.cadastros && (
                <div className={styles.dropdown}>
                  <Link href="/dashboard/formulariosadd/formularioMaquinas" className={styles.subItem}>Nova Máquina</Link>
                  <Link href="/dashboard/formulariosadd/formularioTecnicoAdd" className={styles.subItem}>Novo Técnico</Link>
                  <Link href="/dashboard/usuarios" className={styles.subItem}>Novo Usuário</Link>
                </div>
              )}
            </div>
          </div>
        )}

        <Link href="/dashboard/controles/tecnicos" className={styles.item}>
          <LiaUserAstronautSolid size={25} /> <span>Técnicos</span>
        </Link>

        <Link href="/dashboard/documentacaoTecnica" className={styles.item}>
          <SiGoogledocs /> <span>Documentação Técnica</span>
        </Link>

        <a onClick={handleLogout} className={styles.item} style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}>
          <IoEnterOutline />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}