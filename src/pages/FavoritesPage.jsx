import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import axios from 'axios'
import StyleCard from '../components/cards/StyleCard'

export default function FavoritesPage() {
  const [styles, setStyles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchFavorites() }, [])

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get('/api/favorites/full')
      setStyles(data.favorites || [])
    } catch {} finally { setLoading(false) }
  }

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="bg-aura-bg3 py-16 px-6 text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-subtitle mb-3">Your Wishlist</p>
          <h1 className="section-title">Favorites</h1>
          <div className="divider" />
          <p className="font-body text-sm text-aura-muted mt-4">{styles.length} saved styles</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => <div key={i} className="animate-pulse"><div className="aspect-[3/4] bg-aura-bg3 mb-4" /><div className="h-5 bg-aura-bg3 w-3/4 mb-2" /><div className="h-4 bg-aura-bg3 w-1/2" /></div>)}
          </div>
        ) : styles.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <FiHeart size={48} className="text-aura-light" />
            <h2 className="font-display text-3xl text-aura-dark font-light">No favorites yet</h2>
            <p className="font-body text-sm text-aura-muted">Heart the styles you love to save them here</p>
            <Link to="/styles" className="btn-primary">Explore Styles</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {styles.map((style, i) => <StyleCard key={style._id} style={style} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
