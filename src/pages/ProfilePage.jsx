import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiEdit2, FiCheck } from 'react-icons/fi'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.put('/api/auth/profile', { name })
      setMsg('Profile updated!'); setEditing(false)
      setTimeout(() => setMsg(''), 3000)
    } catch { setMsg('Update failed') }
    finally { setSaving(false) }
  }

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="bg-aura-bg3 py-16 px-6 text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-subtitle mb-3">Account</p>
          <h1 className="section-title">My Profile</h1>
          <div className="divider" />
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-aura-bg3 p-10">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-aura-light">
            <div className="w-20 h-20 rounded-full bg-aura-accent/20 flex items-center justify-center">
              <span className="font-display text-4xl text-aura-accent">{user?.name?.[0]?.toUpperCase()}</span>
            </div>
            <div>
              <h2 className="font-display text-3xl text-aura-dark font-light">{user?.name}</h2>
              <p className="font-body text-xs text-aura-muted tracking-wide mt-1">{user?.role === 'admin' ? '✦ Administrator' : 'Member'}</p>
            </div>
          </div>

          {msg && <div className="mb-6 font-body text-xs text-aura-accent tracking-wide">{msg}</div>}

          <div className="space-y-6">
            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Full Name</label>
              {editing ? (
                <input value={name} onChange={e => setName(e.target.value)} className="input-field" />
              ) : (
                <div className="flex items-center justify-between py-3 border-b border-aura-light">
                  <p className="font-body text-sm text-aura-dark">{user?.name}</p>
                  <button onClick={() => setEditing(true)} className="text-aura-muted hover:text-aura-accent transition-colors"><FiEdit2 size={14} /></button>
                </div>
              )}
            </div>

            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Email</label>
              <div className="flex items-center gap-3 py-3 border-b border-aura-light">
                <FiMail size={14} className="text-aura-muted" />
                <p className="font-body text-sm text-aura-dark">{user?.email}</p>
              </div>
            </div>

            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Role</label>
              <div className="py-3 border-b border-aura-light">
                <span className={`inline-block px-3 py-1 font-body text-[10px] tracking-widest uppercase ${user?.role === 'admin' ? 'bg-aura-accent/15 text-aura-accent' : 'bg-aura-bg text-aura-muted'}`}>
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            {editing && (
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                <FiCheck size={14} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
            {editing && <button onClick={() => setEditing(false)} className="btn-outline">Cancel</button>}
            {!editing && <button onClick={logout} className="btn-outline text-red-400 border-red-200 hover:bg-red-50 hover:border-red-300">Sign Out</button>}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
