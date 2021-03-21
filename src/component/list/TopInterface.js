import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import {VocabularyContext} from '../../context/vocabularyContext'
import {Row} from '../Styled'
import styled from 'styled-components/native'


const TopInterface = () => {
  const {
    perPage,
    setPerPage,
    viewOptions,
    setOrder
  } = useContext(VocabularyContext)

  const orderOptions = [
    {label: 'unset', value: 'unset'},
    {label: 'level', value: 'level'},
    {label: 'time', value: 'updated_at'},
  ]

  return (
    <Row>
      <Text>Showing</Text>
      {viewOptions.length &&
        <SelectWrap>
          <RNPickerSelect
            onValueChange={(value) => value ? setPerPage(parseInt(value)) : null}
            items={viewOptions}
            value={perPage}
            placeholder={{}}
          />
        </SelectWrap>
      }
      <Text>Order</Text>
      <SelectWrap>
        <RNPickerSelect
          onValueChange={(value) => value ? setOrder(value) : null}
          items={orderOptions}
          value='unset'
          placeholder={{}}
        />
      </SelectWrap>
    </Row>
  )
}

const SelectWrap = styled.View`
  width: auto
`

export default TopInterface;
