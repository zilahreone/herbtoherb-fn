import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './Search'
import Card from './Card'
import HerbDetail from './routers/HerbDetail'
import Footer from './core/Footer'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routers/Home'
import Header from './core/Header.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/",
    element: <Home />
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col min-h-screen w-full justify-between">
      <div class="absolute w-full flex flex-row justify-center py-4">
        <Header />
      </div>
      <div className=''>
        <RouterProvider router={router} />
      </div>
      <Footer />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
        {/* <div className='@container gc-h-container p-0'>
          <Search></Search>
          <div className='bg-green-200'>
           <Card></Card>
          </div>
        </div> */}
           {/* <HerbDetail></HerbDetail> */}
    </div>
  )
}

export default App
