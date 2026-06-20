// import { useState, useEffect, useCallback } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiSearch, FiFilter, FiX, FiChevronDown } from 'react-icons/fi'
// import axios from 'axios'
// import StyleCard from '../components/cards/StyleCard'
// import useDebounce from '../hooks/useDebounce'

// const CATEGORIES = ['All', 'Casual', 'Formal', 'Occasion', 'Bridal', 'Sports', 'Travel']
// const OCCASIONS = ['All', 'Daily', 'Wedding', 'Office', 'Party', 'Beach', 'Religious']
// const FABRICS = ['All', 'Chiffon', 'Jersey', 'Silk', 'Cotton', 'Satin', 'Voile', 'Crepe']
// const SORT_OPTIONS = [
//   { value: 'newest', label: 'Newest First' },
//   { value: 'trending', label: 'Trending' },
//   { value: 'rating', label: 'Top Rated' },
//   { value: 'price_asc', label: 'Price: Low to High' },
//   { value: 'price_desc', label: 'Price: High to Low' },
// ]

// export default function StylesPage() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [styles, setStyles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [total, setTotal] = useState(0)
//   const [page, setPage] = useState(1)
//   const [showFilters, setShowFilters] = useState(false)

//   const [search, setSearch] = useState(searchParams.get('search') || '')
//   const [category, setCategory] = useState(searchParams.get('category') || 'All')
//   const [occasion, setOccasion] = useState('All')
//   const [fabric, setFabric] = useState('All')
//   const [minRating, setMinRating] = useState(0)
//   const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

//   const LIMIT = 12

//   const debouncedSearch = useDebounce(search, 450)

//   const fetchStyles = useCallback(async () => {
//     setLoading(true)
//     try {
//       const params = new URLSearchParams()
//       if (debouncedSearch) params.set('search', debouncedSearch)
//       if (category !== 'All') params.set('category', category)
//       if (occasion !== 'All') params.set('occasion', occasion)
//       if (fabric !== 'All') params.set('fabric', fabric)
//       if (minRating > 0) params.set('minRating', minRating)
//       params.set('sort', sort)
//       params.set('page', page)
//       params.set('limit', LIMIT)

//       const { data } = await axios.get(`/api/styles?${params}`)
//       setStyles(data.styles || [])
//       setTotal(data.total || 0)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }, [debouncedSearch, category, occasion, fabric, minRating, sort, page])

//   useEffect(() => { fetchStyles() }, [fetchStyles])

//   const handleSearch = (e) => {
//     e.preventDefault()
//     setPage(1)
//     fetchStyles()
//   }

//   const clearFilters = () => {
//     setSearch(''); setCategory('All'); setOccasion('All')
//     setFabric('All'); setMinRating(0); setSort('newest'); setPage(1)
//   }

//   const totalPages = Math.ceil(total / LIMIT)
//   const hasActiveFilters = category !== 'All' || occasion !== 'All' || fabric !== 'All' || minRating > 0

//   return (
//     <div className="pt-20 min-h-screen bg-aura-bg">
//       {/* Header */}
//       <div className="bg-aura-bg3 py-16 px-6 text-center">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//           <p className="section-subtitle mb-3">Curated Collection</p>
//           <h1 className="section-title">All Styles</h1>
//           <div className="divider" />
//           <p className="font-body text-sm text-aura-muted mt-4 tracking-wide">{total} styles discovered</p>
//         </motion.div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
//         {/* Search + Controls */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <form onSubmit={handleSearch} className="flex-1 flex items-center border-b border-aura-light gap-3">
//             <FiSearch size={16} className="text-aura-muted shrink-0" />
//             <input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search styles, fabrics, occasions..."
//               className="flex-1 bg-transparent py-3 font-body text-sm text-aura-dark placeholder-aura-muted outline-none"
//             />
//             {search && <button type="button" onClick={() => setSearch('')}><FiX size={14} className="text-aura-muted" /></button>}
//           </form>

//           <div className="flex gap-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`flex items-center gap-2 px-5 py-2.5 border font-body text-xs tracking-widest uppercase transition-colors ${showFilters || hasActiveFilters ? 'bg-aura-dark text-aura-bg border-aura-dark' : 'border-aura-light text-aura-dark hover:border-aura-dark'}`}
//             >
//               <FiFilter size={13} />
//               Filter {hasActiveFilters && '•'}
//             </button>

