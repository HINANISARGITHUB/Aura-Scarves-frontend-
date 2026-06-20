import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { AiFillHeart } from 'react-icons/ai'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'
import StarRating from '../StarRating'

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1529139574466-a303027614b8?w=400&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
  'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?w=400&q=80',
]

export default function StyleCard({ style, index = 0 }) {
  const { user } = useAuth()
  const { toggleFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(style._id)
  const img = style.images?.[0] || PLACEHOLDER_IMAGES[index % 3]

  const handleFav = async (e) => {
    e.preventDefault()
    if (!user) return
    await toggleFavorite(style._id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/styles/${style._id}`} className="group block">
        {/* Image */}
        <div className="img-hover-zoom relative aspect-[3/4] bg-aura-bg3 overflow-hidden mb-4">
          <img
            src={img}
            alt={style.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Favorite btn */}
          {user && (
            <button
              onClick={handleFav}
              className="absolute top-3 right-3 w-9 h-9 bg-aura-bg/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-aura-bg"
            >
              {fav ? <AiFillHeart size={16} className="text-aura-accent" /> : <FiHeart size={16} className="text-aura-dark" />}
            </button>
          )}
          {/* Category tag */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-aura-darker/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-aura-bg/90">{style.category}</span>
          </div>
        </div>

        {/* Info */}
        <div>
          {/* Title */}
          <h3 className="font-display text-base md:text-lg text-aura-dark font-mediu group-hover:text-aura-accent transition-colors duration-200 leading-snug line-clamp-1">
            {style.title}
          </h3>

          {/* Price - mobile pe apni line pe */}
          <p className="font-display text-base md:text-lg text-aura-accent mt-1">
            PKR {style.price?.toLocaleString()}
          </p>

          {/* Stars + fabric */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1">
              <StarRating rating={style.averageRating || 0} size={11} />
              <span className="font-body text-[9px] text-aura-muted">({style.reviewCount || 0})</span>
            </div>
            {style.fabric && (
              <p className="font-body text-[11px] text-aura-muted tracking-wide">{style.fabric}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

