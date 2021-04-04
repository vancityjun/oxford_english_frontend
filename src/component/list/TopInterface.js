import React, { useContext } from 'react'
import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import {VocabularyContext} from '../../context/vocabularyContext'
import {Row, TextSmall} from '../Styled'


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
      <TextSmall>Showing</TextSmall>
      {viewOptions.length > 0 &&
        <View>
          <RNPickerSelect
            onValueChange={(value) => value ? setPerPage(+value) : null}
            items={viewOptions}
            value={perPage}
            placeholder={{}}
          />
        </View>
      }
      <TextSmall>Order</TextSmall>
      <View>
        <RNPickerSelect
          onValueChange={(value) => value ? setOrder(value) : null}
          items={orderOptions}
          value='unset'
          placeholder={{}}
        />
      </View>
    </Row>
  )
}

export default TopInterface;
