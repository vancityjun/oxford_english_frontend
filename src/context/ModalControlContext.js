import React, { createContext, useState } from 'react'

export const ModalControlContext = createContext()

const ModalControlProvider = ({children}) => {
  const [openModal, setOpenModal] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [action, setAction] = useState()
  const [onChange, setOnChange] = useState()
  const [input, setInput] = useState({})

  return (
    <ModalControlContext.Provider
      value={{
        openModal,
        setOpenModal,
        alertMessage,
        setAlertMessage,
        action,
        setAction,
        input,
        setInput,
        onChange,
        setOnChange
      }}
    >
      {children}
    </ModalControlContext.Provider>
  )
}

export default ModalControlProvider
