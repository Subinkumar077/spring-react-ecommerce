import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api'

const categories = [
  { name: 'New arrivals', icon: '✦', tone: 'lavender' },
  { name: 'Men', icon: '◒', tone: 'blue' },
  { name: 'Women', icon: '◓', tone: 'peach' },
  { name: 'Accessories', icon: '◇', tone: 'mint' },
]

const fallbackProducts = [
  { id: 'fallback-1', name: 'Essential Oversized Tee', brand: 'Auraline', price: 42, category: 'Men' },
  { id: 'fallback-2', name: 'Sculpted Shoulder Bag', brand: 'Nove Studio', price: 118, category: 'Accessories' },
  { id: 'fallback-3', name: 'Relaxed Linen Set', brand: 'Auraline', price: 86, category: 'Women' },
  { id: 'fallback-4', name: 'Cloud Runner Sneakers', brand: 'Forma', price: 129, category: 'New arrivals' },
]

const productImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
]

const formatPrice = (price) => `$${Number(price || 0).toFixed(2)}`

function Header({ cartCount, onSearch }) {
  const [query, setQuery] = useState('')
  const submitSearch = (event) => {
    event.preventDefault()
    onSearch(query.trim())
  }
  return (
    <>
      <div className="announcement">Free shipping on orders over $75 <span>→</span></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Luma home">luma<span>.</span></a>
        <nav className="main-nav" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#new">New in</a><a href="#story">Our story</a></nav>
        <div className="header-actions">
          <form className="search-box" onSubmit={submitSearch}><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" /></form>
          <button className="icon-button" type="button" aria-label="Account">♙</button>
          <button className="icon-button bag-button" type="button" aria-label={`${cartCount} items in bag`}>♧<b>{cartCount}</b></button>
        </div>
      </header>
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">The everyday edit / 01</p><h1>Good things,<br /><em>beautifully</em> made.</h1><p className="hero-description">Thoughtful pieces for your everyday rituals. Designed with intention, made to be lived in.</p><a className="button button-dark" href="#shop">Explore the collection <span>→</span></a></div>
      <div className="hero-image"><div className="hero-sticker">NEW<br />SEASON</div><div className="hero-image-label">Objects of<br />daily beauty</div></div>
    </section>
  )
}

function CategoryStrip({ onCategory }) {
  return (
    <section className="category-section">
      <div className="section-heading"><div><p className="eyebrow">Shop by mood</p><h2>Find your <em>everyday</em></h2></div><span className="heading-note">Curated for the way<br />you live now.</span></div>
      <div className="category-grid">{categories.map((category) => <button className={`category-card ${category.tone}`} key={category.name} onClick={() => onCategory(category.name)}><span className="category-icon">{category.icon}</span><span>{category.name}</span><span className="category-arrow">↗</span></button>)}</div>
    </section>
  )
}

function ProductCard({ product, index, isFavorite, onFavorite, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap"><img src={productImages[index % productImages.length]} alt={product.name} className="product-image" />{index === 0 && <span className="product-badge">Bestseller</span>}<button className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={() => onFavorite(product.id)} type="button" aria-label="Save product">{isFavorite ? '♥' : '♡'}</button></div>
      <div className="product-details"><div><p className="product-brand">{product.brand || 'Luma studio'}</p><h3>{product.name}</h3></div><strong>{formatPrice(product.price)}</strong></div>
      <button className="add-button" onClick={() => onAdd(product)} type="button">Add to bag <span>+</span></button>
    </article>
  )
}

function ProductSection({ products, loading, error, favorites, onFavorite, onAdd, activeCategory, onClearCategory }) {
  return (
    <section className="products-section" id="shop">
      <div className="products-heading"><div><p className="eyebrow">A little something new</p><h2 id="new">{activeCategory ? `${activeCategory} edit` : 'New this week'}</h2></div>{activeCategory ? <button className="clear-filter" onClick={onClearCategory} type="button">Clear filter ×</button> : <a className="text-link" href="#shop">View all <span>↗</span></a>}</div>
      {error && <div className="notice">{error}</div>}
      {loading ? <div className="loading">Finding your next favorite thing<span>...</span></div> : products.length > 0 ? <div className="product-grid">{products.slice(0, 4).map((product, index) => <ProductCard key={product.id || `${product.name}-${index}`} product={product} index={index} isFavorite={favorites.includes(product.id)} onFavorite={onFavorite} onAdd={onAdd} />)}</div> : <div className="empty-state">No pieces found. Try another search.</div>}
    </section>
  )
}

function StoryBanner() {
  return <section className="story-banner" id="story"><div className="story-image" /><div className="story-copy"><p className="eyebrow">A slower kind of shopping</p><h2>Less, but <em>better.</em></h2><p>We believe the best things are the ones you reach for again and again. Luma is a considered collection of quality essentials made for a life well lived.</p><a className="button button-light" href="#story">Read our story <span>→</span></a></div></section>
}

function Benefits() {
  return <section className="benefits"><div><span>✦</span><strong>Thoughtfully made</strong><small>Quality materials, always.</small></div><div><span>↝</span><strong>Easy on the planet</strong><small>Better choices, less waste.</small></div><div><span>♡</span><strong>Here to help</strong><small>Real people, real support.</small></div></section>
}

function Footer() {
  return <footer><div className="footer-brand"><a className="brand" href="#top">luma<span>.</span></a><p>Everyday objects,<br />made beautiful.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#shop">Shop all</a><a href="#new">New in</a><a href="#story">Our story</a></div><div><strong>Help</strong><a href="#top">Shipping & returns</a><a href="#top">Contact</a><a href="#top">FAQ</a></div><div className="newsletter"><strong>Stay in the know</strong><p>New pieces, thoughtful notes,<br />straight to your inbox.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Your email address" /><button type="submit">→</button></form></div></div><div className="footer-bottom"><span>© 2025 Luma studio</span><span>Made for everyday living.</span></div></footer>
}

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [activeCategory, setActiveCategory] = useState('')

  const loadProducts = async (endpoint = '/products') => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}${endpoint}`)
      if (!response.ok) throw new Error('Unable to load products from the store.')
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setProducts(fallbackProducts)
      setError(`${requestError.message} Showing featured pieces instead.`)
    } finally {
      setLoading(false)
    }
  }

  // The initial request synchronizes the component with the external product API.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadProducts() }, [])
  const visibleProducts = useMemo(() => activeCategory ? products.filter((product) => product.category?.toLowerCase() === activeCategory.toLowerCase()) : products, [products, activeCategory])
  const searchProducts = (query) => { setActiveCategory(''); loadProducts(query ? `/products/search?keyword=${encodeURIComponent(query)}` : '/products') }
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id])

  return <div className="app"><Header cartCount={cartCount} onSearch={searchProducts} /><main><Hero /><CategoryStrip onCategory={setActiveCategory} /><ProductSection products={visibleProducts} loading={loading} error={error} favorites={favorites} onFavorite={toggleFavorite} onAdd={() => setCartCount((count) => count + 1)} activeCategory={activeCategory} onClearCategory={() => setActiveCategory('')} /><StoryBanner /><Benefits /></main><Footer /></div>
}

export default App
