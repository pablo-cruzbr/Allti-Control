"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next"; 
import {
  BiHome,
  BiBookAlt,
  BiSolidReport,
  BiTask,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import { FaComputer } from "react-icons/fa6";
import { IoGameControllerOutline, IoEnterOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FiUserPlus } from "react-icons/fi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import Image from "next/image";
import logo from '../../../../public/Logo11.svg';

import styles from "../sidebar/Sidebar.module.scss";

export default function Sidebar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getCookie("role"); 
    setRole(userRole as string);
  }, []);

  const [dropdowns, setDropdowns] = useState({
    tickets: false,
    controles: false,
    clientes: false,
    cadastros: false
  });

  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const isAdmin = role === "ADMIN";

  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo Allti Control" width={1000} height={48} priority />
      </div>

      <div className={styles.menuList}>
        <a href="/dashboard/ticketscount" className={styles.item}>
          <BiHome />
          Dashboard
        </a>

        <div className={styles.item} onClick={() => toggleDropdown("tickets")} style={{ cursor: "pointer" }}>
          <BiTask />
          Tickets
          {dropdowns.tickets ? <BiChevronUp style={{ marginLeft: "auto" }} /> : <BiChevronDown style={{ marginLeft: "auto" }} />}
        </div>
        {dropdowns.tickets && (
          <div className={styles.dropdown}>
            <a href="/dashboard/tickets" className={styles.subItem}>Lista de Tickets</a>
            <a href="/AreadeUsuario/formularioAddTickets" className={styles.subItem}>Abrir um Ticket</a>
          </div>
        )}

        <div className={styles.item} onClick={() => toggleDropdown("controles")} style={{ cursor: "pointer" }}>
          <IoGameControllerOutline />
          Controles
          {dropdowns.controles ? <BiChevronUp style={{ marginLeft: "auto" }} /> : <BiChevronDown style={{ marginLeft: "auto" }} />}
        </div>
        {dropdowns.controles && (
          <div className={styles.dropdown}>
            <a href="/dashboard/controles/equipamentos" className={styles.subItem}>Lista de Maquinas</a>
            <a href="/dashboard/controles/assistenciaTecnica" className={styles.subItem}>Assistência Técnica</a>
            <a href="/dashboard/controles/laudoTecnico" className={styles.subItem}>Laudo Técnico</a>
            <a href="/dashboard/controles/laboratorio" className={styles.subItem}>Laboratório</a>
          </div>
        )}

        {isAdmin && (
          <>
            <div className={styles.item} onClick={() => toggleDropdown("clientes")} style={{ cursor: "pointer" }}>
              <FaRegUserCircle />
              Clientes
              {dropdowns.clientes ? <BiChevronUp style={{ marginLeft: "auto" }} /> : <BiChevronDown style={{ marginLeft: "auto" }} />}
            </div>
            {dropdowns.clientes && (
              <div className={styles.dropdown}>
                <a href="/dashboard/clientesprivados" className={styles.subItem}>Clientes Privados</a>
                <a href="/dashboard/clientesMunicipais" className={styles.subItem}>Clientes Municipais</a>
                <a href="/dashboard/setor" className={styles.subItem}>Lista Setores</a>
              </div>
            )}
          </>
        )}

        {isAdmin && (
          <>
            <div className={styles.item} onClick={() => toggleDropdown("cadastros")} style={{ cursor: "pointer" }}>
              <FiUserPlus />
              Cadastros
              {dropdowns.cadastros ? <BiChevronUp style={{ marginLeft: "auto" }} /> : <BiChevronDown style={{ marginLeft: "auto" }} />}
            </div>
            {dropdowns.cadastros && (
              <div className={styles.dropdown}>
                <a href="/dashboard/formulariosadd/formularioMaquinas" className={styles.subItem}>Nova Maquina</a>
                <a href="/dashboard/formulariosadd/formularioTecnicoAdd" className={styles.subItem}>Novo Técnico</a>
                <a href="/dashboard/usuarios" className={styles.subItem}>Novo Usuário</a>
              </div>
            )}
          </>
        )}

        <a href="/dashboard/controles/tecnicos" className={styles.item}>
          <LiaUserAstronautSolid size={25} />
          Técnicos
        </a>

        <a href="/dashboard/documentacaoTecnica" className={styles.item}>
          <SiGoogledocs />
          Documentação Técnica
        </a>

        <a href="/" className={styles.item}>
          <IoEnterOutline />
          Logout
        </a>
      </div>
    </div>
  );
}