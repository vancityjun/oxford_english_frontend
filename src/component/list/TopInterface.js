import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import {VocabularyContext} from '../../context/vocabularyContext'

const TopInterface = () => {
  const {
    perPage,
    setPerPage,
    OutputVocabularies,
    viewOptions,
    setOrder
  } = useContext(VocabularyContext)

  const orderOptions = [
    {label: 'unset', value: 'unset'},
    {label: 'level', value: 'level'},
    {label: 'time', value: 'time'},
  ]

  return (
    <View>
      <Text>Showing</Text>
      {viewOptions.length ? 
        <RNPickerSelect
          onValueChange={(value) => value ? setPerPage(value) : null}
          items={viewOptions}
          value={perPage}
        />
      : null}
      <Text>Order</Text>
      <RNPickerSelect
        onValueChange={(value) => value ? setOrder(value) : null}
        items={orderOptions}
        value='unset'
      />
    </View>
  );
};

export default TopInterface;
