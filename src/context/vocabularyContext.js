import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Vocabularies from '../../graphql/query/vocabularies.gql'

export const VocabularyContext = createContext()

const VocabularyProvider = ({ children }) => {
  const [levels, setLevels] = useState([])
  const [order, setOrder] = useState(null) // null, level, time
  const [forms, setForms] = useState([]) // filter by forms -verb, noun
  const { loading, error, data } = useQuery(Vocabularies, {
    variables: { levels: levels }
  })
  const [perPage, setPerPage] = useState(20)
  const [OutputVocabularies, setOutputVocabularies] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState()
  const [viewOptions, setViewOptions] = useState([])

  useEffect(() => {
    if(!loading && data){
      const startIndex = (currentPage - 1) * perPage
      const lastIndex = currentPage * perPage
      const byPerPage = data.vocabularies.slice(startIndex, lastIndex)
      setOutputVocabularies(byPerPage)
    }
  },[perPage, loading, data, currentPage])

  useEffect(() => {
    if(!loading && data){
      const pages =  [...Array(Math.ceil(data.vocabularies.length / perPage))].map((item, index) => index)
      setPages(pages)
      setCurrentPage(1)
    }
  },[perPage, loading, data])

  useEffect(() => {
    if(!loading && data){
      const array =  [...Array(Math.ceil(data.vocabularies.length / 10))].map((item, index) => {
        const number = (index + 1) * 10
        return {label: number.toString(), value: number}
      })
      setViewOptions(array)
    }
  },[loading, data])

  const random = (items) => {
    return items[Math.floor(Math.random() * items.length) ]
  }

  return (
    <VocabularyContext.Provider 
      value={{
        OutputVocabularies,
        loading,
        error,
        pages,
        currentPage,
        perPage,
        viewOptions,
        setLevels,
        setPerPage,
        setOrder
      }}
    >
      {children}
    </VocabularyContext.Provider>
  )
}

export default VocabularyProvider
