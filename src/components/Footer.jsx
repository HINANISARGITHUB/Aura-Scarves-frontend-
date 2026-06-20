import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="bg-aura-darker text-aura-bg/80">
      {/* Newsletter */}
      <div className="border-b border-aura-bg/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-subtitle text-aura-accent mb-4">Stay Inspired</p>
          <h2 className="font-display text-3xl md:text-4xl text-aura-bg font-light mb-6">
            Join the Aura Community
          </h2>
          <p className="font-body text-sm text-aura-bg/60 mb-10 tracking-wide">
            Discover new styles, exclusive collections, and modest fashion inspiration.
          </p>
          {subscribed ? (
            <p className="font-body text-sm text-aura-accent tracking-wider">Thank you for subscribing ✦</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b border-aura-bg/30 py-3 text-aura-bg placeholder-aura-bg/40 font-body text-sm outline-none focus:border-aura-accent transition-colors"
                required
              />
              <button type="submit" className="bg-aura-accent text-aura-bg px-8 py-3 font-body text-xs tracking-widest uppercase hover:bg-aura-accent2 transition-colors">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-6">
            <span className="font-display text-2xl text-aura-bg tracking-[0.08em] font-light">Aura</span>
            <span className="font-body text-[9px] tracking-[0.35em] uppercase text-aura-accent font-medium block -mt-0.5">Scarves</span>
          </div>
          <p className="font-body text-xs text-aura-bg/50 leading-relaxed tracking-wide mb-8">
            Timeless elegance in every fold. Celebrating modest fashion through luxury minimalism.
          </p>
          <div className="flex gap-4">
            {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
              <a key={i} href="#" className="text-aura-bg/50 hover:text-aura-accent transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-accent mb-6">Shop</p>
          <ul className="space-y-3">
            {['All Styles', 'Casual', 'Formal', 'Occasion', 'Trending'].map(item => (
              <li key={item}><Link to={`/styles?category=${item.toLowerCase()}`} className="font-body text-xs text-aura-bg/60 hover:text-aura-accent transition-colors tracking-wide">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-accent mb-6">Account</p>
          <ul className="space-y-3">
            {['My Profile', 'Favorites', 'Cart', 'Orders'].map(item => (
              <li key={item}><Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="font-body text-xs text-aura-bg/60 hover:text-aura-accent transition-colors tracking-wide">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-accent mb-6">Help</p>
          <ul className="space-y-3">
            {['About Us', 'Contact', 'FAQ', 'Shipping', 'Returns'].map(item => (
              <li key={item}><a href="#" className="font-body text-xs text-aura-bg/60 hover:text-aura-accent transition-colors tracking-wide">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-aura-bg/10 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-[10px] text-aura-bg/40 tracking-widest uppercase">© 2024 Aura Scarves. All rights reserved.</p>
          <p className="font-body text-[10px] text-aura-bg/40 tracking-widest uppercase">Luxury Modest Fashion ✦ Timeless Elegance</p>
        </div>
      </div>
    </footer>
  )
}
