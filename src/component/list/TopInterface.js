import React, { useContext } from 'react'
import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import {VocabularyContext} from '../../context/vocabularyContext'
import {Row, TextSmall} from '../Styled'
import Button from '../Button'
import {UserContext} from '../../context/userContext'


const TopInterface = () => {
  const {
    perPage,
    setPerPage,
    viewOptions,
    setOrder,
    hasNote,
    setHasNote
  } = useContext(VocabularyContext)
  const {currentUser} = useContext(UserContext)

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
      {currentUser && 
        <Button 
          onPress={() => setHasNote(!hasNote)}
          outline={true} title='Show only studied'
          active={hasNote}
          width={44}
          background={false}
          height='auto'
        />
      }
    </Row>
  )
}

export default TopInterface;
