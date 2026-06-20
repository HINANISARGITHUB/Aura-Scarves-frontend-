import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {about,about_1,about_2,about_3, about_4, value_1, value_2, value_3, value_4} from '../images'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
}

const VALUES = [
  { 
    title: 'Timeless Quality', 
    desc: 'Every fabric is hand-selected for its drape, durability, and luxurious feel.',
    image: value_2
  },
  { 
    title: 'Modest Elegance', 
    desc: 'Celebrating the beauty of modesty through refined, thoughtful design.',
    image: value_3
  },
  { 
    title: 'Inclusive Fashion', 
    desc: 'Styles for every woman, every occasion, every chapter of life.',
    image: value_1
  },
  { 
    title: 'Crafted with Care', 
    desc: 'Each piece reflects our dedication to artisanal craftsmanship.',
    image: value_4
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20 bg-aura-bg overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${about})` }} />
        <div className="absolute inset-0 " />
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
          className="relative z-10 text-center px-6"
        >
          <p className="section-subtitle text-aura-accent mb-5">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl text-aura-bg font-light tracking-wide leading-tight mb-6">
            Born from a Love<br /><em>of Modest Beauty</em>
          </h1>
          <div className="w-12 h-px bg-aura-accent mx-auto" />
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-24 bg-aura-bg">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={about_3}
                alt="Aura Scarves" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="section-subtitle mb-4">Who We Are</p>
            <h2 className="section-title mb-6">The Aura Philosophy</h2>
            <div className="divider ml-0 mb-8" />
            <p className="font-body text-sm text-aura-muted leading-relaxed tracking-wide mb-5">
              Aura Scarves was founded on the belief that modest fashion is not a limitation — it is an art form. 
              Every fold, every drape, every fabric choice is an expression of identity, grace, and quiet confidence.
            </p>
            <p className="font-body text-sm text-aura-muted leading-relaxed tracking-wide mb-5">
              We curate hijab styles that bridge the gap between heritage and contemporary minimalism — inspired by 
              the luxury fashion world, designed for the modern Muslim woman.
            </p>
            <p className="font-body text-sm text-aura-muted leading-relaxed tracking-wide">
              From casual daily looks to elaborate bridal arrangements, Aura is your destination for styles 
              that feel as beautiful as they look.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-aura-bg3">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle mb-3">What Drives Us</p>
            <h2 className="section-title">Our Values</h2>
            <div className="divider" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                {/* Square Image */}
                <div className="aspect-square overflow-hidden mb-5 cursor-pointer">
                  <img 
                    src={val.image} 
                    alt={val.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Line */}
                <div className="w-px h-8 bg-aura-accent mx-auto mb-4" />
                <h3 className="font-display text-xl text-aura-dark mb-3">{val.title}</h3>
                <p className="font-body text-xs text-aura-muted leading-relaxed tracking-wide">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team image */}
      <section className="py-24 bg-aura-bg">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <p className="section-subtitle mb-4">Our Craft</p>
            <h2 className="section-title mb-6">Handpicked.<br />Thoughtfully Styled.</h2>
            <div className="divider ml-0 mb-8" />
            <p className="font-body text-sm text-aura-muted leading-relaxed tracking-wide mb-5">
              Each hijab style in our collection is personally reviewed for fabric quality, color consistency, 
              and styling versatility. We work with artisans who share our passion for precision and elegance.
            </p>
            <p className="font-body text-sm text-aura-muted leading-relaxed tracking-wide mb-10">
              Our team of modest fashion enthusiasts tests every style — from morning commutes to evening galas — 
              to ensure it lives up to the Aura standard.
            </p>
            <Link to="/styles" className="btn-primary">Explore the Collection</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="aspect-[3/4] overflow-hidden mt-8">
              <img src={about_4}
                alt="" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img src={about_2}
                alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-aura-darker text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle text-aura-accent mb-5">Join the Community</p>
          <h2 className="font-display text-4xl md:text-5xl text-aura-bg font-light tracking-wide mb-8">
            Discover Your Aura
          </h2>
          <p className="font-body text-sm text-aura-bg/60 mb-10 tracking-wide max-w-sm mx-auto">
            Browse our full collection and find styles that speak to your soul.
          </p>
          <Link to="/styles" className="btn-accent">Shop Now</Link>
        </motion.div>
      </section>

    </div>
  )
}
