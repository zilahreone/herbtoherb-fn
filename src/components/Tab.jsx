import { color } from 'echarts'
import React, { useEffect, useState } from 'react'

function Tab({ tabs }) {
  const [tabActive, setTabActive] = useState(0)
  // useEffect(() => {
  //   setTabActive
  // }, 0)
  return (
    <>
      {/* <div className='flex flex-col gap-0'>
        <div className="dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {tabs.map((tab, index) => (
              <li key={index} className="mr-1" >
                <div onClick={() => setTabActive(index)} className={`tw-tab ${index === tabActive && 'tw-tab-active'}`}>
                  {tab.icon && 
                    (<svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>)}
                  {tab.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='rounded-b-lg border rounded-tr-lg py-4 px-4 shadow-xl bg-white'>{ tabs[tabActive].content}</div>
      </div> */}


      <ul className="sidebar"><h3>รายการข้อมูล</h3>
        {tabs.map((tab, index) => (
          <li key={index} className="" >
            <div onClick={() => setTabActive(index)} className={`menu-list ${index === tabActive && 'active'}`}>                  
              {tab.name}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Tab