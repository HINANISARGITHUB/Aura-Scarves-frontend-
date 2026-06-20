import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPackage, FiUsers, FiStar, FiShoppingBag, FiPlus, FiEdit2 } from 'react-icons/fi'
import axios from 'axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentStyles, setRecentStyles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [])

  const fetchStats = async () => {
    try {
      const [statsRes, stylesRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/styles?limit=5&sort=newest'),
      ])
      setStats(statsRes.data)
      setRecentStyles(stylesRes.data.styles || [])
    } catch {} finally { setLoading(false) }
  }

  const STAT_CARDS = [
    { label: 'Total Styles', value: stats?.totalStyles || 0, icon: FiPackage, color: 'text-aura-accent' },
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: FiUsers, color: 'text-blue-400' },
    { label: 'Total Reviews', value: stats?.totalReviews || 0, icon: FiStar, color: 'text-yellow-500' },
    { label: 'Avg Rating', value: stats?.avgRating ? stats.avgRating.toFixed(1) : '—', icon: FiStar, color: 'text-aura-accent' },
  ]

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="section-subtitle mb-2">Admin Panel</p>
            <h1 className="section-title">Dashboard</h1>
          </div>
          <Link to="/admin/styles/add" className="btn-accent flex items-center gap-2">
            <FiPlus size={14} /> Add Style
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {STAT_CARDS.map((card, i) => (
            <motion.div key={card.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-aura-bg3 p-6 card-shadow"
            >
              <card.icon size={20} className={card.color + ' mb-3'} />
              <p className="font-display text-4xl text-aura-dark font-light mb-1">{loading ? '—' : card.value}</p>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Nav */}
        <div className="grid md:grid-cols-4 gap-5 mb-12">
          {[
            { to: '/admin/styles', icon: FiPackage, label: 'Manage Styles', desc: 'Add, edit, delete hijab styles' },
            { to: '/admin/styles/add', icon: FiPlus, label: 'Add New Style', desc: 'Upload a new hijab style' },
            { to: '/admin/users', icon: FiUsers, label: 'Manage Users', desc: 'View all registered users' },
            { to: '/styles', icon: FiShoppingBag, label: 'View Store', desc: 'See the public storefront' },
          ].map((item, i) => (
            <motion.div key={item.to}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            >
              <Link to={item.to} className="block bg-aura-bg3 p-6 card-shadow hover:bg-aura-bg2 transition-colors group">
                <item.icon size={20} className="text-aura-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl text-aura-dark mb-1">{item.label}</h3>
                <p className="font-body text-xs text-aura-muted tracking-wide">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Styles */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-aura-dark">Recent Styles</h2>
            <Link to="/admin/styles" className="font-body text-xs text-aura-accent hover:underline tracking-wide">View all</Link>
          </div>
          <div className="bg-aura-bg3 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-aura-light">
                  <th className="text-left px-6 py-4 font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted">Style</th>
                  <th className="text-left px-6 py-4 font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted hidden md:table-cell">Category</th>
                  <th className="text-left px-6 py-4 font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted hidden md:table-cell">Price</th>
                  <th className="text-left px-6 py-4 font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted">Rating</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {recentStyles.map(style => (
                  <tr key={style._id} className="border-b border-aura-light last:border-0 hover:bg-aura-bg2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-aura-bg overflow-hidden shrink-0">
                          {style.images?.[0] && <img src={style.images[0]} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <p className="font-body text-sm text-aura-dark">{style.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-xs text-aura-muted hidden md:table-cell">{style.category}</td>
                    <td className="px-6 py-4 font-display text-base text-aura-accent hidden md:table-cell">PKR {style.price?.toLocaleString()}</td>
                    <td className="px-6 py-4 font-body text-xs text-aura-muted">{style.averageRating?.toFixed(1) || '—'} ★</td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/styles/edit/${style._id}`} className="text-aura-muted hover:text-aura-accent transition-colors">
                        <FiEdit2 size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
