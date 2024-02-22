function Bagdes({ list }) {
  return (
    <>
    <div className="badge-container">
      {list?.map((badge, index) => {
        return <div key={index} className="badge">{badge}</div>
      })}
    </div>
    </>
  )
}

export default Bagdes