import React from 'react'
import { Link } from 'react-router-dom'

function HerbCard(props) {
  return (
    <>
      <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg  shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        <img className="object-cover w-full rounded-t-lg" alt="" />
        <div className="flex flex-col justify-between p-4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.herb.title.name}</h5>
          <p className='mb-4 text-sm'>{props.herb.title.sci}</p>
          <p className="text-gray-700 dark:text-gray-400">{props.herb.desc}</p>
        </div>
      </div>
    </>
  )
}

export default HerbCard