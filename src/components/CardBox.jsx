import { Link } from "react-router-dom"

function CardBox({ image, title, link }) {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={{ pathname: `/herb`, search: `?q=${title}` }} >
          {/* <a href="#">
          </a> */}
            <img className="rounded-t-lg" src={image} alt="" />
          <div className="p-2">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            {/* <a href="#">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          </a> */}
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
          </div>
        </Link>
      </div>
    </>
  )
}
export default CardBox