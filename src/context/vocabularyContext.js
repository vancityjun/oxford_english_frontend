import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Vocabularies from '../../graphql/query/vocabularies.gql'

export const VocabularyContext = createContext()

const VocabularyProvider = ({ children }) => {
  const [levels, setLevels] = useState([])
  const [order, setOrder] = useState(null) // order by null, 'level', note 'updatedAt'
  const [perPage, setPerPage] = useState(20)
  const [before, setBefore] = useState(null)
  const [after, setAfter] = useState(null)
  const [viewOptions, setViewOptions] = useState([])
  const [page, setPage] = useState(1)

  const { loading, error, data: {vocabularies} = {} } = useQuery(Vocabularies, {
    variables: {
      first: perPage,
      last: perPage,
      levels: levels,
      after: after,
      before: before
    }
  })

  useEffect(() => {
    if(!loading && vocabularies){
      const {totalCount} = vocabularies
      const totalCut = totalCount <= 200 ? totalCount : 200
      const array = [...Array(Math.ceil(totalCut / 10))].map((item, index) => {
        const number = (index + 1) * 10
        return {label: number.toString(), value: number}
      })
      setViewOptions(array)
    }
  },[loading, vocabularies])

  const random = (items) => {
    return items[Math.floor(Math.random() * items.length) ]
  }

  const previous = () => {
    setPage(page - 1)
    setBefore(vocabularies.pageInfo.startCursor)
    setAfter(null)
  }

  const next = () => {
    setPage(page + 1)
    setAfter(vocabularies.pageInfo.endCursor)
    setBefore(null)
  }

  return (
    <VocabularyContext.Provider 
      value={{
        vocabularies,
        loading,
        error,
        perPage,
        viewOptions,
        levels,
        page,
        setLevels,
        setPerPage,
        setOrder,
        previous,
        next
      }}
    >
      {children}
    </VocabularyContext.Provider>
  )
}

export default VocabularyProvider
