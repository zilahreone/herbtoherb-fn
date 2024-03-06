import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import { Link } from 'react-router-dom'
import HerbSearch from '../components/HerbSearch'
import CardBox from '../components/CardBox'
import health_system from '@/assets/mockup_data/health_system.json'
import ReactEcharts from "echarts-for-react";
import { useEffect } from 'react'
import api from '../middleware/api'
import homeBg from '@/assets/bg/Home-bg.png'
import logo from '@/assets/FoodInno-Logo2.png'
import testPic from '@/assets/test-pic2.png'
import ElasticSearch from '../components/ElasticSearch'
import IngredientSearch from '../components/IngredientSearch'

function Home() {
  const [hsNumber, setHsNumber] = useState(10)
  const bgImages = [
    '/hs/pretty-young-woman-eating-red-cherry-tomato-holding-bowl-mixed-salad.jpg',
    '/hs/beautiful-asian-attractive-woman-hand-hold-apple-healthy-eat-ideas-concept-portrait-asian-long-hair-woman.jpg',
    '/hs/healthy-young-asian-runner-woman-warm-up-body-stretching-before-exercise-yoga.jpg',
  ]
  const top_ingredients = [
    { title: 'Flavonoids', trends: [120, 200, 150, 80, 70, 110, 130], volume: '39,121', change: '+10.61' },
    { title: 'Vitamin C', trends: [139, 30, 114, 104, 111, 90, 126], volume: '9,958', change: '+6.16' },
    { title: 'Beta-carotene', trends: [60, 139, 131, 143, 32, 109, 141], volume: '7,868', change: '-' },
    { title: 'Alpha-tocopherol', trends: [25, 138, 94, 84, 23, 149, 90], volume: '7,722', change: '+5.79' },
    { title: 'Lycopene', trends: [85, 138, 73, 104, 27, 89, 22], volume: '2,996', change: '+6.16' },
  ]
  return (
    // <div>
    // </div>
    <>
      <div className='container hide'>
        <div style={{ position: 'sticky', top: 0, zIndex: 100 }} className=' w-[100%] h-[30vh] rounded-b-xl shadow-xl bg-gray-100'>
          <HerbSearch ></HerbSearch>
        </div>
        <div className='text-2xl font-semibold py-2'>Featured Functions</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {health_system.slice(0, hsNumber).map((hs, index) => {
            return <div key={index}>
              <CardBox image={bgImages[index % 3]} title={hs.health_system_disease} />
            </div>
          })}
        </div>
        {hsNumber < health_system.length && <div className="my-2">
          <button onClick={() => setHsNumber(hsNumber + 10)} type="button" className="flex w-full justify-center text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>}
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className='text-2xl font-semibold py-2'>Trending Ingredients</div>
        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ingredient
                </th>
                <th scope="col" className="px-6 py-3">
                  Volume
                </th>
                <th scope="col" className="px-6 py-3">
                  % Change
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Trending
                </th>
              </tr>
            </thead>
            <tbody>
              {top_ingredients.map((hs, index) => (<tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {hs.title}
                </th>
                <td className="px-6 py-4">
                  {hs.volume}
                </td>
                <td className="px-6 py-4">
                  {hs.change}
                </td>
                <td className="">
                  <ReactEcharts style={{ height: 120, width: 800 }} option={{
                    height: 70,
                    width: 700,
                    xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      axisLabel: {
                        show: false
                      }
                    },
                    yAxis: {
                      type: 'value',
                      axisLabel: {
                        show: false
                      }
                    },
                    series: [
                      {
                        data: hs.trends,
                        type: 'line'
                      }
                    ]
                  }} />
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
        <div>
          {/* <ReactEcharts option={} /> */}
        </div>
      </div>

      <div className="content-container">
        <img className="home-bg" src={homeBg} alt="" />
        <div className="search-flex">
          <div className="search-content">
            <img src={logo} alt="" />
            <h3>Thailand Most Influential Food Innovation Platform</h3>
            <h1>แพลตฟอร์มบริการผลิตอาหารและส่วนผสมฟังก์ชัน</h1>
            <div className="search-box">
              <div className="search-header">
              <i className="fa-solid fa-magnifying-glass"></i>
              <h2>สืบค้นข้อมูลส่วนผสมฟังค์ชัน</h2>
              </div>
              <div className="search-box-content">
                <div className="search-input">
                  <div className="title">คำค้นหา :</div>
                  <IngredientSearch classProp={'es-input'} placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...' />

                </div>
                <div className="checkbox-flex">
                  <div className="checkbox-box">

                    <div className="box-input">
                      <div className="title checkbox">หมวดหมู่ :</div>
                      <div className="box">
                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="Antioxidant" id="Antioxidant" type="checkbox"/>
                            <label className="cbx" htmlFor="Antioxidant">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>Antioxidant</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="blood" id="blood" type="checkbox"/>
                            <label className="cbx" htmlFor="blood">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>Blood</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="bloodPressure" id="bloodPressure" type="checkbox"/>
                            <label className="cbx" htmlFor="bloodPressure">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>Blood Pressure</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="brain" id="brain" type="checkbox"/>
                            <label className="cbx" htmlFor="brain">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>Brain</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="Cancer" id="Cancer" type="checkbox"/>
                            <label className="cbx" htmlFor="Cancer">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>Cancer</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="Cardiovascular" id="Cardiovascular" type="checkbox"/>
                            <label className="cbx" htmlFor="Cardiovascular">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>Cardiovascular</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="Coenzyme" id="Coenzyme" type="checkbox"/>
                            <label className="cbx" htmlFor="Coenzyme">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>Coenzyme</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                      </div>
                    </div>

                    <div className="box-input two">
                      <div className="title checkbox">ส่วนผสมของฟังค์ชัน :</div>
                      <div className="box">
                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="FunctionalIngredient1" id="FunctionalIngredient1" type="checkbox"/>
                            <label className="cbx" htmlFor="FunctionalIngredient1">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>7 Carbohydrate & Specialty cabohydrate</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="FunctionalIngredient2" id="FunctionalIngredient2" type="checkbox"/>
                            <label className="cbx" htmlFor="FunctionalIngredient2">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>2 Protein & Amino acids</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="FunctionalIngredient3" id="FunctionalIngredient3" type="checkbox"/>
                            <label className="cbx" htmlFor="FunctionalIngredient3">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>3 Dietary fiber</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="FunctionalIngredient4" id="FunctionalIngredient4" type="checkbox"/>
                            <label className="cbx" htmlFor="FunctionalIngredient4">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>18 Healthy fats</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="FunctionalIngredient5" id="FunctionalIngredient5" type="checkbox"/>
                            <label className="cbx" htmlFor="FunctionalIngredient5">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>7 Minerals</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                      </div>
                    </div>

                    <div className="box-input">
                      <div className="title checkbox">พื้นที่เพาะปลูก :</div>
                      <div className="box">
                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="area1" id="area1" type="checkbox"/>
                            <label className="cbx" htmlFor="area1">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>ต่างประเทศ 94 ชนิด</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                          <input className="inp-cbx" name="functionType" value="area2" id="area2" type="checkbox"/>
                            <label className="cbx" htmlFor="area2">
                                <span>
                                    <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                </span>
                                <span>ในประเทศไทย 144 ชนิด</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                        </div>

                    </div>
                      


                  </div>
                </div>
                <button className='search-btn'>ค้นหา</button>
              </div>
            </div>
          </div>
        </div>


        <div className="most-view-container">
          <div className="most-view">
            <h2>รายการข้อมูลที่ถูกเข้าถึงมากที่สุด</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
            
            {/* <ElasticSearch /> */}

            <div className="card-container">
              <div className="most-view-card top">
                <div className="card">
                  <div className='title'>โปรตีน (Protein)</div>
                  <img src={testPic} alt="" />
                  <div className="view-count">
                    <i className="fa-solid fa-eye"></i>
                    <span>00,000</span>
                    <span> views</span>
                  </div>
                </div>
                <div className="card">
                  <div className='title'>โปรตีน (Protein)</div>
                  <img src={testPic} alt="" />
                  <div className="view-count">
                    <i className="fa-solid fa-eye"></i>
                    <span>00,000</span>
                    <span> views</span>
                  </div>
                </div>
              </div>
                <div className="most-view-card bottom">
                <div className="card">
                  <div className='title'>โปรตีน (Protein)</div>
                  <img src={testPic} alt="" />
                  <div className="view-count">
                    <i className="fa-solid fa-eye"></i>
                    <span>00,000</span>
                    <span> views</span>
                  </div>
                </div>
                <div className="card">
                  <div className='title'>โปรตีน (Protein)</div>
                  <img src={testPic} alt="" />
                  <div className="view-count">
                    <i className="fa-solid fa-eye"></i>
                    <span>00,000</span>
                    <span> views</span>
                  </div>
                </div>
                <div className="card">
                  <div className='title'>โปรตีน (Protein)</div>
                  <img src={testPic} alt="" />
                  <div className="view-count">
                    <i className="fa-solid fa-eye"></i>
                    <span>00,000</span>
                    <span> views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="most-view-container two">
          <div className="most-view">
            <h2>รายการส่วนผสมฟังค์ชัน</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
            <div className="menu-btn-container">
              <button className='menu-btn'>Antioxidant</button>
              <button className='menu-btn'>Blood</button>
              <button className='menu-btn'>Blood Pressure</button>
              <button className='menu-btn'>Brain</button>
              <button className='menu-btn'>Cancer</button>
              <button className='menu-btn'>Cardiovascular</button>
              <button className='menu-btn'>Coenzyme</button>
              <button className='menu-btn'>Diabetes</button>
              <button className='menu-btn'>Energy</button>
              <button className='menu-btn'>Cancer</button>
              <button className='menu-btn'>Cardiovascular</button>
              <button className='menu-btn'>Coenzyme</button>
              <button className='menu-btn'>Eye</button>
              <button className='menu-btn'>Hormone</button>
              <button className='menu-btn active'>Antioxidant</button>
              <button className='menu-btn'>Blood</button>
              <button className='menu-btn'>Blood Pressure</button>
              <button className='menu-btn'>Brain</button>
              <button className='menu-btn'>Cancer</button>
              <button className='menu-btn'>Cardiovascular</button>
              <button className='menu-btn'>Coenzyme</button>
            </div>

            <div className="slide-container">
              <div className="header">
                <span>ผลการค้นหา : “Blood Pressure”</span>
                <a href="">แสดงทั้งหมด</a>
              </div>
              <div className="slide-card">

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                </div>

              </div>
            </div>

          </div>
        </div>






      </div>
    </>
  )
}
export default Home


