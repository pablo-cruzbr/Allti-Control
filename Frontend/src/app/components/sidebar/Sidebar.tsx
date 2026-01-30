"use client";
import React, { useState } from "react";
import {
  BiHome,
  BiBookAlt,
  BiSolidReport,
  BiTask,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import { FaComputer } from "react-icons/fa6";
import { IoGameControllerOutline, IoEnterOutline} from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FiUserPlus } from "react-icons/fi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import Image from "next/image";
import logo from '../../../assets/Logo9.svg'

import styles from "../sidebar/Sidebar.module.scss";

export default function Sidebar() {
  // Estado para controlar os dropdowns de forma independente
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

  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <Image 
        src={logo}  
        alt="Logo Allti Control"
        width={1000} 
        height={48} 
        priority
      />
      
      </div>

      <div className={styles.menuList}>
        <a href="/dashboard/ticketscount" className={styles.item}>
          <BiHome />
          Dashboard
        </a>

          {/* Tickets */}
        <div
          className={styles.item}
          onClick={() => toggleDropdown("tickets")}
          style={{ cursor: "pointer" }}
        >
          <BiTask />
          Tickets
          {dropdowns.tickets ? (
            <BiChevronUp style={{ marginLeft: "auto" }} />
          ) : (
            <BiChevronDown style={{ marginLeft: "auto" }} />
          )}
        </div>

         {dropdowns.tickets && (
          <div className={styles.dropdown}>
            <a href="/dashboard/tickets" className={styles.subItem}>
              Lista de Tickets
            </a>
            
            <a href="/AreadeUsuario/formularioAddTickets" className={styles.subItem}>
              Abrir um Ticket
            </a>
          </div>
        )}

         {/* Controles */}
        <div
          className={styles.item}
          onClick={() => toggleDropdown("controles")}
          style={{ cursor: "pointer" }}
        >
          <IoGameControllerOutline />
          Controles
          {dropdowns.controles ? (
            <BiChevronUp style={{ marginLeft: "auto" }} />
          ) : (
            <BiChevronDown style={{ marginLeft: "auto" }} />
          )}
        </div>
        {dropdowns.controles && (
          <div className={styles.dropdown}>
            <a href="/dashboard/controles/equipamentos" className={styles.subItem}>
              Lista de Maquinas Cadastradas
            </a>
            
            <a href="/dashboard/controles/assistenciaTecnica" className={styles.subItem}>
              Assistência Técnica
            </a>
            <a href="/dashboard/controles/laudoTecnico" className={styles.subItem}>
              Laudo Técnico
            </a>
            <a href="/dashboard/controles/laboratorio" className={styles.subItem}>
              Laboratório
            </a>
            <a
              href="/dashboard/controles/pendentesLaboratorio"
              className={styles.subItem}
            >
              Máquinas Pendentes no Laboratório
            </a>
            <a
              href="/dashboard/controles/pendentesOro"
              className={styles.subItem}
            >
              Máquinas Pendentes Oro
            </a>

            <a
              href="/dashboard/controles/estabilizares"
              className={styles.subItem}
            >
              Estabilizadores
            </a>
          </div>
        )}


        {/* Clientes */}
        <div
          className={styles.item}
          onClick={() => toggleDropdown("clientes")}
          style={{ cursor: "pointer" }}
        >
          <FaRegUserCircle />
          Clientes
          {dropdowns.clientes ? (
            <BiChevronUp style={{ marginLeft: "auto" }} />
          ) : (
            <BiChevronDown style={{ marginLeft: "auto" }} />
          )}
        </div>
        {dropdowns.clientes && (
          <div className={styles.dropdown}>
            <a href="/dashboard/clientesprivados" className={styles.subItem}>
              Lista de Clientes Privados
            </a>
            <a href="/dashboard/clientesMunicipais" className={styles.subItem}>
              Lista de Clientes Municipais
            </a>
            <a href="/dashboard/usuarios" className={styles.subItem}>
              Lista de Usuários
            </a>

            <a href="/dashboard/ramaisSetores" className={styles.subItem}>
               Lista de Ramais e Setores
            </a>

             <a href="/dashboard/setor" className={styles.subItem}>
               Lista Setores
            </a>
          </div>
        )}

        {/* Cadastros */}
        <div
          className={styles.item}
          onClick={() => toggleDropdown("cadastros")}
          style={{ cursor: "pointer" }}
        >
          <FiUserPlus />
          Cadastros
          {dropdowns.cadastros ? (
            <BiChevronUp style={{ marginLeft: "auto" }} />
          ) : (
            <BiChevronDown style={{ marginLeft: "auto" }} />
          )}
        </div>
        {dropdowns.cadastros && (
          <div className={styles.dropdown}>

            <a href="/dashboard/formulariosadd/formularioMaquinas" className={styles.subItem}>
              Cadastrar Nova Maquina
            </a> 
            
            <a href="/dashboard/formulariosadd/formularioTecnicoAdd" className={styles.subItem}>
              Cadastrar Novo Técnico
            </a>
            
            <a href="/dashboard/usuarios" className={styles.subItem}>
              Cadastrar um  novo usuário na Plataforma
            </a>

            <a href="/dashboard/formulariosadd/formularioClientesMunicipais" className={styles.subItem}>
              Cadastrar uma Instituição de Saúde ou Escolar
            </a>

            <a href="/dashboard/formulariosadd/formularioClientesPrivados" className={styles.subItem}>
              Cadastrar uma Empresa Privada
            </a>
          </div>
        )}

         <a href="/dashboard/controles/tecnicos" className={styles.item}>
          <LiaUserAstronautSolid size={25} />
          Técnicos
         </a>

         <a href="/dashboard/documentacaoTecnica" className={styles.item}>
          <SiGoogledocs />
          Documentação Técnica
         </a>

         
        {/* Compras */}
        <a href="/dashboard/compras" className={styles.item}>
          <BiSolidReport className={styles.icon} />
          Compras
        </a>

        <a href="/" className={styles.item}>
          <IoEnterOutline />
          Logout
        </a>
      </div>
    </div>
  );
}
