# AlltiControl | Gestão Full Stack de TI e Ativos
## Gerenciando sua Empresa de Informática de A a Z
<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" /></a>
  <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white" /></a>
</p>

## 🚀 Sobre o Projeto

> **Sistema SaaS Full Stack em produção e implantação real.** > Atualmente utilizado por uma empresa de tecnologia para gerenciar a infraestrutura de TI da **Prefeitura de Mogi das Cruzes**, cobrindo 100% dos postos de saúde e escolas municipais.

### 📈 Números Atuais:
- **130+ Instituições Públicas** cadastradas e operacionais.
- **2 Empresas Privadas** utilizando o sistema para gestão interna.
- **X Usuários Ativos** (técnicos e gestores) processando chamados diariamente.
  
## 🚨 O Problema

Empresas de informática gerenciavam chamados em sistemas legados com navegação fragmentada de 5 a 6 telas por atendimento. O processo era lento, gerava retrabalho dos técnicos de campo e dificultava o controle dos gestores.

## ✅ A Solução

O **AlltiControl** unificou todo o fluxo em 2 telas com interface mobile-first para técnicos e painel web para gestores, substituindo o sistema anterior (ALVO) por uma experiência integrada e intuitiva.

## 📊 Impacto Real

| Métrica | Antes | Depois |
|---|---|---|
| Telas por atendimento | 5-6 telas | 2 telas |
| Etapas de preenchimento | 100% | Redução de 83% |
| Órgãos públicos atendidos | 0 | 15+ municípios |
| Tempo de desenvolvimento | — | 6 meses (jun-dez/2025) |

## 🏗️ Contexto

Desenvolvido paralelamente à atuação como técnico de helpdesk N2, o projeto foi validado com técnicos de campo em cada feature, apresentado à gestão com protótipo funcional de 3 módulos-chave e aprovado para produção — resultando em promoção a Desenvolvedor Fullstack.

Atualmente em implantação em prefeituras, escolas e postos de saúde.

Ele foi projetado para **facilitar a rotina operacional**, organizar atendimentos e melhorar a comunicação entre técnicos e clientes.  

<img width="1280" height="800" alt="5" src="https://github.com/user-attachments/assets/2a391f74-2da2-4bd9-94e6-3dc382919e3e" />
---

<img width="1280" height="800" alt="os web" src="https://github.com/user-attachments/assets/d77e498b-efb2-4248-af87-32ebb5050c4e" />

---

<img width="1280" height="800" alt="web" src="https://github.com/user-attachments/assets/95147eff-d224-4f8e-894d-3b751a39dfc4" />

---

<img width="1280" height="800" alt="8" src="https://github.com/user-attachments/assets/2c65e271-6da0-4d9f-8c9e-28d120429567" />
---

Principais funcionalidades:  
- **Controle de Tempo de Atividade:** Registro automático de Início, Pausa, Retorno e Término de OS com cálculo de duração real.
- **Relatórios Personalizados:** Filtros avançados por data, tipo de tarefa, cliente e instituição.
- **Exportação de Dados:** Geração de relatórios de Ordens de Serviço em formato Excel (.xlsx).
- Registro completo de OS e tickets internos.
- Cadastro de Novos usuários e Técnicos.
- Cadastro de Empresas e Instituições Unidade com endereço e cnpj.
- Agenda técnica integrada (diária, semanal, mensal).
- Aplicativo mobile para técnicos em **React Native**.
- Integração com **Google Maps** e **Waze**.
- Assinatura digital de ordens concluídas.
- Gestão de clientes, unidades e endereços.
- Cadastro e controle de máquinas por patrimônio, Assistência Técnica, Laudo Técnico e status (Laboratório, Pendentes, etc).
- Painel administrativo moderno em **Next.js e Sass Modular**.
- Backend seguro com **Node.js**, **Express**, **PostgreSQL** e **Prisma**.
- Autenticação JWT e criptografia com biblioteca bcrypt.

---

## 📌 Funcionalidades

### 💻 Web App
- **Geração de Relatórios:** Dashboard com filtros dinâmicos e exportação de dados.
- **UI/UX Aprimorada:** Inputs de data com máscaras (dd/mm/aaaa) e componentes de seleção customizados.
- Dashboard de OS abertas, em andamento e concluídas.
- Agenda/Calendário Técnico.
- Gestão de clientes e unidades (privadas, públicas, escolas, empresas).
- Cadastro de máquinas e controle de manutenção.
- Documentação técnica com assinatura digital.
- Cadastro de técnicos e controle de acessos.
- Login seguro com JWT (salva os tokens nos cookies do navegador).

### 📱 Mobile App
- **Filtro de Atribuição:** O técnico visualiza apenas as ordens de serviço atribuídas a ele (Segurança de Dados).
- **Timer de OS:** Botões dinâmicos para controle de tempo de execução da atividade.
- Geolocalização para rotas (Waze e Google Maps).
- Formulário de atendimento completo.
- Upload e envio de imagens (expo-image-picker + Cloudinary).
- Assinatura Digital (react-native-signature-canvas).
- Conclusão de Ordens de Serviço.
  
---

## 🛠 Tecnologias Utilizadas

| Frontend Web | Backend | Mobile App |
|--------------|---------|------------|
| Next.js | Node.js | React Native |
| React.js | Express | Expo |
| TypeScript | PostgreSQL | Context API + AsyncStorage |
| SCSS Modular | Prisma | Axios |

**Outras Bibliotecas:** ExcelJS/SheetJS, React-Select, Axios, JWT, Bcrypt, componentes customizados e responsivos.

---

## 💡 Motivação

O AlltiControl foi construído para devolver tempo à operação. Em vez de lutar com softwares burocráticos, o técnico foca no problema e o gestor foca na estratégia, tudo através de uma interface moderna e segura.

---
## Problemas Conhecidos e Soluções (Concluído e Resolvido !)
- **Cálculo de Tempo:** Corrigido bug crítico no cálculo preciso do tempo das OS (Início, Pausa e Retomar). Solução aplicada via Renderização Condicional e lógica de backend.
- **Máscara de Data:** Implementada lógica para garantir formato dd/mm/aaaa em todos os navegadores.

## 🔜 Próximos Passos / Melhorias Futuras
- Fazer Deploy na Vercel.
- Criar Funcionalidade de Transformar áudio em texto para documentação técnica (Expo Speech).
- Notificações push no app mobile.
- Implementar validação com Zod nas rotas da API.

---

## 📁 Status do Projeto

⚙️ **Fase de Implantação e Expansão:** O AlltiControl não é apenas um projeto de estudo; ele é a ferramenta central de operação em Mogi das Cruzes/SP. O software já provou sua estabilidade ao gerenciar o parque tecnológico de mais de 130 unidades de saúde e educação, além de clientes do setor privado. 

Atualmente, o foco está na coleta de feedbacks dos técnicos em campo para o refinamento de métricas de performance e inteligência de dados.
