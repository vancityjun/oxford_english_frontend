import React, {useState} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import Vocabularies from '../graphql/query/vocabularies.gql'
import VocabularyItem from '../component/VocabularyItem'

const Main = () => {
  const [level, setLevel] = useState(null)
  const { loading, error, data } = useQuery(Vocabularies, {
    variables: { first: 10, level: level }
  })

  if (loading) return 'loading'
  if (error) console.error(error.message)
  if (!loading && !error) console.log(data.vocabularies)

  return (
    <View style={styles.container}>
      <FlatList
        data={data.vocabularies.nodes}
        renderItem={VocabularyItem}
        key={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
})

export default Main
