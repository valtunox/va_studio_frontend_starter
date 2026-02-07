# VA Studio Component Index

For AI/vibe coding: discover existing components to reuse instead of recreating.

## Shared UI (shadcn/ui)

| Path | Description |
|------|-------------|
| `src/components/ui/button.jsx` | Button with variants: default, destructive, outline, secondary, ghost, link |
| `src/components/ui/card.jsx` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `src/components/ui/input.jsx` | Text input with focus styles |

## Shared Utils

| Path | Description |
|------|-------------|
| `src/lib/utils.js` | `cn()` – merges Tailwind classes |

## Portfolio Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | Main layout – Hero, About, Skills, Projects, Contact |
| Uses | Lucide (Menu, Github, Linkedin, Mail), Headless UI (Menu), Button, Card |

## SaaS Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | Dashboard layout – Sidebar, Header, Stats cards, Data table |
| Uses | Lucide (LayoutDashboard, Users, Settings, BarChart3, etc.), Headless UI (Menu), Button, Card, Input |

## E-commerce Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | Store layout – Nav, Hero, Product grid, Cart |
| Uses | Lucide (ShoppingCart, Search, Star), Headless UI (Menu), Button, Card, Input |

## Dependencies

- **Tailwind CSS** – base styling
- **shadcn/ui** – Button, Card, Input (Radix primitives)
- **Headless UI** – Menu, Dialog (accessible dropdowns, modals)
- **Lucide React** – Icons
