# Operação Horizonte

Console de Missões PWA com gamificação ABA para crianças neurodivergentes.
Estética HUD verde teal neon, contrastes WCAG AAA, mobile-first.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **vite-plugin-pwa** (Service Worker + manifest)
- **Lucide React** (ícones)
- Persistência local via `localStorage`

## Deploy automatizado

Este projeto está pronto para deploy direto. Estrutura:

```
horizonte/
├── public/              # Assets estáticos (ícones PWA)
├── src/
│   ├── App.jsx          # Componente principal
│   ├── data.js          # Missões, recompensas, biblioteca de resgate
│   ├── illustrations.jsx # SVGs HUD (boot, emblemas, missões, radar)
│   ├── useLocalState.js # Hook de persistência
│   ├── index.css        # Tailwind base + grain global
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json          # Config Vercel
└── postcss.config.js
```

## Comandos

```bash
npm install      # Instalar dependências
npm run dev      # Servidor de desenvolvimento (localhost:5173)
npm run build    # Build de produção (gera /dist)
npm run preview  # Preview do build localmente
```

## Deploy na Vercel

Framework detectado automaticamente como Vite. Configurações em `vercel.json`:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`
- **Headers** configurados para Service Worker e manifest

## PWA

- Manifest gerado automaticamente
- Service Worker com precache (15 entradas, ~248 KB)
- Theme color: `#00FFC2` (neon teal)
- Background color: `#0A0F0D`
- Ícones: 192px, 512px, 512px maskable, Apple touch icon

## Painel Comando

- Acesso por PIN (default: `2026`, alterar em código se necessário)
- Validação assíncrona de missões em lote
- Reset de dados via UI

## Acessibilidade

- WCAG AAA em contrastes de texto (14:1 primário)
- Touch targets ≥44px (WCAG 2.5.5)
- Focus visible em todos os elementos interativos
- ARIA labels, live regions, roles semânticos
- Suporte a `prefers-reduced-motion`
- Skip link para leitores de tela
- Inputs com `font-size: 16px` (previne zoom iOS)
