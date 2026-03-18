import { useState, useMemo } from 'react'
import {
  Search, ShoppingCart, Star, ChevronDown, X, Plus, Minus,
  Truck, Shield, RotateCcw, Heart, Zap, Tag, Menu,
  User, ChevronRight, Flame
} from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  'All', 'Electronics', 'Fashion', 'Home & Living', 'Sports',
  'Beauty', 'Books', 'Toys', 'Automotive',
]

const PRODUCTS = [
  // Electronics
  { id: 1,  category: 'Electronics', name: 'Wireless Noise-Cancelling Headphones', price: 79.99,  original: 129.99, rating: 4.8, reviews: 12430, sold: '50k+',  badge: 'Best Seller', emoji: '🎧', color: 'from-violet-500 to-purple-600' },
  { id: 2,  category: 'Electronics', name: 'Smart Watch Fitness Tracker Pro', price: 49.99,  original: 89.99,  rating: 4.6, reviews: 8210,  sold: '30k+',  badge: 'Hot',         emoji: '⌚', color: 'from-blue-500 to-cyan-600' },
  { id: 3,  category: 'Electronics', name: '4K Ultra HD Action Camera', price: 119.99, original: 179.99, rating: 4.7, reviews: 5640,  sold: '20k+',  badge: 'Sale',        emoji: '📷', color: 'from-slate-600 to-slate-800' },
  { id: 4,  category: 'Electronics', name: 'Portable Bluetooth Speaker 360°', price: 34.99,  original: 59.99,  rating: 4.5, reviews: 9870,  sold: '40k+',  badge: '',            emoji: '🔊', color: 'from-orange-500 to-red-600' },
  { id: 5,  category: 'Electronics', name: 'Mechanical Gaming Keyboard RGB', price: 64.99,  original: 99.99,  rating: 4.9, reviews: 7320,  sold: '25k+',  badge: 'New',         emoji: '⌨️', color: 'from-emerald-500 to-teal-600' },
  { id: 6,  category: 'Electronics', name: 'USB-C 100W Fast Charging Hub 7-in-1', price: 29.99,  original: 45.99,  rating: 4.4, reviews: 3210,  sold: '15k+',  badge: '',            emoji: '🔌', color: 'from-gray-500 to-gray-700' },
  // Fashion
  { id: 7,  category: 'Fashion',     name: 'Premium Slim-Fit Cotton T-Shirt', price: 14.99,  original: 24.99,  rating: 4.6, reviews: 22100, sold: '100k+', badge: 'Best Seller', emoji: '👕', color: 'from-sky-400 to-blue-600' },
  { id: 8,  category: 'Fashion',     name: 'Classic Leather Sneakers Unisex', price: 59.99,  original: 99.99,  rating: 4.7, reviews: 14300, sold: '60k+',  badge: 'Hot',         emoji: '👟', color: 'from-amber-400 to-orange-600' },
  { id: 9,  category: 'Fashion',     name: 'Oversized Hoodie Streetwear', price: 39.99,  original: 59.99,  rating: 4.5, reviews: 18200, sold: '80k+',  badge: '',            emoji: '🧥', color: 'from-rose-400 to-pink-600' },
  { id: 10, category: 'Fashion',     name: 'Polarized Sunglasses UV400', price: 19.99,  original: 39.99,  rating: 4.3, reviews: 6540,  sold: '35k+',  badge: 'Sale',        emoji: '🕶️', color: 'from-teal-500 to-emerald-600' },
  // Home & Living
  { id: 11, category: 'Home & Living', name: 'Smart LED Desk Lamp with USB Port', price: 24.99,  original: 39.99,  rating: 4.6, reviews: 8900,  sold: '45k+',  badge: '',            emoji: '💡', color: 'from-yellow-400 to-amber-600' },
  { id: 12, category: 'Home & Living', name: 'Ceramic Pour-Over Coffee Set', price: 32.99,  original: 49.99,  rating: 4.8, reviews: 4320,  sold: '18k+',  badge: 'New',         emoji: '☕', color: 'from-stone-500 to-amber-800' },
  { id: 13, category: 'Home & Living', name: 'Bamboo Kitchen Cutting Board Set', price: 18.99,  original: 28.99,  rating: 4.5, reviews: 11200, sold: '55k+',  badge: '',            emoji: '🪵', color: 'from-lime-600 to-green-700' },
  { id: 14, category: 'Home & Living', name: 'Wall Art Canvas Print Modern', price: 22.99,  original: 39.99,  rating: 4.4, reviews: 3100,  sold: '10k+',  badge: '',            emoji: '🖼️', color: 'from-indigo-400 to-purple-600' },
  // Sports
  { id: 15, category: 'Sports',      name: 'Yoga Mat Non-Slip 6mm Thick', price: 27.99,  original: 44.99,  rating: 4.7, reviews: 19800, sold: '90k+',  badge: 'Best Seller', emoji: '🧘', color: 'from-purple-400 to-violet-600' },
  { id: 16, category: 'Sports',      name: 'Adjustable Dumbbell Set 5-52lb', price: 199.99, original: 299.99, rating: 4.9, reviews: 7650,  sold: '22k+',  badge: 'Hot',         emoji: '🏋️', color: 'from-gray-600 to-slate-800' },
  { id: 17, category: 'Sports',      name: 'Running Shoes Lightweight Mesh', price: 54.99,  original: 89.99,  rating: 4.6, reviews: 13400, sold: '70k+',  badge: '',            emoji: '👟', color: 'from-orange-400 to-red-600' },
  // Beauty
  { id: 18, category: 'Beauty',      name: 'Vitamin C Serum Brightening 30ml', price: 16.99,  original: 28.99,  rating: 4.7, reviews: 31200, sold: '120k+', badge: 'Best Seller', emoji: '✨', color: 'from-yellow-300 to-orange-500' },
  { id: 19, category: 'Beauty',      name: 'Jade Roller & Gua Sha Set', price: 12.99,  original: 22.99,  rating: 4.5, reviews: 14600, sold: '65k+',  badge: '',            emoji: '💆', color: 'from-emerald-300 to-teal-600' },
  // Books
  { id: 20, category: 'Books',       name: 'Atomic Habits — James Clear', price: 11.99,  original: 18.99,  rating: 4.9, reviews: 45200, sold: '200k+', badge: 'Best Seller', emoji: '📗', color: 'from-green-500 to-emerald-700' },
  { id: 21, category: 'Books',       name: 'The Lean Startup — Eric Ries', price: 10.99,  original: 16.99,  rating: 4.7, reviews: 29800, sold: '150k+', badge: '',            emoji: '📘', color: 'from-blue-500 to-indigo-700' },
]

