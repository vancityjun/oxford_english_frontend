import React, {useContext} from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import {VocabularyContext} from '../context/vocabularyContext'
import VocabularyItem from './VocabularyItem'
import Levels from './Levels'
import TopInterface from './list/TopInterface'
import {FlexWrap, TextSmall} from './Styled'
import Button from './Button'

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
    page
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
      <FlexWrap justifyContent='space-evenly'>
        <Button onPress={() => previous()} title="<" disabled={!hasPreviousPage} />
        <TextSmall>{page}</TextSmall>
        <Button onPress={() => next()} title=">" disabled={!hasNextPage}/>
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
