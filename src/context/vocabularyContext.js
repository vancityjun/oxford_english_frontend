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
  const [first, setFirst] = useState(perPage)
  const [last, setLast] = useState(perPage)
  const [hasNote, setHasNote] = useState(false)

  const { loading, error, data: {vocabularies} = {} } = useQuery(Vocabularies, {
    variables: {
      first: first,
      last: last,
      levels: levels,
      after: after,
      before: before,
      hasNote: hasNote
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

  const previous = () => {
    setBefore(vocabularies.pageInfo.startCursor)
    setAfter(null)
    setFirst(null)
    setLast(perPage)
  }

  const next = () => {
    setAfter(vocabularies.pageInfo.endCursor)
    setBefore(null)
    setLast(null)
    setFirst(perPage)
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
        hasNote,
        setLevels,
        setPerPage,
        setOrder,
        previous,
        next,
        setHasNote
      }}
    >
      {children}
    </VocabularyContext.Provider>
  )
}

export default VocabularyProvider
