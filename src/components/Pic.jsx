import { color } from 'echarts'
import React, { useEffect, useState } from 'react'

function Pic({ pics }) {
  const [picActive, setTabActive] = useState(0)
  // useEffect(() => {
  //   setTabActive
  // }, 0)
  return (
    <>
      <div className="pic-bcontainer">
        <div className="menu-left">
          <p>เลือกการแสดงผล :</p>
        <ul className='pic-choice'>
          {pics.map((pic, index) => (
            <li key={index}>
              <div onClick={() => setTabActive(index)} className={`btn ${index === picActive && 'pic-active'}`}>                  
                {pic.name}
              </div>
            </li>
          ))}
        </ul>
        </div>
        <div className="preview-preview">
          <div className="preview-box">{ pics[picActive].content}</div>
        </div>
      </div>
      
    </>
  )
}

export default Pic