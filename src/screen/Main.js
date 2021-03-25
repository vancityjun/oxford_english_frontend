import React from 'react'
import { Page } from '../component/Styled'
import List from '../component/List'
import VocabularyProvider from '../context/vocabularyContext'

const Main = () => {
  return (
    <VocabularyProvider>
      <Page>
        <List />
      </Page>
    </VocabularyProvider>
  )
}

export default Main
