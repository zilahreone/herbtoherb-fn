import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import { Link } from 'react-router-dom'
import HerbSearch from '../components/HerbSearch'
import CardBox from '../components/CardBox'
import health_system from '@/assets/mockup_data/health_system.json'
import ReactEcharts from "echarts-for-react"; 

function Home () {
  const [hsNumber, setHsNumber] = useState(10)
  const bgImages = [
    '/hs/pretty-young-woman-eating-red-cherry-tomato-holding-bowl-mixed-salad.jpg',
    '/hs/beautiful-asian-attractive-woman-hand-hold-apple-healthy-eat-ideas-concept-portrait-asian-long-hair-woman.jpg',
    '/hs/healthy-young-asian-runner-woman-warm-up-body-stretching-before-exercise-yoga.jpg',
  ]
  const top_ingredients = [
    { title: 'Flavonoids', trends: [120, 200, 150, 80, 70, 110, 130], volume: '39,121', change: '+10.61'},
    { title: 'Vitamin C', trends: [139,30,114,104,111,90,126], volume: '9,958', change: '+6.16'},
    { title: 'Beta-carotene', trends: [60,139,131,143,32,109,141], volume: '7,868', change: '-'},
    { title: 'Alpha-tocopherol', trends: [25,138,94,84,23,149,90], volume: '7,722', change: '+5.79'},
    { title: 'Lycopene', trends: [85,138,73,104,27,89,22], volume: '2,996', change: '+6.16'},
  ]
  return (
    // <div>
    // </div>
    <>
    <div className='container'>
      <div style={{position: 'sticky', top: 0, zIndex: 100}} className=' w-[100%] h-[30vh] rounded-b-xl shadow-xl bg-gray-100'>
        <HerbSearch ></HerbSearch>
      </div>
      <div className='text-2xl font-semibold py-2'>Featured Functions</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {health_system.slice(0, hsNumber).map((hs, index) => {
          return <div key={index}>
            <CardBox image={bgImages[index%3]} title={hs.health_system_disease} />
          </div>
        })}
      </div>
      {hsNumber < health_system.length && <div className="my-2">
        <button onClick={() => setHsNumber(hsNumber + 10)} type="button" className="flex w-full justify-center text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>}
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className='text-2xl font-semibold py-2'>Trending Ingredients</div>
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                  Ingredient
                </th>
                <th scope="col" className="px-6 py-3">
                    Volume
                </th>
                <th scope="col" className="px-6 py-3">
                    % Change
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Trending
                </th>
            </tr>
        </thead>
        <tbody>
            {top_ingredients.map((hs, index) => (<tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {hs.title}
                </th>
                <td className="px-6 py-4">
                    {hs.volume}
                </td>
                <td className="px-6 py-4">
                  {hs.change}
                </td>
                <td className="">
                  <ReactEcharts style={{height: 120, width: 800}} option={{
                    height: 70,
                    width: 700,
                    xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      axisLabel: {
                        show: false
                      }
                    },
                    yAxis: {
                      type: 'value',
                      axisLabel: {
                        show: false
                      }
                    },
                    series: [
                      {
                        data: hs.trends,
                        type: 'line'
                      }
                    ]
                  }} />
            
                </td>
            </tr>))}
        </tbody>
    </table>
      </div>
    </div>
      
    </>
  )
}
export default Home