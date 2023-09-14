import React from 'react'
import Dropdown from '../components/Dropdown'
import { Link } from 'react-router-dom'
import HerbSearch from '../components/HerbSearch'
import CardBox from '../components/CardBox'
import health_system from '@/assets/mockup_data/health_system.json'

function Home () {
  const images = [

  ]
  return (
    // <div>
    // </div>
    <>
    <HerbSearch></HerbSearch>
    <div>
      <div className='text-2xl font-semibold py-2'>Top Function / Feature Function</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {health_system.map((hs, index) => {
          return <div key={index}>
            <CardBox image="https://img.freepik.com/free-photo/top-view-fresh-mexican-food-table_23-2148614421.jpg?w=1060&t=st=1694428024~exp=1694428624~hmac=c4bc1d92918a70149c89b01b33865c8306b8207f855a85c0cbb7f84df9393a5f" title={hs.health_system_disease} />
          </div>
        })}
      </div>
      <div className='text-2xl font-semibold py-2'>Top Ingredient</div>
    </div>
    </>
  )
}
export default Home