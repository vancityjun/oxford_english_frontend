import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Vocabularies from '../../graphql/query/vocabularies.gql'

export const VocabularyContext = createContext()

const VocabularyProvider = ({ children }) => {
  const [levels, setLevels] = useState([])
  const [order, setOrder] = useState(null) // order by null, 'level', note 'updatedAt'
  const [forms, setForms] = useState([]) // filter by forms -verb, noun
  const [perPage, setPerPage] = useState(20)
  const [after, setAfter] = useState(null)
  const [before, setBefore] = useState(null)
  const [viewOptions, setViewOptions] = useState([])

  const { loading, error, data: {vocabularies} = {} } = useQuery(Vocabularies, {
    variables: {first: perPage, levels: levels, after: after, before: before}
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

  return (
    <VocabularyContext.Provider 
      value={{
        vocabularies,
        loading,
        error,
        perPage,
        viewOptions,
        setLevels,
        setPerPage,
        setOrder,
        setForms,
        setAfter,
        setBefore
      }}
    >
      {children}
    </VocabularyContext.Provider>
  )
}

export default VocabularyProvider
