import React, { createContext, useState } from 'react'

export const ModalControlContext = createContext()

const ModalControlProvider = ({children}) => {
  const [alertMessage, setAlertMessage] = useState('')
  const [action, setAction] = useState()
  const [inputTitle, setInputTitle] = useState('')

  return (
    <ModalControlContext.Provider
      value={{
        alertMessage,
        setAlertMessage,
        action,
        setAction,
        inputTitle,
        setInputTitle
      }}
    >
      {children}
    </ModalControlContext.Provider>
  )
}

export default ModalControlProvider
