import React, {useContext} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import {VocabularyContext} from '../context/vocabularyContext'
import VocabularyItem from './VocabularyItem'
import Levels from './Levels'
import TopInterface from './list/TopInterface'
import {FlexWrap} from './Styled'
import Button from './Button'

const List = () => {
  const {
    vocabularies: {
      edges,
      pageInfo: {
        hasPreviousPage,
        hasNextPage,
        startCursor,
        endCursor
      } = {}
    } = {},
    setAfter,
    setBefore
  } = useContext(VocabularyContext)

  return (
    <View style={styles.container}>
      <TopInterface />
      <Levels/>
      <FlatList
        data={edges}
        renderItem={({item}) => <VocabularyItem item={item.node} />}
        keyExtractor={item => item.cursor}
      />
      <FlexWrap>
        {hasPreviousPage &&
          <Button onPress={() => setBefore(startCursor)} title="<"/>
        }
        {hasNextPage &&
          <Button onPress={() => setAfter(endCursor)} title=">"/>
        }
      </FlexWrap>
    </View>
  )
}

// todo: remove and improve
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 20
  }
})

export default List
