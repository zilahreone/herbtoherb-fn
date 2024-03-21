import { ErrorBoundary, Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import React from 'react'
import es_config from '../middleware/elasticsearch_demo'
import { BooleanFacet, Facets, Layout, SingleLinksFacet, SingleSelectFacet } from '@elastic/react-search-ui-views';

function ElasticSearch() {
  return (
    <div className='bg-red-100 w-full'>
      <SearchProvider config={es_config}>
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
                    header={<SearchBox
                      // debounceLength={300}
                      // searchAsYouType={true}
                      autocompleteSuggestions={{
                        // Types used here need to match types requested from the server
                        documents: {
                          sectionTitle: "Suggested Queries",
                        },
                        popular_queries: {
                          sectionTitle: "Popular Queries"
                        }
                      }}
                    />}
                    sideContent={
                      <div>
                        <Facet field="states" label="States" filterType="any" isFilterable={true} />
                        {/* <Facet
                          field="states"
                          label="States"
                          isFilterable={true}
                        /> */}
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
                        <Facets
                          field="acres"
                          label="Acres"
                          view={SingleSelectFacet}
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
      </SearchProvider>
    </div>
  )
}

export default ElasticSearch