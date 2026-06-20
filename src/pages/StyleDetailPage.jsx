import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiShare2, FiMinus, FiPlus, FiShoppingBag, FiChevronLeft } from 'react-icons/fi'
import { AiFillHeart } from 'react-icons/ai'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import StarRating from '../components/StarRating'
import StyleCard from '../components/cards/StyleCard'
import ReviewSection from '../components/reviews/ReviewSection'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1529139574466-a303027614b8?w=600&q=80'

export default function StyleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const [style, setStyle] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [addingCart, setAddingCart] = useState(false)
  const [cartMsg, setCartMsg] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchStyle()
    window.scrollTo(0, 0)
  }, [id])

  const fetchStyle = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/styles/${id}`)
      setStyle(data.style)
      setSimilar(data.similar || [])
    } catch {
      navigate('/styles')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCart = async () => {
    if (!user) { navigate('/login'); return }
    setAddingCart(true)
    try {
      await addToCart(id, qty)
      setCartMsg('Added to cart!')
      setTimeout(() => setCartMsg(''), 3000)
    } catch { setCartMsg('Something went wrong') }
    finally { setAddingCart(false) }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="pt-20 min-h-screen bg-aura-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-aura-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!style) return null

  const images = style.images?.length ? style.images : [PLACEHOLDER]
  const fav = isFavorite(style._id)

  return (
    <div className="pt-20 bg-aura-bg min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="flex items-center gap-2 font-body text-xs text-aura-muted tracking-wide">
          <Link to="/" className="hover:text-aura-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/styles" className="hover:text-aura-accent transition-colors">Styles</Link>
          <span>/</span>
          <span className="text-aura-dark">{style.title}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            {/* Main image */}
            <div className="aspect-[3/4] bg-aura-bg3 overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={style.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-20 h-24 overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-aura-accent' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <p className="section-subtitle mb-3">{style.category}</p>
            <h1 className="font-display text-4xl md:text-5xl text-aura-dark font-light leading-tight mb-4">
              {style.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={style.averageRating || 0} size={16} />
              <span className="font-body text-sm text-aura-muted">
                {style.averageRating ? style.averageRating.toFixed(1) : '0'} ({style.reviewCount || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="font-display text-4xl text-aura-accent mb-8">
              PKR {style.price?.toLocaleString()}
            </p>

            {/* Description */}
            <p className="font-body text-sm text-aura-muted leading-relaxed tracking-wide mb-8">
              {style.description}
            </p>

            {/* Details */}
            <div className="space-y-3 mb-8 pb-8 border-b border-aura-light">
              {style.fabric && <DetailRow label="Fabric" value={style.fabric} />}
              {style.occasion && <DetailRow label="Occasion" value={style.occasion} />}
              {style.category && <DetailRow label="Category" value={style.category} />}
            </div>

            {/* Quantity + Cart */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-aura-muted w-20">Quantity</p>
                <div className="flex items-center border border-aura-light">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-aura-dark hover:bg-aura-bg3 transition-colors">
                    <FiMinus size={14} />
                  </button>
                  <span className="w-12 text-center font-body text-sm text-aura-dark">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-aura-dark hover:bg-aura-bg3 transition-colors">
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleAddCart} disabled={addingCart}
                  className="flex-1 flex items-center justify-center gap-2 btn-primary disabled:opacity-60">
                  <FiShoppingBag size={15} />
                  {addingCart ? 'Adding...' : 'Add to Cart'}
                </button>
                {user && (
                  <button onClick={() => toggleFavorite(style._id)}
                    className="w-12 h-12 border border-aura-light flex items-center justify-center hover:border-aura-accent transition-colors">
                    {fav ? <AiFillHeart size={18} className="text-aura-accent" /> : <FiHeart size={18} className="text-aura-dark" />}
                  </button>
                )}
                <button onClick={handleShare}
                  className="w-12 h-12 border border-aura-light flex items-center justify-center hover:border-aura-dark transition-colors relative">
                  <FiShare2 size={18} className="text-aura-dark" />
                  {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-aura-dark text-aura-bg text-[10px] px-2 py-1 whitespace-nowrap">Copied!</span>}
                </button>
              </div>

              {cartMsg && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  className="font-body text-xs text-aura-accent tracking-wide">{cartMsg}</motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-20 pt-16 border-t border-aura-light">
          <ReviewSection styleId={id} onReviewUpdate={fetchStyle} />
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-20 pt-16 border-t border-aura-light">
            <div className="mb-12">
              <p className="section-subtitle mb-3">You May Also Like</p>
              <h2 className="section-title">Similar Styles</h2>
              <div className="divider ml-0" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similar.map((s, i) => <StyleCard key={s._id} style={s} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted w-20">{label}</span>
      <span className="font-body text-sm text-aura-dark">{value}</span>
    </div>
  )
}
