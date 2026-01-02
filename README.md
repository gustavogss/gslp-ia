# 🚀 GS-LP-IA

**Bem-vindo(a)!** Este é um projeto frontend leve e moderno em **React + TypeScript** criado com **Vite**, com integração com o GemiAI.

---

## ✨ Visão geral

Uma interface de chat/frontend para interagir com serviços de IA. Inclui componentes para histórico, painel de preview e um serviço para comunicar com APIs de GenAI.

---

## 🧰 Stacks e tecnologias

- **React** (v19) — UI
- **TypeScript** — tipagem estática
- **Vite** — build e dev server
- **@google/genai** — SDK GenAI (ex.: integração com Gemini)
- **lucide-react** — ícones
- **Node.js / npm** — runtime e gerenciador de pacotes

---

## 🚀 Como rodar (desenvolvimento)

1. Instale as dependências:

```bash
npm install
```

2. Rode em modo dev:

```bash
npm run dev
```

3. Build para produção:

```bash
npm run build
```

4. Pré-visualizar a build:

```bash
npm run preview
```

---

## 🗂 Estrutura importante

- `src/` (ou raiz): fontes do app
- `App.tsx` — ponto central da aplicação
- `index.tsx` / `index.html` — boot do Vite + React
- `components/` — UI (ex.: `ChatInterface.tsx`, `HistorySidebar.tsx`, `PreviewPane.tsx`)
- `services/geminiService.ts` — integração com a API GenAI
- `vite.config.ts` / `tsconfig.json` — configuração do projeto

---

## 🔒 Configurações de API

> :warning: **Atenção:** para usar integrações GenAI (ex.: Google Gemini) você precisa configurar suas credenciais/keys. Verifique `services/geminiService.ts` para detalhes sobre como fornecer sua chave de API (variáveis de ambiente, arquivo `.env`, etc.).

---

## 🤝 Contribuições

Contribuições são bem-vindas! Abra issues para bugs/ideias e faça PRs com mudanças pequenas e descritas.

---

## 📬 Contato

Se precisar de ajuda com configuração ou quiser colaborar, abra uma issue ou mande uma mensagem no repositório.

---

Feito com ❤️ usando **React + TypeScript + Vite**. Divirta-se! 🎉