//             <div className="relative">
//               <select
//                 value={sort}
//                 onChange={e => { setSort(e.target.value); setPage(1) }}
//                 className="appearance-none pl-4 pr-8 py-2.5 border border-aura-light bg-transparent font-body text-xs text-aura-dark tracking-wide outline-none cursor-pointer hover:border-aura-dark transition-colors"
//               >
//                 {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//               </select>
//               <FiChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-aura-muted pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Filters Panel */}
//         <AnimatePresence>
//           {showFilters && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="bg-aura-bg3 p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <FilterSelect label="Category" value={category} options={CATEGORIES} onChange={v => { setCategory(v); setPage(1) }} />
//                 <FilterSelect label="Occasion" value={occasion} options={OCCASIONS} onChange={v => { setOccasion(v); setPage(1) }} />
//                 <FilterSelect label="Fabric" value={fabric} options={FABRICS} onChange={v => { setFabric(v); setPage(1) }} />
//                 <div>
//                   <p className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted mb-3">Min Rating</p>
//                   <div className="flex gap-2">
//                     {[0, 3, 4, 4.5].map(r => (
//                       <button key={r} onClick={() => { setMinRating(r); setPage(1) }}
//                         className={`px-3 py-1.5 font-body text-xs border transition-colors ${minRating === r ? 'bg-aura-dark text-aura-bg border-aura-dark' : 'border-aura-light text-aura-dark hover:border-aura-dark'}`}>
//                         {r === 0 ? 'All' : `${r}+★`}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 {hasActiveFilters && (
//                   <div className="col-span-2 md:col-span-4 flex justify-end">
//                     <button onClick={clearFilters} className="font-body text-xs text-aura-accent hover:underline tracking-wide">Clear all filters</button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Grid */}
//         {loading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {Array(8).fill(0).map((_, i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="aspect-[3/4] bg-aura-bg3 mb-4" />
//                 <div className="h-5 bg-aura-bg3 w-3/4 mb-2" />
//                 <div className="h-4 bg-aura-bg3 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : styles.length === 0 ? (
//           <div className="text-center py-24">
//             <p className="font-display text-3xl text-aura-muted mb-4">No styles found</p>
//             <p className="font-body text-sm text-aura-muted mb-8">Try adjusting your search or filters</p>
//             <button onClick={clearFilters} className="btn-outline">Clear Filters</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {styles.map((style, i) => <StyleCard key={style._id} style={style} index={i} />)}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2 mt-14">
//             <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
//               className="px-4 py-2 border border-aura-light font-body text-xs text-aura-dark disabled:opacity-40 hover:border-aura-dark transition-colors">
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//               <button key={p} onClick={() => setPage(p)}
//                 className={`w-9 h-9 font-body text-xs border transition-colors ${p === page ? 'bg-aura-dark text-aura-bg border-aura-dark' : 'border-aura-light text-aura-dark hover:border-aura-dark'}`}>
//                 {p}
//               </button>
//             ))}
//             <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
//               className="px-4 py-2 border border-aura-light font-body text-xs text-aura-dark disabled:opacity-40 hover:border-aura-dark transition-colors">
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// function FilterSelect({ label, value, options, onChange }) {
//   return (
//     <div>
//       <p className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted mb-3">{label}</p>
//       <div className="relative">
//         <select value={value} onChange={e => onChange(e.target.value)}
//           className="w-full appearance-none pl-3 pr-8 py-2.5 border border-aura-light bg-aura-bg font-body text-xs text-aura-dark outline-none cursor-pointer hover:border-aura-dark transition-colors">
//           {options.map(o => <option key={o} value={o}>{o}</option>)}
//         </select>
//         <FiChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-aura-muted pointer-events-none" />
//       </div>
//     </div>
//   )
// }


////////////////////

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter, FiX, FiChevronDown } from 'react-icons/fi'
import axios from 'axios'
import StyleCard from '../components/cards/StyleCard'
import useDebounce from '../hooks/useDebounce'

