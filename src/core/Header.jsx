import React from 'react'
import logo from '@/assets/logo.png'
import { Link, NavLink, BrowserRouter } from 'react-router-dom'

const menus = [
  {
    path: '/',
    name: 'Functional Ingredient'
  },
  {
    path: '/im',
    name: 'Im'
  },
  {
    path: '/about',
    name: 'เกี่ยวกับเรา'
  },
  {
    path: '/service',
    name: 'บริการ'
  },
  {
    path: '/contact',
    name: 'ติดต่อเรา'
  }
]

function Header() {
  return (
      <div className='rounded-full shadow-xl bg-gray-50 border border-gray-100 w-[1250px] h-[90px] flex flex-row gap-1 pl-8 pr-6 justify-between items-center'>
        <div className='flex gap-8'>
          <img src={logo} alt="logo" className='mr-6' />
          <nav className='flex items-center gap-8'>
            {/* <BrowserRouter> */}
              {menus.map((menu, index) => (
                // <button key={index} className='font-semibold hover:text-[#901B99] text-gray-700'>{menu}</button>
                <NavLink key={ index } to={ menu.path } className='font-semibold hover:text-[#901B99] text-gray-700'>{ menu.name }</NavLink>
              ))}
            {/* </BrowserRouter> */}
          </nav>
        </div>
        <div>
          {/* <button className='tw-button-submit w-[242px] h-[50px]'>Button</button> */}
        </div>
      </div>
  )
}

export default Header