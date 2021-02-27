import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import Vocabularies from '../../graphql/query/vocabularies.gql'
import VocabularyItem from './VocabularyItem'
import Levels from './Levels'


const List = () => {
  const [levels, setLevels] = useState([])
  const [perPage, setPerPage] = useState(50)

  const { loading, error, data } = useQuery(Vocabularies, {
    variables: { first: perPage, levels: levels }
  })

  if (loading) return <Text>loading</Text>
  if (error) return  <Text>{error.message}</Text>

  return (
    <View>
      <Levels levels={levels} setLevels={setLevels}/>
      <FlatList
        data={data.vocabularies.nodes}
        renderItem={VocabularyItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}


export default List
