import React from 'react'

function CardDetail({ desc, title }) {
  return (
    <>
      <div className="relative bg-white p-6 rounded-xl my-4 shadow-xl w-full">
        {title &&
          <div className=" text-white flex items-center absolute rounded-full py-2 px-6 shadow-md bg-pink-500 left-4 -top-6">
            <p>{title}</p>
          </div>
        }
        <div className={title && 'mt-2'}>
          <div className="text-md font-normal">{desc}</div>
        </div>
      </div>
    </>
  )
}
// CardDetail.defaultProps = {
//   name: '',
//   desc: '',
//   title: ''
// }

export default CardDetail