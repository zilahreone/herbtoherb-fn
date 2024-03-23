import React from 'react'
import es_config from '../middleware/elasticsearch'
import { SearchBox, SearchProvider } from '@elastic/react-search-ui'
import { useNavigate } from 'react-router-dom'
import { forwardRef } from 'react'

export default forwardRef (function IngredientSearch(props, ref) {
  const { classProp, placeholder, onSubmit, onSelectAutocomplete, searchTerm, setSearchTerm } = props
  const navigate = useNavigate()
  const handleFilter = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
    }
    // setSearchTerm(e.target.value);
  }
  return (
    <>
      {/* <input type="text" onKeyDown={handleFilter} placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...' /> */}
      <SearchBox
        // setSearchTerm={setSearchTerm}
        // searchTerm={searchTerm}
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
        inputView={({ getAutocomplete, getInputProps, getButtonProps, inputValue }) => (
          <>
            <div className={classProp}>
              <input
                ref={ref}
                {...getInputProps({
                  placeholder: placeholder,
                })}
                // onInput={(e) => console.log(e.target.value)}
              />
              {getAutocomplete()}
            </div>
            {/* {inputValue} */}
          </>
        )}
        autocompleteView={({ autocompletedResults, autocompletedSuggestions, getItemProps, getMenuProps, onSelectAutocomplete }) => (
          <>
            <div className="lists-item">
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
        onSubmit={onSubmit}
        onSelectAutocomplete={onSelectAutocomplete}
      // onSubmit={(searchTerm) => {
      //   navigate("/herb?q=" + searchTerm, { replace: true });
      // }}
      // onSelectAutocomplete={(selection, { }, defaultOnSelectAutocomplete) => {
      //   console.log(selection);
      //   if (selection.suggestion) {
      //     navigate("/herb?q=" + selection.suggestion, { replace: true });
      //   } else {
      //     defaultOnSelectAutocomplete(selection);
      //   }
      // }}
      />
    </>
  )
})
