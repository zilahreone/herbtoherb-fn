function Lists({ link, title, list }) {
  return (
    <>
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{ title }</h2>
      <ul className={`${!title || 'pt-1'} pl-10 space-y-0 text-gray-500 list-disc list-outside dark:text-gray-400`}>
        {link ?
          list.map((value, index) => {
            return <li key={index} className="hover:text-blue-500"><a href={value.url} target="_blank">{value.title}</a></li>
          }) :
          list.map((value, index) => {
            return <li key={index}>{ value }</li>
          })
        }
      </ul>
    </div>
    </>
  )
}

export default Lists