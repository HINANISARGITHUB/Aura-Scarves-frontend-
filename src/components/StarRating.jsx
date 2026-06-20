import { FiStar } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'

export default function StarRating({ rating = 0, onChange, size = 16, interactive = false }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => interactive && onChange && onChange(star)}
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          type="button"
        >
          {star <= Math.round(rating) ? (
            <AiFillStar size={size} className="text-aura-accent" />
          ) : (
            <FiStar size={size} className="text-aura-light" />
          )}
        </button>
      ))}
    </div>
  )
}
