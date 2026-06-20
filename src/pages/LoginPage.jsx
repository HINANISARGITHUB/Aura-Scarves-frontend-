import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { login_image } from '../images'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-aura-bg flex">
      {/* Left - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={login_image}
          alt="Aura Scarves"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  flex flex-col items-center justify-center">
          <p className="font-display text-5xl text-aura-bg font-light tracking-wide italic mb-4">
            "Elegance is not<br />about being noticed."
          </p>
          {/* <p className="font-body text-sm text-aura-bg/60 tracking-widest uppercase">— Giorgio Armani</p> */}
        </div>
      </div>

      {/* Right - Form */}
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
            <h1 className="font-display text-3xl text-aura-dark font-light mb-2">Welcome Back</h1>
            <p className="font-body text-sm text-aura-muted tracking-wide">Sign in to your account</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 font-body text-xs mb-8 tracking-wide">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" className="input-field" required />
            </div>
            <div>
              <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className="input-field pr-10" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-aura-muted hover:text-aura-dark">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-aura-bg border-t-transparent rounded-full animate-spin" /> : null}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center font-body text-sm text-aura-muted mt-10 tracking-wide">
            Don't have an account?{' '}
            <Link to="/signup" className="text-aura-accent hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
