function SearchKeyword({ keyword }) {
  return (
    <>
    <p className="text-md font-medium text-gray-900 dark:text-white">คำค้นหา : { keyword && `"${keyword}"` }</p>
    </>
  )
}

export default SearchKeyword