const CATEGORIES = ['All', 'Casual', 'Formal', 'Occasion', 'Bridal', 'Sports', 'Travel']
const OCCASIONS = ['All', 'Daily', 'Wedding', 'Office', 'Party', 'Beach', 'Religious']
const FABRICS = ['All', 'Chiffon', 'Jersey', 'Silk', 'Cotton', 'Satin', 'Voile', 'Crepe']
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'trending', label: 'Trending' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export default function StylesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [styles, setStyles] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [occasion, setOccasion] = useState('All')
  const [fabric, setFabric] = useState('All')
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

  const LIMIT = 12

  const debouncedSearch = useDebounce(search, 450)

  // ✅ FIX: Navbar se URL change hone par (Trending click) state ko sync karo
  useEffect(() => {
    const urlSort = searchParams.get('sort') || 'newest'
    const urlCategory = searchParams.get('category') || 'All'
    const urlSearch = searchParams.get('search') || ''

    setSort(urlSort)
    setCategory(urlCategory)
    setSearch(urlSearch)
    setPage(1)
  }, [searchParams])

  const fetchStyles = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (debouncedSearch) params.set('search', debouncedSearch)
      if (category !== 'All') params.set('category', category)
      if (occasion !== 'All') params.set('occasion', occasion)
      if (fabric !== 'All') params.set('fabric', fabric)
      if (minRating > 0) params.set('minRating', minRating)
      params.set('sort', sort)
      params.set('page', page)
      params.set('limit', LIMIT)

      const { data } = await axios.get(`/api/styles?${params}`)
      setStyles(data.styles || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, category, occasion, fabric, minRating, sort, page])

  useEffect(() => { fetchStyles() }, [fetchStyles])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchStyles()
  }

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setOccasion('All')
    setFabric('All'); setMinRating(0); setSort('newest'); setPage(1)
  }

  const totalPages = Math.ceil(total / LIMIT)
  const hasActiveFilters = category !== 'All' || occasion !== 'All' || fabric !== 'All' || minRating > 0

  // Dynamic heading based on current sort/category
  const getPageTitle = () => {
    if (sort === 'trending') return 'Trending Styles'
    if (sort === 'rating') return 'Most Loved Styles'
    if (category !== 'All') return `${category} Styles`
    return 'All Styles'
  }

  const getPageSubtitle = () => {
    if (sort === 'trending') return 'What Everyone Loves Right Now'
    if (sort === 'rating') return 'Highest Rated by Our Community'
    if (category !== 'All') return 'Curated Just for You'
    return 'Curated Collection'
  }

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      {/* Header */}
      <div className="bg-aura-bg3 py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-subtitle mb-3">{getPageSubtitle()}</p>
          <h1 className="section-title">{getPageTitle()}</h1>
          <div className="divider" />
          <p className="font-body text-sm text-aura-muted mt-4 tracking-wide">{total} styles discovered</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Search + Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex items-center border-b border-aura-light gap-3">
            <FiSearch size={16} className="text-aura-muted shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search styles, fabrics, occasions..."
              className="flex-1 bg-transparent py-3 font-body text-sm text-aura-dark placeholder-aura-muted outline-none"
            />
            {search && <button type="button" onClick={() => setSearch('')}><FiX size={14} className="text-aura-muted" /></button>}
          </form>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-2.5 border font-body text-xs tracking-widest uppercase transition-colors ${showFilters || hasActiveFilters ? 'bg-aura-dark text-aura-bg border-aura-dark' : 'border-aura-light text-aura-dark hover:border-aura-dark'}`}
            >
              <FiFilter size={13} />
              Filter {hasActiveFilters && '•'}
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1) }}
                className="appearance-none pl-4 pr-8 py-2.5 border border-aura-light bg-transparent font-body text-xs text-aura-dark tracking-wide outline-none cursor-pointer hover:border-aura-dark transition-colors"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <FiChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-aura-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-aura-bg3 p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <FilterSelect label="Category" value={category} options={CATEGORIES} onChange={v => { setCategory(v); setPage(1) }} />
                <FilterSelect label="Occasion" value={occasion} options={OCCASIONS} onChange={v => { setOccasion(v); setPage(1) }} />
                <FilterSelect label="Fabric" value={fabric} options={FABRICS} onChange={v => { setFabric(v); setPage(1) }} />
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted mb-3">Min Rating</p>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map(r => (
                      <button key={r} onClick={() => { setMinRating(r); setPage(1) }}
                        className={`px-3 py-1.5 font-body text-xs border transition-colors ${minRating === r ? 'bg-aura-dark text-aura-bg border-aura-dark' : 'border-aura-light text-aura-dark hover:border-aura-dark'}`}>
                        {r === 0 ? 'All' : `${r}+★`}
                      </button>
                    ))}
                  </div>
                </div>
                {hasActiveFilters && (
                  <div className="col-span-2 md:col-span-4 flex justify-end">
                    <button onClick={clearFilters} className="font-body text-xs text-aura-accent hover:underline tracking-wide">Clear all filters</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-aura-bg3 mb-4" />
                <div className="h-5 bg-aura-bg3 w-3/4 mb-2" />
                <div className="h-4 bg-aura-bg3 w-1/2" />
              </div>
            ))}
          </div>
        ) : styles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-aura-muted mb-4">No styles found</p>
            <p className="font-body text-sm text-aura-muted mb-8">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-outline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {styles.map((style, i) => <StyleCard key={style._id} style={style} index={i} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 border border-aura-light font-body text-xs text-aura-dark disabled:opacity-40 hover:border-aura-dark transition-colors">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-9 h-9 font-body text-xs border transition-colors ${p === page ? 'bg-aura-dark text-aura-bg border-aura-dark' : 'border-aura-light text-aura-dark hover:border-aura-dark'}`}>
                {p}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 border border-aura-light font-body text-xs text-aura-dark disabled:opacity-40 hover:border-aura-dark transition-colors">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div>
      <p className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted mb-3">{label}</p>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full appearance-none pl-3 pr-8 py-2.5 border border-aura-light bg-aura-bg font-body text-xs text-aura-dark outline-none cursor-pointer hover:border-aura-dark transition-colors">
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <FiChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-aura-muted pointer-events-none" />
      </div>
    </div>
  )
}
