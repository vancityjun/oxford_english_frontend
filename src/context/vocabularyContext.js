import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Vocabularies from '../../graphql/query/vocabularies.gql'

export const VocabularyContext = createContext()

const VocabularyProvider = ({ children }) => {
  const [levels, setLevels] = useState([])
  const { loading, error, data } = useQuery(Vocabularies, {
    variables: { levels: levels }
  })
  const [perPage, setPerPage] = useState(20)
  const [OutputVocabularies, setOutputVocabularies] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState()

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

  return (
    <VocabularyContext.Provider 
      value={{
        OutputVocabularies,
        loading,
        error,
        pages,
        currentPage,
        setLevels,
        setPerPage,
        setCurrentPage
      }}
    >
      {children}
    </VocabularyContext.Provider>
  )
}

export default VocabularyProvider
