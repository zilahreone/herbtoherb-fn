import HerbCard from '../components/HerbCard'
import { Link, useLocation, useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import SearchKeyword from '../components/SearchKeyword'
import { useMemo } from 'react'
// import { Result, Results, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import { Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import { ErrorBoundary, MultiCheckboxFacet } from '@elastic/react-search-ui-views'
import es_config from '../middleware/elasticsearch_demo'
import { Layout } from '@elastic/react-search-ui-views'
import homeBg from '@/assets/bg/Home-bg.png'
import testPic from '@/assets/test-pic2.png'

function Herb() {
  const { search } = useLocation()
  const queryString = new URLSearchParams(search).get('q')
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
      field: 'group_of_functional_ingredient'
    },
  ]
  return (
    <>
      <SearchProvider config={es_config}>
        <WithSearch mapContextToProps={({ isLoading }) => ({ isLoading })}>
          {({ isLoading }) => (
            <>
              {isLoading && <div>I'm loading now</div>}
              {!isLoading &&
                <ErrorBoundary>
                  <div className="search-result-container">
                    <div className="max-width">
                      <div className="box-a">
                        <div className="search-box result">
                          <div className="search-header">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <h2>สืบค้นข้อมูลส่วนผสมฟังค์ชัน</h2>
                          </div>

                          <div className="search-box-content result-page">
                            <div className="search-input">
                              <div className="title">คำค้นหา :</div>
                              <input type="text" placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...' />
                            </div>
                            <div className="checkbox-flex">
                              <div className="checkbox-box result-page">
                                {
                                  facets.map((facet, index) => {
                                    return (
                                      <div key={index} className="box-input two">
                                        <div className="title checkbox">{facet.label} :</div>
                                        <Facet
                                          field={facet.field}
                                          // label="Group of Functional Ingredient"
                                          // isFilterable={true}
                                          // show={5}
                                          // view={MultiCheckboxFacet}
                                          view={({ options, onRemove, onSelect }) => {
                                            return (
                                              <div className="box">
                                                {/* { JSON.stringify(options) } */}
                                                {
                                                  options.map((option, index) => {
                                                    return (
                                                      <div key={index} className="checkbox-wrapper-4">
                                                        <input
                                                          className="inp-cbx"
                                                          id={`${facet.label}${index}`}
                                                          type="checkbox"
                                                          checked={option.selected}
                                                          onChange={() => (option.selected ? onRemove(option.value) : onSelect(option.value))}
                                                        />
                                                        <label className="cbx"htmlFor={`${facet.label}${index}`}>
                                                          <span>
                                                            <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
                                                          </span>
                                                          <span>{option.count} {option.value}</span>
                                                        </label>
                                                        <svg className="inline-svg">
                                                          <symbol id="check-4" viewBox="0 0 12 10">
                                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                          </symbol>
                                                        </svg>
                                                      </div>
                                                    )
                                                  })
                                                }
                                              </div>
                                            )
                                          }}
                                        />
                                      </div>
                                    )
                                  })
                                }

                                <div className="box-input">
                                  <div className="title checkbox">พื้นที่เพาะปลูก :</div>
                                  <div className="box">
                                    <div className="checkbox-wrapper-4">
                                      <input className="inp-cbx" name="functionType" value="area1" id="area1" type="checkbox" />
                                      <label className="cbx"htmlFor="area1">
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
                                      <input className="inp-cbx" name="functionType" value="area2" id="area2" type="checkbox" />
                                      <label className="cbx"htmlFor="area2">
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


                      <div className="box-b">
                        <div className="search-word-box">
                          <div className='search-word'>
                            <div className='search-word'>"{queryString}"</div>
                          </div>
                          <PagingInfo view={({ start, end, totalResults }) => (
                            <div className='search-word-num'> : พบข้อมูล {totalResults} รายการ</div>
                            // <p className='text-sm'>Showing <strong>{start} - {end}</strong> out of <strong>{totalResults}</strong></p>
                          )} />
                        </div>

                        <div className="result-card-conntainer">
                          <Results
                            resultView={({ result, onClickLink }) => (
                              <>
                                {/* { JSON.stringify(result) } */}
                                {/* {result.id?.raw &&
                                <div className='w-full mb-4 p-4 flex lg:flex-row flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                  <div className="flex-1 flex flex-col">
                                    <Link to={{ pathname: `/herb/${result.id.raw}` }} >
                                      <button type="submit" className="tw-button-submit  right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">{result.functional_ingredient.raw}</button>
                                    </Link>
                                    <p className="mt-2 text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: (result.description.snippet) }} ></p>
                                  </div>
                                </div>
                              } */}
                                {result.id?.raw &&
                                  <Link to={{ pathname: `/herb/${result.id.raw}` }} >
                                    <div className="result-card">
                                      <div className="top-info">
                                        <h2>{result.functional_ingredient.raw}</h2>
                                        <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
                                      </div>
                                      <div className="middle-info">
                                        <div className="left">
                                          <p className='general-info' dangerouslySetInnerHTML={{ __html: (result.description.snippet) }} />
                                          <div>
                                            <div className="header">คุณประโยชน์ :</div>
                                            <ul>
                                              {result.important_health_benefits.raw.map((r, i) => {
                                                return <li key={i}>{r}</li>
                                              })}
                                            </ul>
                                          </div>
                                          <div>
                                            <div className="header">พบในพืช :</div>
                                            <ul>
                                              {
                                                // console.log(JSON.parse(result.plants.raw))
                                                result.plants.raw.map((plant, i) => {
                                                  // if (false) {
                                                  return <li key={i}>{plant}</li>
                                                  // }
                                                  // console.log(i);
                                                  // const parse = JSON.parse(JSON.stringify(plant))
                                                })
                                              }
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="right">
                                          <img src={testPic} alt="" />
                                        </div>
                                      </div>
                                      <div className="view-count">
                                        <i className="fa-solid fa-eye"></i>
                                        <span>00,000</span>
                                        <span> views</span>
                                      </div>
                                    </div>
                                  </Link>
                                }
                              </>
                            )}
                          />
                        </div>

                        <div className="result-card-conntainer">

                          <div className="pagination-box">
                            <PagingInfo view={({ start, end, totalResults }) => (
                              <span>กำลังแสดงรายการที่ {start} - {end} จากทั้งหมด {totalResults} รายการ</span>
                            )} />
                            <div className="pagination">
                              {/* <span>" 1 2 3 4 5 "</span> */}
                              <Paging
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              }
            </>
          )}
        </WithSearch>
      </SearchProvider>

      {/* <div className='content-container'>
      <img className="home-bg result-page" src={homeBg} alt="" />
      <div className="search-flex result-page">
        <div className="search-content result-page">
          <div>Thailand Most Influential Food Innovation Platform</div>
          <h2>แพลตฟอร์มบริการผลิตอาหารและส่วนผสมฟังก์ชัน</h2>
        </div>
      </div> 
    </div> */}

    </>
  )
}

export default Herb