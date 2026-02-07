import { useState } from 'react'
import { ShoppingCart, Search, Menu, Star } from 'lucide-react'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 3, name: 'Laptop Stand', price: 49.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' },
]

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#' },
  { label: 'Categories', href: '#' },
  { label: 'Deals', href: '#' },
]

function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Store</span>

            <div className="hidden md:flex gap-8">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Input placeholder="Search products..." className="w-64 pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <HeadlessMenu as="div" className="md:hidden">
                <MenuButton as={Button} variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
                  {navLinks.map(({ label, href }) => (
                    <MenuItem key={label}>
                      <a href={href} className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">{label}</a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </HeadlessMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Discover the latest products and unbeatable deals. Quality you can trust.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                    <span className="text-sm text-slate-500 ml-2">{product.rating}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setCartCount((c) => c + 1)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-slate-500 dark:text-slate-400">&copy; 2025 Store. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">Terms</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
