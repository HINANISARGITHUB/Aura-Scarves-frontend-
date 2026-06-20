import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-aura-bg flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-display text-[120px] md:text-[180px] text-aura-bg3 font-light leading-none select-none">
          404
        </p>
        <div className="-mt-8">
          <p className="section-subtitle mb-4">Page Not Found</p>
          <h1 className="font-display text-3xl md:text-4xl text-aura-dark font-light mb-4">
            This page has wandered off
          </h1>
          <div className="divider" />
          <p className="font-body text-sm text-aura-muted tracking-wide mb-10 max-w-sm mx-auto">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/styles" className="btn-outline">Browse Styles</Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
