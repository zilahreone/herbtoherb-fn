import { color } from 'echarts'
import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'

function Tab({ tabs }) {
  const [tabActive, setTabActive] = useState(0)
  const yOffset = -165;
  // useEffect(() => {
  //   setTabActive
  // }, 0)
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    // console.log('effect');
    tabIndex()
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  const tabIndex = () => {
    const offset = 214;
    if (offset > 500 || true) {
      let idArr = [...document.getElementById('one').children]
        .map((el, i) => {
          return {
            key: el.id,
            value: el.getBoundingClientRect().bottom - offset,
          };
        });
      idArr = idArr.sort((a, b) => a.value - b.value).filter(e => e.value > 0);
      const result = idArr.length ? idArr[0].key : null;
      setTabActive(result)
    }
  }

  return (
    <>
      <ul className="sidebar"><h3>รายการข้อมูล</h3>
        {/* { tabActive } */}
        {/* { window.scrollY } */}
        {tabs.map((tab, index) => (
          <HashLink key={index} smooth to={`#${tab.name}`} scroll={el => scrollWithOffset(el)}>
            <li key={index} className="">
              <div className={`menu-list ${tab.name === tabActive && 'active'}`}>
                {tab.name}
              </div>
            </li>
          </HashLink>
        ))}
      </ul>
    </>
  )
}

export default Tab