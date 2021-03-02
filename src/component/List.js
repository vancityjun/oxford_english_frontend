import React, {useState, useContext, useEffect} from 'react'
import { View, Text, FlatList, StyleSheet, Picker } from 'react-native'
import {VocabularyContext} from '../context/vocabularyContext'
import VocabularyItem from './VocabularyItem'
import Levels from './Levels'
import Pagination from './Pagination'
import {Button, TextMedium, FlexWrap} from './Styled'
import TopInterface from './list/TopInterface'


const List = () => {
  const {
    OutputVocabularies,
    loading,
    error,
    pages,
    currentPage,
    setCurrentPage
  } = useContext(VocabularyContext)

  if (loading) return <Text>loading</Text>
  if (error) return  <Text>{error.message}</Text>

  return (
    <View style={styles.container}>
      <TopInterface />
      <Levels/>
      <FlatList
        data={OutputVocabularies}
        renderItem={VocabularyItem}
        keyExtractor={(item) => item.cursor}
      />
      <Pagination 
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
