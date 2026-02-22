import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import Product from './Pages/Product';
import DashboardPage from './Pages/Dashboard';
import BaseLayout from "./Layout/BaseLayout"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* کل این گروه از Layout استفاده می‌کنند */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/my-account" element={<DashboardPage />} />
        </Route>

        {/* اگر صفحه‌ای دارید که هدر/فوتر نمی‌خواهد (مثل صفحه لاگین) بیرون از تگ بالا بگذارید */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
