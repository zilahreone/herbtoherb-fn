import { ErrorBoundary, Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import React from 'react'
import es_config from '../middleware/elasticsearch'

function ElasticSearch() {
  return (
    <div className='bg-red-100 w-full'>
      <SearchProvider config={es_config}>
        <WithSearch mapContextToProps={({ isLoading }) => ({ isLoading })}>
          {({ isLoading }) => (
            <>
              {isLoading && <div>I'm loading now</div>}
              {!isLoading &&
                <ErrorBoundary>
                  <div className='flex flex-col items-center gap-0'>
                    {/* <SearchBox inputProps={{ placeholder: "custom placeholder" }} /> */}
                    {/* <SearchBox autocompleteSuggestions={true} view={({ value, onChange, onSubmit, useAutocomplete, autocompletedResults }) => (
                      <>
                        <div className="relative w-1/3">
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
                        <div>{JSON.stringify(autocompletedResults)}</div>
                      </>
                    )}/> */}
                    <SearchBox
                      autocompleteSuggestions={true}
                      inputView={({ getAutocomplete, getInputProps, getButtonProps, }) => (
                        <>
                          <div>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                              </svg>
                            </div>
                            <input
                              {...getInputProps({
                                placeholder: 'custom placeholder'
                              })}
                              className="pr-20 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {getAutocomplete()}
                          </div>
                          <button className="tw-button-submit absolute right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">ค้นหา</button>
                        </>
                      )}
                      // autocompleteView={({ autocompletedResults, getItemProps }) => (
                      //   <div className="sui-search-box__autocomplete-container">
                      //     {autocompletedResults.map((result, i) => (
                      //       <div
                      //         {...getItemProps({
                      //           key: result.id.raw,
                      //           item: result
                      //         })}
                      //       >
                      //         Result {i}: {result.functional_ingredient.raw}
                      //       </div>
                      //     ))}
                      //   </div>
                      // )}
                    />
                    <div className='flex flex-row gap-4 w-full'>
                      <div className='bg-yellow-300 w-1/5'>
                      <Facet
                        field="group_of_functional_ingredient"
                        label="Group of Functional Ingredient"
                        isFilterable={true}
                      />
                      </div>
                      <div className='flex flex-col items-center bg-orange-400 w-full gap-2'>
                        <div className='w-full flex items-center justify-between'>
                          <PagingInfo view={({start, end, totalResults}) => (
                            <p className='text-sm'>Showing <strong>{start} - {end}</strong> out of <strong>{totalResults}</strong></p>
                          )} />
                          <ResultsPerPage view={({onChange, value}) => (
                            <div>
                              <select value={value} onChange={(e) => onChange(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {[10, 20, 30, 40, 50].map((v, index) => (
                                  <option disabled={v === value} key={index} value={v}>{v}</option>
                                ))}
                              </select>
                            </div>
                          )} />
                        </div>
                        <div className='w-full'>
                          <Results
                            resultView={({result, onClickLink}) => (
                              <div className='w-full mb-4 p-4 flex lg:flex-row flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                {/* <div className='flex items-center justify-center flex-none lg:w-1/4'>
                                  <img className="object-contain rounded-lg" src={`/herb/${props.herb.image}`} alt="" />
                                </div> */}
                                <div className="flex-1 flex flex-col">
                                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{result.functional_ingredient.raw}</h5>
                                  {/* <p className='mb-4 text-sm'>{props.herb.title.sci}</p> */}
                                  <p className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html:JSON.stringify(result.important_health_benefits.snippet)}} ></p>
                                </div>
                              </div>
                            )}
                            // titleField="title"
                            // urlField="nps_link"
                            // thumbnailField="image_url"
                            // shouldTrackClickThrough
                          />
                        </div>
                        <Paging />
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              }
            </>
          )}
        </WithSearch>
      </SearchProvider>
    </div>
  )
}

export default ElasticSearch