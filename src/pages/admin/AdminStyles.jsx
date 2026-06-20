import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import axios from 'axios'

export default function AdminStyles() {
  const [styles, setStyles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState(null)

  useEffect(() => { fetchStyles() }, [])

  const fetchStyles = async () => {
    try {
      const { data } = await axios.get('/api/styles?limit=100')
      setStyles(data.styles || [])
    } catch {} finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this style?')) return
    setDeleting(id)
    try {
      await axios.delete(`/api/styles/${id}`)
      setStyles(prev => prev.filter(s => s._id !== id))
    } catch { alert('Delete failed') }
    finally { setDeleting(null) }
  }

  const filtered = styles.filter(s =>
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <p className="section-subtitle mb-2">Admin</p>
            <h1 className="section-title">Manage Styles</h1>
          </div>
          <Link to="/admin/styles/add" className="btn-accent flex items-center gap-2 self-start">
            <FiPlus size={14} /> Add New Style
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 border-b border-aura-light mb-8 max-w-sm">
          <FiSearch size={15} className="text-aura-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search styles..."
            className="flex-1 bg-transparent py-3 font-body text-sm text-aura-dark placeholder-aura-muted outline-none" />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-16 animate-pulse bg-aura-bg3" />)}
          </div>
        ) : (
          <div className="bg-aura-bg3 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-aura-light">
                  {['Style', 'Category', 'Fabric', 'Price', 'Rating', 'Reviews', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-4 font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((style, i) => (
                  <motion.tr key={style._id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-aura-light last:border-0 hover:bg-aura-bg2 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-11 bg-aura-bg overflow-hidden shrink-0">
                          {style.images?.[0] && <img src={style.images[0]} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <span className="font-body text-sm text-aura-dark">{style.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-body text-xs text-aura-muted">{style.category}</td>
                    <td className="px-5 py-3 font-body text-xs text-aura-muted">{style.fabric}</td>
                    <td className="px-5 py-3 font-display text-base text-aura-accent">PKR {style.price?.toLocaleString()}</td>
                    <td className="px-5 py-3 font-body text-xs text-aura-muted">{style.averageRating?.toFixed(1) || '—'}</td>
                    <td className="px-5 py-3 font-body text-xs text-aura-muted">{style.reviewCount || 0}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Link to={`/admin/styles/edit/${style._id}`} className="text-aura-muted hover:text-aura-accent transition-colors">
                          <FiEdit2 size={14} />
                        </Link>
                        <button onClick={() => handleDelete(style._id)} disabled={deleting === style._id}
                          className="text-aura-muted hover:text-red-400 transition-colors disabled:opacity-40">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-body text-sm text-aura-muted">No styles found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
