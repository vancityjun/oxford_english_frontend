import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import Definitions from '../../graphql/query/definitions.gql'
import {UserContext} from '../context/userContext'

const DefinitionView = ({route}) => {
  const {context} = useContext(UserContext)
  useEffect(()=> {
  },[])
  const { loading, error, data } = useQuery(Definitions, {
    variables: { vocabularyId: parseInt(route.params.vocabularyId) },
    ...context
  })

  if(loading) return <Text>loading</Text>
  if(error) return <Text>{error.message}</Text>

  return (
    <View>
      {data.definitions.edges.map(({node, cursor}) =>
        <Text key={cursor}>{node.content}</Text>
      )}
    </View>
  )
}

export default DefinitionView
