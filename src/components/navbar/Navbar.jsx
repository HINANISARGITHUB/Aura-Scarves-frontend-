import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/styles?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/styles", label: "Styles" },
    { to: "/styles?sort=trending", label: "Trending" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <nav
        // className={`fixed bg-[#F6F0E8] backdrop-blur-sm shadow-[0_2px_20px_rgba(59,47,42,0.08)] top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-aura-bg/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(59,47,42,0.08)]" : "bg-transparent"}`}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-sm shadow-[0_2px_20px_rgba(59,47,42,0.08)] ${
  scrolled 
    ? "bg-aura-bg/95" 
    : "bg-[#F6F0E8]"
}`}    >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-tight">
              <span className="font-display text-2xl md:text-3xl text-aura-dark tracking-[0.08em] font-light">
                Aura
              </span>

              <span className="font-body text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-aura-accent font-medium -mt-0.5">
                Scarves
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body text-xs tracking-[0.18em] uppercase transition-colors duration-200 ${location.pathname === link.to.split("?")[0] ? "text-aura-accent" : "text-aura-dark hover:text-aura-accent"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-aura-dark hover:text-aura-accent transition-colors"
              >
                <FiSearch size={18} />
              </button>

              {user && (
                <Link
                  to="/favorites"
                  className="text-aura-dark hover:text-aura-accent transition-colors hidden md:block"
                >
                  <FiHeart size={18} />
                </Link>
              )}

              <Link
                to="/cart"
                className="relative text-aura-dark hover:text-aura-accent transition-colors"
              >
                <FiShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-aura-accent text-aura-bg text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 text-aura-dark hover:text-aura-accent transition-colors"
                  >
                    <FiUser size={18} />
                    <FiChevronDown
                      size={12}
                      className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-3 w-48 bg-aura-bg border border-aura-light shadow-[0_8px_30px_rgba(59,47,42,0.12)]"
                      >
                        <div className="px-5 py-4 border-b border-aura-light">
                          <p className="font-body text-xs text-aura-muted uppercase tracking-widest">
                            Signed in as
                          </p>
                          <p className="font-body text-sm text-aura-dark font-medium mt-0.5 truncate">
                            {user.name}
                          </p>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="block px-5 py-2.5 font-body text-xs text-aura-dark hover:text-aura-accent hover:bg-aura-bg3 transition-colors tracking-wide"
                          >
                            Profile
                          </Link>
                          <Link
                            to="/favorites"
                            className="block px-5 py-2.5 font-body text-xs text-aura-dark hover:text-aura-accent hover:bg-aura-bg3 transition-colors tracking-wide"
                          >
                            Favorites
                          </Link>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="block px-5 py-2.5 font-body text-xs text-aura-accent hover:bg-aura-bg3 transition-colors tracking-wide font-medium"
                            >
                              Admin Panel
                            </Link>
                          )}
                          <button
                            onClick={logout}
                            className="block w-full text-left px-5 py-2.5 font-body text-xs text-aura-dark hover:text-aura-accent hover:bg-aura-bg3 transition-colors tracking-wide"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block font-body text-xs tracking-[0.18em] uppercase text-aura-dark hover:text-aura-accent transition-colors"
                >
                  Login
                </Link>
              )}

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-aura-dark"
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-aura-bg border-t border-aura-light overflow-hidden"
            >
              <div className="px-6 py-6 space-y-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block font-body text-sm tracking-[0.15em] uppercase text-aura-dark hover:text-aura-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-aura-light space-y-4">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block font-body text-sm tracking-[0.15em] uppercase text-aura-dark"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/favorites"
                        className="block font-body text-sm tracking-[0.15em] uppercase text-aura-dark"
                      >
                        Favorites
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block font-body text-sm tracking-[0.15em] uppercase text-aura-accent font-medium"
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="font-body text-sm tracking-[0.15em] uppercase text-aura-dark"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block font-body text-sm tracking-[0.15em] uppercase text-aura-dark"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block font-body text-sm tracking-[0.15em] uppercase text-aura-accent"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-aura-dark/50 backdrop-blur-sm flex items-start justify-center pt-32"
            onClick={(e) =>
              e.target === e.currentTarget && setSearchOpen(false)
            }
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-aura-bg w-full max-w-2xl mx-6 p-8"
            >
              <p className="section-subtitle text-center mb-6">Search Styles</p>
              <form onSubmit={handleSearch} className="flex gap-4">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hijab styles, fabrics, occasions..."
                  className="flex-1 input-field text-base"
                />
                <button type="submit" className="btn-primary">
                  Search
                </button>
              </form>
              <button
                onClick={() => setSearchOpen(false)}
                className="mt-6 block mx-auto font-body text-xs text-aura-muted hover:text-aura-dark tracking-widest uppercase"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
