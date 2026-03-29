# PrathamOne: Monorepo Restructuring Strategy

To support the split between the static marketing site (GitHub Pages) and the dynamic application (Vercel), we will reorganize the repository into a more modular structure.

---

## 1. Directory Structure

```text
PrathamOneNetwork/
├── apps/
│   ├── web/           # Main Dynamic App (Vercel)
│   │   ├── app/       # Layouts, student/lecturer/parent/admin dashboards
│   │   └── dashboard/ # Dashboard-specific routes
│   └── marketing/     # Static Marketing Site (GitHub Pages)
│       ├── app/       # Static landing page, about, features
│       └── out/       # Static export target
├── packages/
│   ├── ui/            # Shared UI Library (Tailwind/Vanilla CSS)
│   │   ├── components/
│   │   └── styles/
│   ├── db/            # Database & Auth Layer
│   │   ├── client.ts  # Supabase Client
│   │   └── types.ts   # Auto-generated Supabase types
│   └── ai/            # AI Agent Logic
│       ├── agents/    # LectureComposer, Assessment, etc.
│       └── utils/     # Prompt templates, streaming helpers
├── docs/              # System Documentation
│   ├── AI_AGENT_POLICY.md
│   └── ARCHITECTURE.md
└── config/            # Shared configurations (ESLint, TSConfig, Turbo)
```

---

## 2. Deployment Mapping

| Target | Deployment Platform | Build Command |
| :--- | :--- | :--- |
| `apps/marketing` | GitHub Pages | `turbo build --filter=marketing` |
| `apps/web` | Vercel | `turbo build --filter=web` |
| Edge Functions | Supabase Functions | `supabase functions deploy` |

---

## 3. Component Migration (Next Steps)

1.  **Marketing**: Move the current `apps/web/app/page.tsx` (Hero, Feature pills) into `apps/marketing/app/page.tsx`.
2.  **Web App**: Create a new interactive Dashboard in `apps/web` with layout sidebars for multi-role navigation.
3.  **UI Isolation**: Move all base CSS variables (`globals.css`) and shared components into `packages/ui` to ensure consistent branding across both apps.

---

> [!TIP]
> This restructuring will use **Turborepo** to manage dependencies and caching, ensuring that a change in `packages/ui` triggers a rebuild of both marketing and web apps.
