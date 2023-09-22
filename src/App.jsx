import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './Search'
import Card from './Card'
import HerbDetail from './routers/HerbDetail'
import Footer from './core/Footer'
import Home from './routers/Home'
import Header from './core/Header.jsx'
import PageNotFound from './routers/PageNotFound'
import Herb from './routers/Herb'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import bg from '@/assets/bg/bg_top_left.png'
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  Result,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import es_config from './middleware/elasticsearch'
import Pagination from './components/Pagination'
import { setCurrent } from '@elastic/search-ui/lib/esm/actions'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  return (
    <>
      <div className="flex flex-col min-h-screen w-full justify-between">
        <div className="absolute w-full flex flex-row justify-center py-4">
          <Header />
        </div>
        {/* style={{ 'backgroundImage': `url(${bg})` }} */}
        <div className='flex flex-col mt-[12vh] items-center py-10 bg-slate-100'>
        {/* <div className='py-10 mt-[12vh] w-[1250px] h-[90px] items-center bg-slate-400'> */}
          {/* {location.pathname === '/' ? <Home /> : <Outlet />} */}
          <SearchProvider config={es_config}>
            <WithSearch mapContextToProps={({ isLoading }) => ({ isLoading })}>
              {({ isLoading }) => (
                <div className="">
                  {isLoading && <div>I'm loading now</div>}
                  {!isLoading && (
                    <>
                    <ErrorBoundary>
                      <div className='flex flexrow gap-4'>
                        <div className='bg-yellow-300'>
                          <Facet
                            field="states"
                            label="States"
                            isFilterable={true}
                            // view={(showMore) => (
                            //   <div>
                            //     <div>{showMore}</div>
                            //     <div>sdf</div>
                            //   </div>
                            // )}
                          />
                          <Facet
                            field="world_heritage_site"
                            label="World Heritage Site?"
                            view={BooleanFacet}
                          />
                          <Facet
                            field="visitors"
                            label="Visitors"
                            view={SingleLinksFacet}
                          />
                          <Facet
                            field="date_established"
                            label="Date Established"
                          />
                          <Facet
                            field="location"
                            label="Distance"
                          />
                          <Facet
                            field="acres"
                            label="Acres"
                            view={SingleSelectFacet}
                          />
                        </div>
                        <div className='flex flex-col items-center bg-orange-400 w-[100%]'>
                          <SearchBox view={({ value, onChange, onSubmit }) => (
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                              </div>
                              <form onSubmit={onSubmit}>
                                <input
                                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                  type="text"
                                  value={value}
                                  onChange={(e) => onChange(e.target.value)}
                                />
                                <button type="submit" className="tw-button-submit absolute right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">ค้นหา</button>
                              </form>
                            </div>
                          )}/>
                          <div className='w-full flex items-center justify-between'>
                            <PagingInfo view={({start, end, totalResults}) => (
                              <p className='text-sm'>Showing <strong>{start} - {end}</strong> out of <strong>{totalResults}</strong></p>
                            )} />
                            <ResultsPerPage view={({onChange, value}) => (
                              <div>
                                <select value={value} onChange={(e) => onChange(parseInt(e.target.value))} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                  {[10, 20, 30, 40, 50].map((v, index) => (
                                    <option disabled={v === value} key={index} value={v}>{v}</option>
                                  ))}
                                </select>
                              </div>
                            )} />
                          </div>
                          <Results
                            resultView={({result, onClickLink}) => (
                              <div className='mb-4 p-4 flex lg:flex-row flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                {/* <div className='flex items-center justify-center flex-none lg:w-1/4'>
                                  <img className="object-contain rounded-lg" src={`/herb/${props.herb.image}`} alt="" />
                                </div> */}
                                <div className="flex-1 flex flex-col">
                                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{result.title.snippet}</h5>
                                  {/* <p className='mb-4 text-sm'>{props.herb.title.sci}</p> */}
                                  <p className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html:result.description.snippet}} ></p>
                                </div>
                              </div>
                            )}
                            // titleField="title"
                            // urlField="nps_link"
                            // thumbnailField="image_url"
                            // shouldTrackClickThrough
                          />
                          <Paging />
                        </div>
                      </div>
                    </ErrorBoundary>
                    </>
                  )}
                </div>
              )}
            </WithSearch>
          </SearchProvider>
          <ScrollRestoration />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