const FLASH_DEALS = PRODUCTS.filter(p => p.badge === 'Hot' || p.badge === 'Sale').slice(0, 5)

const BANNERS = [
  { id: 1, title: 'Mega Tech Sale', sub: 'Up to 60% off Electronics', cta: 'Shop Now', gradient: 'from-violet-600 via-purple-600 to-indigo-700', emoji: '⚡' },
  { id: 2, title: 'Fashion Week', sub: 'New arrivals — Free shipping over $30', cta: 'Explore', gradient: 'from-rose-500 via-pink-600 to-fuchsia-700', emoji: '👗' },
  { id: 3, title: 'Home Essentials', sub: 'Transform your space — Deals from $9.99', cta: 'Discover', gradient: 'from-amber-500 via-orange-500 to-red-600', emoji: '🏠' },
]

/* ------------------------------------------------------------------ */
/*  PRODUCT CARD                                                        */
/* ------------------------------------------------------------------ */

function ProductCard({ product, onAddToCart, inCart }) {
  const discount = Math.round(((product.original - product.price) / product.original) * 100)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Image area */}
      <div className={`relative bg-gradient-to-br ${product.color} h-40 flex items-center justify-center`}>
        <span className="text-5xl select-none">{product.emoji}</span>
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
            product.badge === 'Best Seller' ? 'bg-orange-500' :
            product.badge === 'Hot'         ? 'bg-red-500' :
            product.badge === 'New'         ? 'bg-emerald-500' :
            'bg-violet-500'
          }`}>
            {product.badge}
          </span>
        )}
        <span className="absolute top-2 right-2 text-[11px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-md">
          -{discount}%
        </span>
        <button className="absolute bottom-2 right-2 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
          <Heart size={13} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight line-clamp-2 font-medium">
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={10} className={s <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-600'} />
            ))}
          </div>
          <span className="text-[10px] text-slate-400">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
          <span className="text-xs text-slate-400 line-through">${product.original.toFixed(2)}</span>
        </div>

        <p className="text-[10px] text-slate-400">{product.sold} sold</p>

        <button
          onClick={() => onAddToCart(product)}
          className={`mt-auto w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
            inCart
              ? 'bg-emerald-500 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {inCart ? '✓ In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                            */
