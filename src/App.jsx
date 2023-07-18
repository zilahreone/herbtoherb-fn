import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './Search'
import Card from './Card'
import HerbDetail from './routers/HerbDetail'
import Footer from './core/Footer'
import Home from './routers/Home'
import Header from './core/Header.jsx'
import PageNotFound from './routers/PageNotFound'
import Herb from './routers/Herb'
import { Outlet, useLocation } from 'react-router-dom'
import bg from '@/assets/bg/bg_top_left.png'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  return (
    <>
      <div className="flex flex-col min-h-screen w-full justify-between">
        <div className="absolute w-full flex flex-row justify-center py-4">
          <Header />
        </div>
        {/* style={{ 'backgroundImage': `url(${bg})` }} */}
        <div className=''>
          <div className='inline-flex mt-[12vh] mx-[5vw] py-10'>
            {location.pathname === '/' ? <Home /> : <Outlet />}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
