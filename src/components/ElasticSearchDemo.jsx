import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
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
import es_config from '../middleware/elasticsearch_demo';
import { Link } from "react-router-dom";

function ElasticSearchDemo() {
  return (
    <SearchProvider config={es_config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div>
              <ErrorBoundary>
                <Layout
                  header={<SearchBox debounceLength={0} />}
                  sideContent={
                    <div>
                      <Facet
                        field="group_of_functional_ingredient"
                        label="Group of Functional Ingredient"
                        filterType="any"
                        isFilterable={false}
                      />
                      {/* <Facet
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
                      /> */}
                    </div>
                  }
                  bodyContent={
                    <Results resultView={({result, onClickLink}) => (
                      <li className="sui-result">
                        <div className="sui-result__header">
                          <h3>
                            {/* Maintain onClickLink to correct track click throughs for analytics*/}
                            {/* <a onClick={onClickLink} href={result.nps_link.raw}>
                              {result.title.snippet}
                            </a> */}
                            <Link to={{pathname: `/herb/${result.id.raw}`}} >
                              <button type="submit" className="tw-button-submit  right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">{result.functional_ingredient.raw}</button>
                            </Link>
                          </h3>
                        </div>
                        <div className="sui-result__body">
                          {/* use 'raw' values of fields to access values without snippets */}
                          {result.image_url && 
                            <div className="sui-result__image">
                              <img src={result.image_url.raw} alt="" />
                            </div>
                          }
                          {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
                          <div
                            className="sui-result__details"
                            dangerouslySetInnerHTML={{ __html: result.description.raw }}
                          ></div>
                        </div>
                      </li>
                    )}
                    />
                    // <Results
                    //   titleField="title"
                    //   urlField="nps_link"
                    //   thumbnailField="image_url"
                    //   shouldTrackClickThrough
                    // />
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
  )
}

export default ElasticSearchDemo