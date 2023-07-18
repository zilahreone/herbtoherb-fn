import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, ScrollRestoration, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routers/Home.jsx'
import PageNotFound from './routers/PageNotFound.jsx'
import Header from './core/Header.jsx'
import Herb from './routers/Herb.jsx'
import HerbDetail from './routers/HerbDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/herb',
        element: <Herb />
      },
      {
        path: '/herb/:herbId',
        element: <HerbDetail />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <div className='bg-slate-500'>
    </div> */}
     {/* <App /> */}
  </React.StrictMode>,
)
