function Bagdes({ list, handleClick }) {
  return (
    <>
    <div className="flex gap-1">
      {list?.map((badge, index) => {
        return <button onClick={() => handleClick(badge)} key={index} className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2 py-0 rounded dark:bg-blue-900 dark:text-blue-300">{badge}</button>
      })}
    </div>
    </>
  )
}

export default Bagdes