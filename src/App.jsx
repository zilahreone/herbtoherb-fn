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
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector/lib/esm/AppSearchAPIConnector'

const connector = new AppSearchAPIConnector({
  searchKey: "search-esh6wo8473m7qh3nrjefrwom",
  engineName: "bma-search-fondue-engine",
  endpointBase: "https://mas.naimueang.com"
});

const config = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      title: { raw: {}, snippet: { fallback: true } },
      district: { raw: {} },
      subdistrict: { raw: {} },
      body: { snippet: {size: 200} },
      location: { raw: {} },
    },
    search_fields: {
      title: {
        weight: 5
      },
      body: {},
    },
    disjunctiveFacets: [""],
    facets: {
      district: { type: "value", size: 30 },
      subdistrict: { type: "value", size: 30 },
    }
  }
};

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
          {location.pathname === '/' ? <Home /> : <Outlet />}
          {/* <SearchProvider config={config}>
            <WithSearch
              mapContextToProps={({ wasSearched }) => ({
                wasSearched
              })}
            >
              {({ wasSearched }) => {
                return (
                  <div className="App">
                    <ErrorBoundary>
                      <Layout
                        header={<SearchBox debounceLength={0} />}
                        sideContent={
                          <div>
                          <Facet
                            field="district"
                            label="District"
                            isFilterable={true}
                            show={20}
                          />
                          <Facet
                            field="subdistrict"
                            label="Subdistrict"
                            isFilterable={true}
                            show={20}
                          />
                        </div>
                        }
                        bodyContent={
                          <Results
                            titleField="title"
                            urlField="nps_link"
                            thumbnailField="image_url"
                            shouldTrackClickThrough
                          />
                        }
                        bodyHeader={
                          <React.Fragment>
                            {wasSearched && <PagingInfo />}
                            {wasSearched && <ResultsPerPage />}
                          </React.Fragment>
                        }
                        bodyFooter={<Paging />}
                      />
                    </ErrorBoundary>
                  </div>
                );
              }}
            </WithSearch>
          </SearchProvider> */}
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
