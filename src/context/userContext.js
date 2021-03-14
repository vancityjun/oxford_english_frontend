import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import CurrentUser from '../../graphql/query/currentUser.gql'

export const UserContext = createContext()

const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const { loading, error, data } = useQuery(CurrentUser, context)
  // temporary stupid solution because react native web not support any cookie neither AsyncStorage so far..
  const [context, setContext] = useState({
    context: {
      headers: {'Authorization': ''}
    }
  })

  useEffect(() => {
    if(!loading && data){
      setCurrentUser(data.currentUser)
    }
  },[loading, data])

  useEffect(()=> {
    setContext({
      context: {
        headers: {'Authorization': currentUser?.token}
      } 
    })
    console.log(context)
  },[currentUser])

  return (
    <UserContext.Provider
      value={{
        loading,
        currentUser,
        context,
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider
