import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import List from '../component/List'

const Main = () => {
  return (
    <View style={styles.container}>
      <List />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

export default Main
