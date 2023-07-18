import { useState } from 'react'

function Dropdown({ headIcon, selected, tailIcon, menu }) {
  const [ifTrue, setIfTrue] = useState(false)

  function handleClick() {
    setIfTrue(!ifTrue)
  }

  return (
    <>
      <div className='flex flex-col gap-1.5'>
        <div>
          <button onClick={handleClick} className="w-full tw-button text-std px-6 py-2.5 text-center flex items-center justify-between" type="button">
            <div className='flex items-center gap-2 pr-2'>
              { headIcon }
              { selected }
            </div>
            <div>
              { tailIcon }
            </div>
          </button>
        </div>
        {ifTrue &&
          <div className="z-10 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {menu.map((me, index) => (
                <li key={index}>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">{ me.key }</a>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </>
  )
}
Dropdown.defaultProps = {
  tailIcon:
    <svg className="w-2.5 h-2.5 ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
    </svg>
}

export default Dropdown