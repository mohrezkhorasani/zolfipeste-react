import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import Product from './Pages/Product';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Index page */}
        <Route path="/product/:id" element={<Product />} /> {/* Index page */}
      </Routes>
    </Router>
  )
}

export default App
