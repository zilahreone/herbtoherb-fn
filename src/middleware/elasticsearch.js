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
      resultsPerPage: 20
  },
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  // searchQuery: {
  //   result_fields: {
  //     title: { raw: {}, snippet: { fallback: true } },
  //     district: { raw: {} },
  //     subdistrict: { raw: {} },
  //     body: { snippet: {size: 200} },
  //     location: { raw: {} },
  //   },
  //   search_fields: {
  //     title: {
  //       weight: 5
  //     },
  //     body: {},
  //   },
  //   disjunctiveFacets: [""],
  //   facets: {
  //     district: { type: "value", size: 30 },
  //     subdistrict: { type: "value", size: 30 },
  //   }
  // }
  // searchQuery: {
  //   result_fields: {
  //     title: {
  //       snippet: {
  //         fallback: true
  //       }
  //     },
  //     description: {
  //       snippet: {
  //         fallback: true
  //       }
  //     },
  //     states: {
  //       snippet: {
  //         fallback: true
  //       }
  //     },
  //     visitors: { raw: {} },
  //     acres: { raw: {} },
  //     square_km: { raw: {} },
  //     date_established: { raw: {} },
  //     nps_link: { raw: {} },
  //   },
  autocompleteQuery: {
    // performs a prefix search on the query
    results: {
      resultsPerPage: 5, // number of results to display. Default is 5.
      result_fields: {
        // Add snippet highlighting within autocomplete suggestions
        functional_ingredient: { raw: {}},
        // functional_ingredient: { snippet: { size: 100, fallback: true }},
        // nps_link: { raw: {} }
      }
    },
    // performs a query to suggest for values that partially match the incomplete query
    suggestions: {
      types: {
        // Limit query to only suggest based on "title" field
        documents: {  fields: ["functional_ingredient"] }
      },
      // Limit the number of suggestions returned from the server
      size: 10
    }
  },
  searchQuery: {
    result_fields: {
      functional_ingredient: { raw: {}},
      important_health_benefits: { raw: {}, snippet: { fallback: true } },
      health_system_disease: { raw: {}, snippet: { fallback: true } },
      note: { raw: {} },
      ref: { raw: {} },
    },
    // search_fields: {
    //   title: {
    //     weight: 5
    //   },
    //   description: {},
    //   states: {}
    // },
    search_fields: {
      functional_ingredient: {
        weight: 5
      },
      important_health_benefits: {},
      health_system_disease: {}
    },
    disjunctiveFacets: [""],
    facets: {
      group_of_functional_ingredient: { type: "value", size: 30 }
    }
    // facets: {
    //   states: { type: "value", size: 30 },
    //   acres: {
    //     type: "range",
    //     ranges: [
    //       { from: -1, name: "Any" },
    //       { from: 0, to: 1000, name: "Small" },
    //       { from: 1001, to: 100000, name: "Medium" },
    //       { from: 100001, name: "Large" }
    //     ]
    //   },
    //   location: {
    //     // San Francisco. In the future, make this the user's current position
    //     center: "37.7749, -122.4194",
    //     type: "range",
    //     unit: "mi",
    //     ranges: [
    //       { from: 0, to: 100, name: "Nearby" },
    //       { from: 100, to: 500, name: "A longer drive" },
    //       { from: 500, name: "Perhaps fly?" }
    //     ]
    //   },
    //   date_established: {
    //     type: "range",
    
    //     ranges: [
    //       {
    //         from: '1972-04-13T12:48:33.420Z',
    //         name: "Within the last 50 years"
    //       },
    //       {
    //         from: '1922-04-13T12:48:33.420Z',
    //         to: '1972-04-13T12:48:33.420Z',
    //         name: "50 - 100 years ago"
    //       },
    //       {
    //         to: '1922-04-13T12:48:33.420Z',
    //         name: "More than 100 years ago"
    //       }
    //     ]
    //   },
    //   visitors: {
    //     type: "range",
    //     ranges: [
    //       { from: 0, to: 10000, name: "0 - 10000" },
    //       { from: 10001, to: 100000, name: "10001 - 100000" },
    //       { from: 100001, to: 500000, name: "100001 - 500000" },
    //       { from: 500001, to: 1000000, name: "500001 - 1000000" },
    //       { from: 1000001, to: 5000000, name: "1000001 - 5000000" },
    //       { from: 5000001, to: 10000000, name: "5000001 - 10000000" },
    //       { from: 10000001, name: "10000001+" }
    //     ]
    //   }
    // }
  }
}
export default es_config