/* ------------------------------------------------------------------ */

export default function App() {
  const { isDark } = useTheme()

  const [search, setSearch]               = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeBanner, setActiveBanner]   = useState(0)
  const [cart, setCart]                   = useState([])   // [{...product, qty}]
  const [cartOpen, setCartOpen]           = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /* cart helpers */
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }
  const changeQty = (id, delta) => {
    setCart(prev =>
      prev.flatMap(i => {
        if (i.id !== id) return [i]
        const qty = i.qty + delta
        return qty <= 0 ? [] : [{ ...i, qty }]
      })
    )
  }
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  /* filtered products */
  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  const banner = BANNERS[activeBanner]

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header className="bg-gradient-to-r from-orange-500 to-orange-600 sticky top-0 z-40 shadow-md">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-1.5 text-white font-bold text-xl shrink-0 mr-2">
              <ShoppingCart size={22} strokeWidth={2.5} />
              <span className="hidden sm:block">VA<span className="font-black">Market</span></span>
            </div>

            {/* Search bar */}
            <div className="flex flex-1 h-9 rounded-lg overflow-hidden shadow-sm">
              <select
                className="hidden md:block bg-slate-100 text-slate-700 text-xs px-2 border-r border-slate-200 outline-none cursor-pointer"
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <input
                type="text"
                placeholder="Search products, brands and more…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-white text-slate-800 text-sm px-3 outline-none"
              />
              <button className="bg-orange-300 hover:bg-orange-200 transition-colors px-4 flex items-center">
                <Search size={16} className="text-orange-800" />
              </button>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-1 shrink-0">
              <button className="hidden sm:flex items-center gap-1.5 text-white text-xs hover:text-orange-100 transition-colors">
                <User size={16} />
                <span>Sign In</span>
              </button>
              <button
                className="relative p-2 text-white hover:text-orange-100 transition-colors"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-yellow-400 text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="sm:hidden text-white" onClick={() => setMobileMenuOpen(v => !v)}>
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Category bar */}
          <div className="bg-orange-600/80 border-t border-orange-400/30">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide py-1.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSearch('') }}
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-white text-orange-600'
                        : 'text-orange-100 hover:bg-white/15'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 pb-16">

          {/* ── HERO BANNER ──────────────────────────────────────── */}
          {!search && activeCategory === 'All' && (
            <div className="mt-4 mb-6">
              <div className={`relative bg-gradient-to-r ${banner.gradient} rounded-2xl overflow-hidden h-44 sm:h-52 flex items-center px-8 shadow-lg`}>
                <div className="flex-1">
                  <p className="text-white/70 text-sm mb-1 font-medium">Limited Time</p>
                  <h2 className="text-white text-2xl sm:text-3xl font-black mb-2">{banner.title}</h2>
                  <p className="text-white/80 text-sm mb-4">{banner.sub}</p>
                  <button className="bg-white text-slate-800 text-sm font-bold px-5 py-2 rounded-full hover:bg-slate-100 transition-colors shadow-md">
                    {banner.cta} →
                  </button>
                </div>
                <span className="text-7xl sm:text-8xl select-none opacity-30 absolute right-8">{banner.emoji}</span>
                <span className="text-7xl sm:text-8xl select-none hidden sm:block">{banner.emoji}</span>
              </div>
              {/* Dots */}
              <div className="flex justify-center gap-1.5 mt-2">
                {BANNERS.map((_, i) => (
                  <button key={i} onClick={() => setActiveBanner(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeBanner ? 'bg-orange-500 w-4' : 'bg-slate-300 dark:bg-slate-600'}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── TRUST BADGES ─────────────────────────────────────── */}
          {!search && activeCategory === 'All' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { icon: Truck,    text: 'Free Shipping',   sub: 'On orders $30+' },
                { icon: Shield,   text: 'Buyer Protection', sub: '100% guaranteed' },
                { icon: RotateCcw,text: 'Easy Returns',    sub: '30-day free return' },
                { icon: Zap,      text: 'Fast Delivery',   sub: '2-5 business days' },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                  <div className="w-8 h-8 bg-orange-50 dark:bg-orange-950/40 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-white">{text}</p>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── FLASH DEALS ──────────────────────────────────────── */}
          {!search && activeCategory === 'All' && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-red-500 fill-red-500" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Flash Deals</h3>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                </div>
                <button className="text-orange-500 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  See all <ChevronRight size={13} />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {FLASH_DEALS.map(p => {
                  const disc = Math.round(((p.original - p.price) / p.original) * 100)
                  return (
                    <div key={p.id} className="shrink-0 w-36 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                      <div className={`bg-gradient-to-br ${p.color} h-24 flex items-center justify-center relative`}>
                        <span className="text-3xl">{p.emoji}</span>
                        <span className="absolute bottom-1.5 left-1.5 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">-{disc}%</span>
                      </div>
                      <div className="p-2">
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight mb-1">{p.name}</p>
                        <p className="text-sm font-bold text-orange-500">${p.price.toFixed(2)}</p>
                        <p className="text-[10px] text-slate-400 line-through">${p.original.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* ── PRODUCT GRID ─────────────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {search
                  ? `Results for "${search}" (${filtered.length})`
                  : activeCategory === 'All' ? 'All Products' : activeCategory
                }
              </h3>
              <div className="flex items-center gap-1.5">
                <Tag size={12} className="text-slate-400" />
                <span className="text-xs text-slate-400">{filtered.length} items</span>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-slate-500 dark:text-slate-400 font-medium">No products found</p>
                <button onClick={() => { setSearch(''); setActiveCategory('All') }} className="mt-3 text-orange-500 text-sm font-semibold hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filtered.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={addToCart}
                    inCart={cart.some(i => i.id === p.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* ── CART SIDEBAR ─────────────────────────────────────────── */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />

            {/* Panel */}
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} className="text-orange-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">Your Cart</h3>
                  {cartCount > 0 && (
                    <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{cartCount}</span>
                  )}
                </div>
                <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-5xl mb-4">🛒</p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Your cart is empty</p>
                    <button onClick={() => setCartOpen(false)} className="mt-3 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                        <span className="text-2xl">{item.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight">{item.name}</p>
                        <p className="text-sm font-bold text-orange-500 mt-0.5">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item.id, +1)} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white shrink-0">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Subtotal</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                    <Truck size={12} />
                    <span>{cartTotal >= 30 ? 'Free shipping applied!' : `Add $${(30 - cartTotal).toFixed(2)} more for free shipping`}</span>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-orange-500/25">
                    Checkout →
                  </button>
                  <button onClick={() => setCartOpen(false)} className="w-full text-slate-500 dark:text-slate-400 text-sm hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
