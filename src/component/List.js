import React, {useContext} from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import {VocabularyContext} from '../context/vocabularyContext'
import VocabularyItem from './VocabularyItem'
import Levels from './Levels'
import TopInterface from './list/TopInterface'
import {FlexWrap} from './Styled'
import Button from './Button'
import SearchField from './list/SearchFIeld'

const List = () => {
  const {
    vocabularies: {
      edges,
      pageInfo: {
        hasPreviousPage,
        hasNextPage
      } = {}
    } = {},
    previous,
    next,
  } = useContext(VocabularyContext)

  return (
    <View style={styles.container}>
      <SearchField/>
      <TopInterface />
      <Levels/>
      <FlatList
        data={edges}
        renderItem={({item}) => <VocabularyItem item={item.node} />}
        keyExtractor={item => item.cursor}
      />
      <FlexWrap justifyContent='space-evenly'>
        <Button onPress={() => previous()} title="<" disabled={!hasPreviousPage} />
        <Button onPress={() => next()} title=">" disabled={!hasNextPage}/>
      </FlexWrap>
    </View>
  )
}

// todo: remove and improve
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 20,
  }
})

export default List
