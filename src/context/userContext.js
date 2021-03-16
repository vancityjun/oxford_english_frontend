import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import CurrentUser from '../../graphql/query/currentUser.gql'

export const UserContext = createContext()

const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const { loading, error, data } = useQuery(CurrentUser)

  useEffect(() => {
    if(!loading && data){
      setCurrentUser(data.currentUser)
    }
  },[loading, data])

  useEffect(()=> {
    document.cookie = `token=${currentUser?.token || ''}`
  },[currentUser])

  return (
    <UserContext.Provider
      value={{
        loading,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider
