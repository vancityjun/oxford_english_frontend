import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import List from '../component/List'
import VocabularyProvider from '../context/vocabularyContext'

const Main = () => {
  return (
    <VocabularyProvider>
      <View style={styles.container}>
        <List />
      </View>
    </VocabularyProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
})

export default Main
