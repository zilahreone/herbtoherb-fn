import React from 'react'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'

const menuA = [
  {
    key: 'Antioxidant',
    value: 'antioxidant'
  },
  {
    key: 'Blood',
    value: 'blood'
  },
  {
    key: 'Blood Presure',
    value: 'blood_presure'
  },
  {
    key: 'Brain',
    value: 'brain'
  },
  {
    key: 'Cancer',
    value: 'cancer'
  },
  {
    key: 'Cadiovascular',
    value: 'cadiovascular'
  },
  {
    key: 'Coenzyme',
    value: 'coenzyme'
  }
]
const menuB = [
  {
    key: '7 Carbohydrate & Specialty carbohydrates',
    value: '7_carbohydrate&specialty_carbohydrates'
  },
  {
    key: '2 Protein & Amino acids',
    value: '2_protein&amino_acids'
  },
  {
    key: '3 Dietary fiber',
    value: '3_Dietary_fiber'
  },
  {
    key: '18 Healthy fats',
    value: '18_healthy_fats'
  },
  {
    key: '7 Minerals',
    value: '7_minerals'
  },
]
const menuC = [
  {
    key: 'ต่างประเทศ 94 ชนิด',
    value: 'ต่างประเทศ 94 ชนิด'
  },
  {
    key: 'ประเทศไทย 144 ชนิด',
    value: 'ประเทศไทย 144 ชนิด'
  },
]

function HerbSearch() {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className="-mb-8 relative min-w-[30vw]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button type="submit" className="tw-button-submit absolute right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">ค้นหา</button>
        </div>
        <div className='flex flex-col items-center w-[80vw] h-[30vh] rounded-xl shadow-xl bg-gray-100'>
          <div className='mt-20 flex gap-6'>
            <div className='min-w-fit w-1/4'>
              <Dropdown
                headIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                }
                selected={'Health system/Desease'}
                menu={menuA}
                tailIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                }
              />
            </div>
            <div className='min-w-fit w-1/4'>
              <Dropdown
                headIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-4" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                }
                menu={menuB}
                selected={'Group of functional Ingredients'}
              />
            </div>
            <div className='min-w-fit w-1/4'>
              <Dropdown
                headIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                }
                menu={menuC} selected={'Plant'}
              />
            </div>
          </div>
        </div>
        <div className='-mt-8'>
          <button type="submit" className="tw-button-submit font-medium rounded-full text-std px-12 py-4">
            <Link to={'/herb'} >ค้นหา</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default HerbSearch