import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import CurrentUser from '../../graphql/query/currentUser.gql'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    setCookie()
  },[currentUser])

  const setCookie = async () => {
    const value = `token=${currentUser?.token || ''}`
    await AsyncStorage.setItem('@token', value)
  }

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
