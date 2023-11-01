import React, { useEffect, useState } from 'react'
import api from '../middleware/api'

function IngredientDetail() {
  const [functionIngredient, setFunctionIngredient] = useState({})

  useEffect(() => {
    api.post(`/api/as/v1/engines/ingredients/search.json`, {
        query: 'Eleutheroside',
        "search_fields": {
          "functional_ingredient": {},
        }
      },
      'search-z5dqqm2ar4zmu4qdao6pwfkw').then((resp) => {
      resp.json().then((json) => {
        // console.log(json)
        setFunctionIngredient(json.results)
      })
    })
  }, [])
  return (
    <div>{JSON.stringify(functionIngredient)}</div>
  )
}

export default IngredientDetail