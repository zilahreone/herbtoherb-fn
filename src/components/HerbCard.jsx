import React from 'react'

function HerbCard(props) {
  return (
    <>
      <div className='p-4 flex lg:flex-row flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        {/* <div className='flex items-center justify-center flex-none lg:w-1/4'>
          <img className="object-contain rounded-lg" src={`/herb/${props.herb.image}`} alt="" />
        </div> */}
        <div className="flex-1 flex flex-col">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.herb.title.name}</h5>
          <p className='mb-4 text-sm'>{props.herb.title.sci}</p>
          <p className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html:props.herb.desc}} ></p>
        </div>
      </div>
    </>
  )
}

export default HerbCard