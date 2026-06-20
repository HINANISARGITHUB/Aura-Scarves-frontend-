import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiArrowLeft, FiUser, FiShield } from 'react-icons/fi'
import axios from 'axios'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users')
      setUsers(data.users || [])
    } catch {} finally { setLoading(false) }
  }

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <Link to="/admin" className="flex items-center gap-2 text-aura-muted hover:text-aura-dark transition-colors font-body text-xs tracking-wide mb-8">
          <FiArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="mb-10">
          <p className="section-subtitle mb-2">Admin</p>
          <h1 className="section-title">Users</h1>
          <div className="divider ml-0" />
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 border-b border-aura-light mb-8 max-w-sm">
          <FiSearch size={15} className="text-aura-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="flex-1 bg-transparent py-3 font-body text-sm text-aura-dark placeholder-aura-muted outline-none" />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <div key={i} className="h-14 animate-pulse bg-aura-bg3" />)}
          </div>
        ) : (
          <div className="bg-aura-bg3 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-aura-light">
                  {['User', 'Email', 'Role', 'Joined', 'Favorites'].map(h => (
                    <th key={h} className="text-left px-5 py-4 font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <motion.tr key={user._id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-aura-light last:border-0 hover:bg-aura-bg2 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-aura-accent/15 flex items-center justify-center shrink-0">
                          <span className="font-display text-sm text-aura-accent">{user.name?.[0]?.toUpperCase()}</span>
                        </div>
                        <span className="font-body text-sm text-aura-dark">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-body text-xs text-aura-muted">{user.email}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-body text-[10px] tracking-widest uppercase ${user.role === 'admin' ? 'bg-aura-accent/15 text-aura-accent' : 'bg-aura-bg text-aura-muted'}`}>
                        {user.role === 'admin' ? <FiShield size={10} /> : <FiUser size={10} />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-body text-xs text-aura-muted">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-3 font-body text-xs text-aura-muted">
                      {user.favorites?.length || 0}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-body text-sm text-aura-muted">No users found</p>
              </div>
            )}
          </div>
        )}

        <p className="font-body text-xs text-aura-muted mt-6 tracking-wide">
          Total: {filtered.length} user{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
