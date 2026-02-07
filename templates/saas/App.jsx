import { useState } from 'react'
import { LayoutDashboard, Users, Settings, Menu, BarChart3, TrendingUp, Package } from 'lucide-react'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
  { icon: Users, label: 'Users', href: '#' },
  { icon: Package, label: 'Products', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const stats = [
  { label: 'Total Revenue', value: '$45,231', change: '+20%', icon: TrendingUp },
  { label: 'Active Users', value: '2,350', change: '+15%', icon: Users },
  { label: 'Conversions', value: '1,234', change: '+8%', icon: BarChart3 },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SaaS App</span>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <HeadlessMenu as="div" className="md:hidden">
            <MenuButton as={Button} variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </MenuButton>
            <MenuItems className="absolute left-4 right-4 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
              {sidebarLinks.map(({ icon: Icon, label, href }) => (
                <MenuItem key={label}>
                  <a href={href} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                </MenuItem>
              ))}
            </MenuItems>
          </HeadlessMenu>
          <div className="flex-1 max-w-md ml-4 md:ml-0">
            <Input placeholder="Search..." className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
          </div>
          <Button>Get Started</Button>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back! Here's your overview.</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map(({ label, value, change, icon: Icon }) => (
              <Card key={label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</CardTitle>
                  <Icon className="w-4 h-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Description</th>
                      <th className="text-left px-4 py-3 font-medium">Date</th>
                      <th className="text-right px-4 py-3 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="px-4 py-3">Sample transaction {i}</td>
                        <td className="px-4 py-3 text-slate-500">Feb {i}, 2025</td>
                        <td className="px-4 py-3 text-right font-medium">${(i * 100).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default App
