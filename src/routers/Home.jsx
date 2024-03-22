import React, { useState } from 'react'
import Dropdown from '../components/Dropdown'
import { Link, useNavigate } from 'react-router-dom'
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
import { Facet, Result, Results, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import es_config from '../middleware/elasticsearch'
// import { MultiCheckboxFacet, SearchBox } from '@elastic/react-search-ui-views'
import { SmiDrawer } from 'smiles-drawer'
import { useRef } from 'react'
import SmileDrawer from '../components/SmileDrawer'
import FacetView from '../components/FacetView'

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
  const facets = [
    {
      label: 'หมวดหมู่',
      field: 'health_system_disease'
    },
    {
      label: 'ส่วนผสมของฟังค์ชัน',
      field: 'group_of_functional_ingredient'
    },
    {
      label: 'พื้นที่เพาะปลูก',
      field: 'planting_zone'
    },
  ]
  const navigate = useNavigate();
  const searchInputRef = useRef(null)
  const handleSearchFilter = (option) => {
    // let conf = (es_config)
    // conf.autocompleteQuery.suggestions.types = {
    //   documents: {
    //     fields: ["health_system_disease"]
    //   }
    // }
    console.log(option);
  }

  return (
    <>
      <div className="content-container">
        <SearchProvider config={es_config}>
          <WithSearch mapContextToProps={({ isLoading }) => ({ isLoading })}>
            {({ isLoading }) => (
              <>
                {isLoading && <div>I'm loading now</div>}
                {!isLoading && (
                  <div>
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
                              <IngredientSearch
                                ref={searchInputRef}
                                classProp={'es-input'}
                                placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...'
                                onSubmit={(searchTerm) => {
                                  navigate(`/herb?q=${searchTerm}&size=n_20_n`);
                                }}
                                onSelectAutocomplete={(selection, { }, defaultOnSelectAutocomplete) => {
                                  // console.log(selection);
                                  if (selection.suggestion) {
                                    navigate(`/herb?q=${selection.suggestion}&size=n_20_n`);
                                  } else {
                                    defaultOnSelectAutocomplete(selection);
                                  }
                                }}
                              />
                            </div>
                            <div className="checkbox-flex">
                              <div className="checkbox-box">
                                {
                                  facets.map((facet, index) => {
                                    return (
                                      <div key={index} className="box-input">
                                        <div className="title checkbox">{facet.label} :</div>
                                        <div className="box">
                                          <Facet field={facet.field} view={FacetView} />
                                        </div>

                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                            <button className='search-btn' onClick={() => navigate("/herb?q=" + searchInputRef.current.value)}>ค้นหา</button>
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
                  </div>
                )}
              </>
            )}

          </WithSearch>
        </SearchProvider>

        <SearchProvider config={es_config}>

          <div className="most-view-container two">
            <div className="most-view">
              <h2>รายการส่วนผสมฟังค์ชัน</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
              <div className="menu-btn-container">
                <Facet
                  field='group_of_functional_ingredient'
                  // label="Group of Functional Ingredient"
                  // isFilterable={true}
                  show={50}
                  // view={MultiCheckboxFacet}
                  view={({ options, onRemove, onSelect }) => {
                    return (
                      options.map((option, index) => (
                        <button onClick={() => (option.selected ? onRemove(option.value) : onSelect(option.value))} key={index} className={`menu-btn ${option.selected && 'active'}`}>{(option.value)}</button>
                      ))
                    )
                  }}
                />
              </div>

              <div className="slide-container">
                <div className="header">
                  <span>ผลการค้นหา : "Blood Pressure"</span>
                  <Link to={{ pathname: `/herb`, search: 'size=n_20_n' }}>
                    แสดงทั้งหมด
                  </Link>
                </div>

                <Results
                  className='slide-card'
                  resultView={({ result }) => {
                    if (result.id?.raw) {
                      result = Object.assign({}, result, {
                        plants: {
                          raw: result.plants.raw.map((plant) => JSON.parse(plant))
                        }
                      })
                    }
                    return (
                      <Link to={{ pathname: `/herb/${result.id.raw}` }} >
                        <div className="item-card">
                          <span className='title'>{result.functional_ingredient?.raw}</span>
                          {
                            result.chem_formula?.raw && (<SmileDrawer key={result.id?.raw} smilesStr={result.chem_formula?.raw} uniqueKey={result.id?.raw} />)
                          }
                          <p>{result.description?.raw}</p>
                          <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                        </div>
                      </Link>
                    )
                  }}
                />
              </div>

            </div>
          </div>
        </SearchProvider>

      </div>
    </>
  )
}
export default Home


