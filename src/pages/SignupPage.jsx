import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { sign_up } from '../images'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setError(''); setLoading(true)
    try {
      await signup(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create account. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-aura-bg flex">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img src={sign_up} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0  flex flex-col items-center justify-center">
          <p className="font-display text-5xl text-aura-bg font-light tracking-wide italic mb-4">
            "Style is a way<br />to say who you are."
          </p>
          {/* <p className="font-body text-sm text-aura-bg/60 tracking-widest uppercase">— Rachel Zoe</p> */}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-8">
              <span className="font-display text-3xl text-aura-dark tracking-[0.08em] font-light">Aura</span>
              <span className="font-body text-[9px] tracking-[0.35em] uppercase text-aura-accent font-medium block -mt-0.5">Scarves</span>
            </Link>
            <h1 className="font-display text-3xl text-aura-dark font-light mb-2">Join Aura</h1>
            <p className="font-body text-sm text-aura-muted tracking-wide">Create your account</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 font-body text-xs mb-8">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="input-field" required />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="input-field" required />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters" className="input-field pr-10" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-0 top-1/2 -translate-y-1/2 text-aura-muted">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" className="input-field" required />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-aura-bg border-t-transparent rounded-full animate-spin" /> : null}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center font-body text-sm text-aura-muted mt-10 tracking-wide">
            Already have an account?{' '}
            <Link to="/login" className="text-aura-accent hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
