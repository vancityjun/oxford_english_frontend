import React from 'react'
import UserProvider from './userContext'
import VocabularyProvider from './vocabularyContext'
import ModalControlProvider from './ModalControlContext'

const ContextProviders = ({children}) => {
  return (
    <UserProvider>
      <ModalControlProvider>
        <VocabularyProvider>
          {children}
        </VocabularyProvider>
      </ModalControlProvider>
    </UserProvider>
  )
}

export default ContextProviders
