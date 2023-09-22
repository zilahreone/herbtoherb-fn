import { WithSearch } from '@elastic/react-search-ui'
import React from 'react'

function SearchProvider() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ isLoading }) => ({ isLoading })}>
        {({ isLoading }) => (
          <div className="App">
            {isLoading && <div>I'm loading now</div>}
            {!isLoading && (
              <Layout
                header={<SearchBox />}
                bodyContent={<Results titleField="title" urlField="nps_link" />}
              />
            )}
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  )
}

export default SearchProvider