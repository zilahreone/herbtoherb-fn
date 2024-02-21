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
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import bg from '@/assets/bg/bg_top_left.png'
import React from "react";
import ElasticSearch from './components/ElasticSearch'
import ElasticSearchDemo from './components/ElasticSearchDemo'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  return (
    <>
    <div className="navbar-container"><Header /></div>
      <div>
        {/* style={{ 'backgroundImage': `url(${bg})` }} */}
        <div className='content-container'>
        {/* <div className='py-10 mt-[12vh] w-[1250px] h-[90px] items-center bg-slate-400'> */}

        
          {location.pathname === '/' ? <Home /> : <Outlet />}


          
          {/* <div className='px-4 md:px-8 lg:px-12 xl:px-16 bg-red-100 w-full'>
            <ElasticSearch />
          </div> */}
          {/* <ElasticSearchDemo /> */}
          <ScrollRestoration />
        </div>
      </div>
        <div>
          <Footer />
        </div>
    </>
  )
}

export default App
