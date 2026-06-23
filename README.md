Aura Scarves — Frontend
Luxury minimalist hijab e-commerce platform built with React, Vite & Tailwind CSS.
✨ Features

Style gallery with search, filters & sorting
Product detail page with reviews & ratings
Favorites, cart, checkout & order history
User auth (Login/Signup) + Admin dashboard
Fully responsive, Framer Motion animations

🧱 Tech Stack
React 18 · Vite · React Router · Tailwind CSS · Framer Motion · Axios
📁 Structure
src/
├── assets/        # Images
├── components/    # Navbar, Footer, Cards, Reviews, Admin
├── context/       # Auth, Cart, Favorites
├── hooks/         # useDebounce, useLocalStorage
├── pages/         # Home, Styles, Cart, Profile, Admin...
├── App.jsx
└── main.jsx
🚀 Setup
bashnpm install
npm run dev      # http://localhost:5173

Backend must run at http://localhost:5000

🔐 Roles
FeatureUserAdminBrowse/Cart/Reviews✅✅Add/Edit/Delete Styles❌✅Admin Dashboard❌✅

