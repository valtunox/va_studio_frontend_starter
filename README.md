# VA Studio Frontend Starter

Vite + React starter with three templates for vibe coding (Lovable/Replit-style).

## Templates

| Template | Path | Use case |
|----------|------|----------|
| **Portfolio** | `templates/portfolio/` | Personal portfolio, projects, skills, contact |
| **SaaS** | `templates/saas/` | Dashboard, sidebar, stats cards, data tables |
| **E-commerce** | `templates/ecommerce/` | Store, product grid, cart, checkout flow |

Default: Portfolio. Change `src/App.jsx` to re-export another template:

```js
export { default } from '../templates/saas/App.jsx'     // SaaS
export { default } from '../templates/ecommerce/App.jsx' // E-commerce
```

## UI Stack

- **Tailwind CSS** – base styling
- **shadcn/ui** – Button, Card, Input (`src/components/ui/`)
- **Headless UI** – Menu, accessible dropdowns
- **Lucide React** – Icons

## Run

```bash
npm install
npm run dev
```

## Component Index

See `templates/COMPONENT_INDEX.md` for AI context and component discovery.
