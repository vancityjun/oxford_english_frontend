import React, {useState, useContext, useEffect} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import {VocabularyContext} from '../context/vocabularyContext'
import VocabularyItem from './VocabularyItem'
import Levels from './Levels'
import TopInterface from './list/TopInterface'
import {FlexWrap} from './Styled'

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
    loading,
    error,
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
          <TouchableOpacity onPress={() => setBefore(startCursor)}>
            <Text>Prev</Text>
          </TouchableOpacity>
        }
        {hasNextPage &&
          <TouchableOpacity onPress={() => setAfter(endCursor)}>
            <Text>Next</Text>
          </TouchableOpacity>
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
