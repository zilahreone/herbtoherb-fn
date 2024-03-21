import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector/lib/esm/AppSearchAPIConnector'

const connector = new AppSearchAPIConnector({
  searchKey: import.meta.env.VITE_ES_SEARCH_KEY,
  engineName: import.meta.env.VITE_ES_ENGINE,
  endpointBase: import.meta.env.VITE_ES_ENDPOINT
  // searchKey: "search-esh6wo8473m7qh3nrjefrwom",
  // engineName: "bma-search-fondue-engine",
  // endpointBase: "https://mas.naimueang.com"
});

const es_config = {
  initialState: {
    resultsPerPage: 6
  },
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      functional_ingredient: { raw: {}, snippet: { size: 1000, fallback: true } },
      group_of_functional_ingredient: { raw: {}, snippet: { size: 1000, fallback: true } },
      description: { raw: {}, snippet: { size: 1000, fallback: true } },
      important_health_benefits: { raw: {}, snippet: { fallback: true } },
      health_system_disease: { raw: {}, snippet: { fallback: true } },
      plants: { raw: {} },
      note: { raw: {} },
      ref: { raw: {} },
      planting_zone: { raw: {} },
      chem_formula: { raw: {} },
    },
    facets: {
      group_of_functional_ingredient: { type: 'value', size: 30 },
      health_system_disease: { type: 'value', size: 30 },
      planting_zone: { type: 'value', size: 30 }
    },
    // search_fields: {
    //   functional_ingredient: {
    //     weight: 5
    //   },
    //   // description: {},
    //   // states: {}
    // },
    // disjunctiveFacets: [""],
  },
  autocompleteQuery: {
    // performs a prefix search on the query
    results: {
      resultsPerPage: 10, // number of results to display. Default is 5.
      // result_fields: {
      //   // Add snippet highlighting within autocomplete suggestions
      //   functional_ingredient: { snippet: { size: 100, fallback: true } },
      //   group_of_functional_ingredient: { raw: {} }
      // }
    },
    // performs a query to suggest for values that partially match the incomplete query
    suggestions: {
      types: {
        // Limit query to only suggest based on "title" field
        // documents: { fields: ["functional_ingredient"] }
      },
      // Limit the number of suggestions returned from the server
      size: 10,
      // popularQueries: {
      //   search_fields: {
      //     "query.suggest": {} // fields used to query
      //   },
      //   result_fields: {
      //     query: { // fields used for display
      //       raw: {}
      //     }
      //   },
      //   index: "popular_queries",
      //   queryType: "results"
      // }
    }
  }
  // search_fields: {
  //   functional_ingredient: {
  //     weight: 1
  //   },
  //   important_health_benefits: {},
  //   health_system_disease: {}
  // },
}
export default es_config