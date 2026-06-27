import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import StyleCard from "../components/cards/StyleCard";
import StarRating from "../components/StarRating";
import { mainbg, bri_1, party, casu_1, casu_2, occa_2,form_1, main_2 } from '../images'


const HERO_BG = mainbg;

const CATEGORIES = [
  {
    name: "Bridal",
    image:bri_1,
    desc: "Timeless bridal beauty",
  },
  {
    name: "Casual",
    image:casu_1,
    desc: "Effortless everyday elegance",
  },
  {
    name: "Formal",
    image:
      form_1,
    desc: "Polished and refined looks",
  },
  {
    name: "Occasion",
    image:occa_2,
    desc: "For your most precious moments",
  },
  {
    name: "Party",
    image:party,
    desc: "Perfect for party wear",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trendRes, ratedRes, reviewRes] = await Promise.all([
        axios.get("/api/styles?sort=trending&limit=4"),
        axios.get("/api/styles?sort=rating&limit=4"),
        axios.get("/api/reviews/recent?limit=3"),
      ]);
      setTrending(trendRes.data.styles || []);
      setTopRated(ratedRes.data.styles || []);
      setRecentReviews(reviewRes.data.reviews || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Image remains full screen, Text stays left-aligned inside container */}
      <section className="relative min-h-screen flex items-center mt-16 w-full">
        {/* Background Image (Full screen layout) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0" />
        
        {/* Content Container (Puts left margin/padding safely on text) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 text-left">
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-[#f0977e] mb-6"
            >
              Luxury Modest Fashion
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-aura-bg font-light leading-tight mb-8 tracking-wide"
            >
              Timeless Elegance
              <br />
              <em>in Every Fold</em>
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="font-body text-sm text-aura-bg/70 leading-relaxed tracking-wider mb-12 max-w-md"
            >
              Discover a curated collection of hijab styles that celebrate grace,
              identity, and modern femininity.
            </motion.p>
            
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <Link to="/styles" className="btn-accent">
                Explore Collection
              </Link>
              <Link
                to="/styles?sort=trending"
                className="btn-outline border-aura-bg/50 text-aura-bg hover:bg-aura-bg hover:text-aura-dark"
              >
                Trending Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-aura-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="section-subtitle mb-3">Browse by Style</p>
            <h2 className="section-title">Featured Categories</h2>
            <div className="divider" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  to={`/styles?category=${cat.name.toLowerCase()}`}
                  className="group block"
                >
                  <div className="img-hover-zoom relative aspect-[3/4] bg-aura-bg3 overflow-hidden mb-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-aura-darker/20 group-hover:bg-aura-darker/10 transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-xl text-aura-dark group-hover:text-aura-accent transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-body text-xs text-aura-muted mt-1 tracking-wide">
                    {cat.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-24 bg-aura-bg2">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle mb-3">What Everyone Loves</p>
              <h2 className="section-title">Trending Styles</h2>
              <div className="divider ml-0" />
            </motion.div>
            <Link
              to="/styles?sort=trending"
              className="hidden md:block btn-outline text-sm"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : trending.map((style, i) => (
                  <StyleCard key={style._id} style={style} index={i} />
                ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-24 bg-aura-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-subtitle mb-3">Highest Rated</p>
              <h2 className="section-title">Most Loved Styles</h2>
              <div className="divider ml-0" />
            </motion.div>
            <Link
              to="/styles?sort=rating"
              className="hidden md:block btn-outline text-sm"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : topRated.map((style, i) => (
                  <StyleCard key={style._id} style={style} index={i} />
                ))}
          </div>
        </div>
      </section>

      {/* Inspiration Banner */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${main_2})`,
          }}
        />
        <div className="absolute inset-0 bg-aura-darker/65" />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="section-subtitle text-aura-accent mb-6">
              Limited Collection
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-aura-bg font-light mb-8 tracking-wide leading-tight">
              Drape Yourself in
              <br />
              <em>Quiet Luxury</em>
            </h2>
            <p className="font-body text-sm text-aura-bg/60 mb-12 tracking-wider max-w-md mx-auto">
              Our newest arrivals combine heritage craftsmanship with modern
              minimalist sensibilities.
            </p>
            <Link to="/styles" className="btn-accent">
              Shop New Arrivals
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      {recentReviews.length > 0 && (
        <section className="py-24 bg-aura-bg3">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <p className="section-subtitle mb-3">What Our Community Says</p>
              <h2 className="section-title">Latest Reviews</h2>
              <div className="divider" />
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentReviews.map((review, i) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-aura-bg p-8 card-shadow"
                >
                  <StarRating rating={review.rating} size={14} />
                  <p className="font-display text-lg text-aura-dark italic mt-4 mb-6 leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-aura-light">
                    <div className="w-8 h-8 rounded-full bg-aura-accent/20 flex items-center justify-center">
                      <span className="font-display text-sm text-aura-accent">
                        {review.user?.name?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-body text-xs font-medium text-aura-dark">
                        {review.user?.name}
                      </p>
                      <p className="font-body text-[10px] text-aura-muted">
                        {review.style?.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-aura-bg3 mb-4" />
      <div className="h-5 bg-aura-bg3 w-3/4 mb-2" />
      <div className="h-4 bg-aura-bg3 w-1/2" />
    </div>
  );
}

