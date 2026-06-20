import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import StarRating from '../StarRating'

export default function ReviewSection({ styleId, onReviewUpdate }) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [myReview, setMyReview] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editRating, setEditRating] = useState(5)
  const [editComment, setEditComment] = useState('')

  useEffect(() => { fetchReviews() }, [styleId])

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${styleId}`)
      setReviews(data.reviews || [])
      if (user) {
        const mine = data.reviews.find(r => r.user?._id === user._id)
        setMyReview(mine || null)
      }
    } catch {} finally { setLoading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setSubmitting(true)
    try {
      await axios.post(`/api/reviews/${styleId}`, { rating, comment })
      setShowForm(false); setComment(''); setRating(5)
      await fetchReviews()
      onReviewUpdate?.()
    } catch {} finally { setSubmitting(false) }
  }

  const handleEdit = async (reviewId) => {
    setSubmitting(true)
    try {
      await axios.put(`/api/reviews/${reviewId}`, { rating: editRating, comment: editComment })
      setEditingId(null)
      await fetchReviews()
      onReviewUpdate?.()
    } catch {} finally { setSubmitting(false) }
  }

  const handleDelete = async (reviewId) => {
    if (!confirm('Delete this review?')) return
    try {
      await axios.delete(`/api/reviews/${reviewId}`)
      await fetchReviews()
      onReviewUpdate?.()
    } catch {}
  }

  // Rating breakdown
  const breakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => Math.round(r.rating) === star).length,
    pct: reviews.length ? Math.round((reviews.filter(r => Math.round(r.rating) === star).length / reviews.length) * 100) : 0
  }))
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div>
      <p className="section-subtitle mb-3">Community Feedback</p>
      <h2 className="section-title mb-8">Reviews &amp; Ratings</h2>
      <div className="divider ml-0 mb-10" />

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="flex flex-col md:flex-row gap-10 mb-12 pb-12 border-b border-aura-light">
          <div className="text-center md:text-left">
            <p className="font-display text-7xl text-aura-dark font-light">{avg}</p>
            <StarRating rating={parseFloat(avg)} size={18} />
            <p className="font-body text-xs text-aura-muted mt-2">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {breakdown.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="font-body text-xs text-aura-muted w-4">{star}</span>
                <div className="flex-1 h-1.5 bg-aura-bg3 rounded-full overflow-hidden">
                  <div className="h-full bg-aura-accent rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <span className="font-body text-xs text-aura-muted w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add review */}
      {user && !myReview && (
        <div className="mb-10">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn-outline">Write a Review</button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-aura-bg3 p-8 max-w-xl"
            >
              <h3 className="font-display text-xl text-aura-dark mb-6">Share Your Experience</h3>
              <div className="mb-5">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted mb-3">Your Rating</p>
                <StarRating rating={rating} onChange={setRating} size={24} interactive />
              </div>
              <div className="mb-6">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted mb-3">Your Review</p>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={4}
                  placeholder="Tell others about this style..."
                  className="w-full bg-transparent border border-aura-light p-4 font-body text-sm text-aura-dark placeholder-aura-muted outline-none focus:border-aura-accent transition-colors resize-none"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              </div>
            </motion.form>
          )}
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2].map(i => <div key={i} className="animate-pulse h-28 bg-aura-bg3" />)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-2xl text-aura-muted mb-3">No reviews yet</p>
          <p className="font-body text-sm text-aura-muted">Be the first to share your experience</p>
        </div>
      ) : (
        <div className="space-y-8">
          {reviews.map(review => (
            <motion.div key={review._id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="pb-8 border-b border-aura-light last:border-0"
            >
              {editingId === review._id ? (
                <div className="bg-aura-bg3 p-6">
                  <div className="mb-4">
                    <StarRating rating={editRating} onChange={setEditRating} size={20} interactive />
                  </div>
                  <textarea value={editComment} onChange={e => setEditComment(e.target.value)}
                    rows={3} className="w-full bg-transparent border border-aura-light p-3 font-body text-sm outline-none focus:border-aura-accent resize-none mb-4" />
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(review._id)} disabled={submitting}
                      className="flex items-center gap-2 btn-primary text-xs disabled:opacity-60">
                      <FiCheck size={13} /> Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-2 btn-outline text-xs">
                      <FiX size={13} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-aura-accent/15 flex items-center justify-center">
                        <span className="font-display text-sm text-aura-accent">{review.user?.name?.[0]?.toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-aura-dark">{review.user?.name}</p>
                        <p className="font-body text-[10px] text-aura-muted">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    {user?._id === review.user?._id && (
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingId(review._id); setEditRating(review.rating); setEditComment(review.comment) }}
                          className="text-aura-muted hover:text-aura-accent transition-colors"><FiEdit2 size={14} /></button>
                        <button onClick={() => handleDelete(review._id)}
                          className="text-aura-muted hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                      </div>
                    )}
                  </div>
                  <StarRating rating={review.rating} size={13} />
                  <p className="font-body text-sm text-aura-dark mt-3 leading-relaxed">{review.comment}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
