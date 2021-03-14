import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import Definitions from '../../graphql/query/definitions.gql'

const DefinitionView = ({route}) => {
  useEffect(()=> {
  },[])
  const { loading, error, data } = useQuery(Definitions, {
    variables: { vocabularyId: parseInt(route.params.vocabularyId) }
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
