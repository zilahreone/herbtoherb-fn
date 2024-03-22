import HerbCard from '../components/HerbCard'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import SearchKeyword from '../components/SearchKeyword'
import { useMemo, useState } from 'react'
// import { Result, Results, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import { Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import { ErrorBoundary, MultiCheckboxFacet } from '@elastic/react-search-ui-views'
import es_config from '../middleware/elasticsearch'
import { Layout } from '@elastic/react-search-ui-views'
import homeBg from '@/assets/bg/Home-bg.png'
import testPic from '@/assets/test-pic2.png'
import IngredientSearch from '../components/IngredientSearch'
import { useEffect } from 'react'
import SmileDrawer from '../components/SmileDrawer'
import { SmiDrawer } from 'smiles-drawer'
import { useRef } from 'react'
import FacetView from '../components/FacetView'

function Herb() {
  const searchInputRef = useRef(null)
  const navigate = useNavigate()
  // const location = useLocation();
  // const { search } = useLocation()
  const [searchParams] = useSearchParams();
  // const queryString = new URLSearchParams(search).get('q')
  // const [search, setSearch] = useState(searchParams.get('q'))
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q'))

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

  useEffect(() => {
    // console.log(searchParams);
    // console.log(searchParams);
    // setSearch(searchParams.get('q'))
  }, [])

  return (
    <>
      {/* <SearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm} /> */}
      {/* { searchTerm } */}
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
                              <IngredientSearch
                                classProp={'es-input'}
                                placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...'
                              // setSearchTerm={setSearchTerm}
                              // searchTerm={searchTerm}
                              // onSubmit={(searchTerm) => {
                              //   setSearchTerm(searchTerm)
                              //   navigate("/herb?q=" + searchTerm, { replace: true });
                              // }}
                              // onSelectAutocomplete={(selection, { }, defaultOnSelectAutocomplete) => {
                              //   console.log(selection);
                              //   if (selection.suggestion) {
                              //     setSearch(selection.suggestion)
                              //     // navigate("/herb?q=" + selection.suggestion, { replace: true });
                              //   } else {
                              //     defaultOnSelectAutocomplete(selection);
                              //   }
                              // }}
                              />
                              {/* <input type="text" placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...' /> */}
                            </div>
                            <div className="checkbox-flex">
                              <div className="checkbox-box result-page">
                                {
                                  facets.map((facet, index) => {
                                    return (
                                      <div key={index} className="box-input two">
                                        <div className="title checkbox">{facet.label} :</div>
                                        <Facet field={facet.field} view={({ ...props }) => {
                                          return <FacetView {...props} showCount={true} />
                                        }} />
                                      </div>
                                    )
                                  })
                                }

                              </div>
                            </div>
                            <SearchBox
                              view={({ value, onChange, onSubmit }) => (
                                <form onSubmit={onSubmit}>
                                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <button className='search-btn' type="submit">ค้นหา</button>
                                  </div>
                                </form>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="box-b">
                        <div className="search-word-box">
                          <PagingInfo view={({ start, end, totalResults, searchTerm }) => (
                            <>
                              <div className='search-word'>"{searchTerm}"</div>
                              <div className='search-word-num'> : พบข้อมูล {totalResults} รายการ</div>
                            </>
                          )} />
                        </div>

                        <div className="result-card-conntainer">
                          <Results
                            resultView={({ result, onClickLink }) => {
                              if (result.id?.raw) {
                                result = Object.assign({}, result, {
                                  plants: {
                                    raw: result.plants.raw.map((plant) => JSON.parse(plant))
                                  }
                                })
                                // console.log(result);
                                return (
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
                                                result.plants.raw.map((plant, i) => (
                                                  plant.common_name.th.map((com_th, com_index) => (
                                                    <li key={com_index}>{com_th}</li>
                                                  ))
                                                ))
                                              }
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="right">
                                          {/* <SmileDrawer smilesStr={result?.chem_formula?.raw} /> */}
                                          {/* { JSON.stringify(result.chem_formula.raw) } */}
                                          {/* <img src={testPic} alt="" /> */}
                                          <div style={{ width: '250px' }}>
                                            <SmileDrawer smilesStr={result.chem_formula.raw} uniqueKey={result.id.raw} />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="view-count">
                                        <i className="fa-solid fa-eye"></i>
                                        <span>00,000</span>
                                        <span> views</span>
                                      </div>
                                    </div>
                                  </Link>
                                )
                              }
                            }}
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