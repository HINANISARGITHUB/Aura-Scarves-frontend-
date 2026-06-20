import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1529139574466-a303027614b8?w=100&q=60'

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', postal: '' })

  if (cartItems.length === 0 && !placed) { navigate('/cart'); return null }

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    await clearCart()
    setPlaced(true)
  }

  if (placed) return (
    <div className="pt-20 min-h-screen bg-aura-bg flex flex-col items-center justify-center px-6 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <div className="w-20 h-20 rounded-full bg-aura-accent/15 flex items-center justify-center mx-auto mb-8">
          <FiCheck size={36} className="text-aura-accent" />
        </div>
        <h2 className="font-display text-4xl text-aura-dark font-light mb-4">Order Placed!</h2>
        <p className="font-body text-sm text-aura-muted max-w-sm mx-auto mb-10 leading-relaxed">
          Thank you for your order. We'll contact you shortly to confirm delivery details.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/styles" className="btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn-outline">Back to Home</Link>
        </div>
      </motion.div>
    </div>
  )

  const Field = ({ name, label, type = 'text', required = true, half = false }) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">{label}</label>
      <input name={name} type={type} value={form[name]} onChange={handleChange} className="input-field w-full" required={required} />
    </div>
  )

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
        <div className="mb-10">
          <p className="section-subtitle mb-3">Almost There</p>
          <h1 className="section-title">Checkout</h1>
          <div className="divider ml-0" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display text-2xl text-aura-dark mb-6">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-5">
                <Field name="name" label="Full Name" />
                <Field name="email" label="Email" type="email" />
                <Field name="phone" label="Phone Number" type="tel" />
                <Field name="address" label="Street Address" />
                <Field name="city" label="City" half />
                <Field name="postal" label="Postal Code" half />
              </div>
            </div>

            <div className="pt-6 border-t border-aura-light">
              <h3 className="font-display text-2xl text-aura-dark mb-6">Payment</h3>
              <div className="bg-aura-bg3 p-6 text-center">
                <p className="font-body text-sm text-aura-muted tracking-wide mb-2">Cash on Delivery</p>
                <p className="font-body text-xs text-aura-muted">Pay when your order arrives at your doorstep</p>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary text-base py-4">
              Place Order — PKR {cartTotal.toLocaleString()}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-aura-bg3 p-6 h-fit">
            <h3 className="font-display text-xl text-aura-dark mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.style?._id} className="flex gap-3">
                  <img src={item.style?.images?.[0] || PLACEHOLDER} alt={item.style?.title}
                    className="w-16 h-20 object-cover shrink-0" />
                  <div>
                    <p className="font-body text-xs text-aura-dark font-medium leading-snug">{item.style?.title}</p>
                    <p className="font-body text-[10px] text-aura-muted mt-0.5">Qty: {item.quantity}</p>
                    <p className="font-display text-base text-aura-accent mt-1">
                      PKR {((item.style?.price || 0) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-aura-light pt-4 space-y-2">
              <div className="flex justify-between font-body text-xs text-aura-muted">
                <span>Subtotal</span><span>PKR {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body text-xs text-aura-muted">
                <span>Shipping</span><span>Free</span>
              </div>
              <div className="flex justify-between font-display text-xl text-aura-dark pt-2 border-t border-aura-light">
                <span>Total</span><span>PKR {cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
