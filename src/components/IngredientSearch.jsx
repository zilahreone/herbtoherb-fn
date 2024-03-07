import React from 'react'
import es_config from '../middleware/elasticsearch'
import { SearchBox, SearchProvider } from '@elastic/react-search-ui'
import { useNavigate } from 'react-router-dom'

export default function IngredientSearch({ classProp, placeholder }) {
  const navigate = useNavigate()
  return (
    <>
      <SearchProvider config={es_config}>
        <SearchBox
          autocompleteSuggestions={true}
          // autocompleteSuggestions={{
          //   // Types used here need to match types requested from the server
          //   documents: {
          //     sectionTitle: "Suggested Queries",
          //   },
          //   popular_queries: {
          //     sectionTitle: "Popular Queries"
          //   }
          // }}
          // autocompleteSuggestions={true}
          // view={({ value, onChange, onSubmit, allAutocompletedItemsCount, autocompletedResults, autocompletedSuggestions, onSelectAutocomplete}) => (
          //   <>
          //     <form onSubmit={onSubmit}>
          //       <input value={value} onChange={(e) => onChange(e.target.value)} type="text" placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...' />
          //     </form>
          //     {/* { JSON.stringify(autocompletedResults) } */}
          //     {
          //       allAutocompletedItemsCount > 0 && (
          //         <select name="ingredient-suggestion" id="ingredient-suggestion">
          //           {
          //             autocompletedSuggestions.documents.map((doc, index) => (
          //               <option key={index} value={doc.suggestion} onChange={onSelectAutocomplete}>{doc.suggestion}</option>
          //             ))
          //           }
          //         </select>
          //       )
          //     }

          //   </>
          // )}
          inputView={({ getAutocomplete, getInputProps, getButtonProps }) => (
            <>
              <div className={classProp}>
                <input
                  {...getInputProps({
                    placeholder: placeholder
                  })}
                />
                {getAutocomplete()}
              </div>
            </>
          )}
          autocompleteView={({ autocompletedResults, autocompletedSuggestions, getItemProps, getMenuProps, onSelectAutocomplete }) => (
            <>
              <div className="sui-search-box__autocomplete-container">
                {/* { JSON.stringify(getItemProps) } */}
                <ul>
                  {autocompletedSuggestions.documents.map((result, i) => (
                    <li {...getItemProps({ key: result.suggestion, item: result })}>
                      <span className="text-sm text-gray-700">
                        {result.suggestion}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          onSubmit={(searchTerm) => {
            navigate("/herb?q=" + searchTerm);
          }}
          onSelectAutocomplete={(selection, { }, defaultOnSelectAutocomplete) => {
            // console.log(selection);
            if (selection.suggestion) {
              navigate("/herb?q=" + selection.suggestion);
            } else {
              defaultOnSelectAutocomplete(selection);
            }
          }}
        />
      </SearchProvider >
    </>
  )
}
