import React from 'react'
import { View, TextInput } from 'react-native'
import {Inner, globalStyles, TextSmall, FlexWrap} from './Styled'
import Button from './Button'
import styled from 'styled-components/native'
import RNPickerSelect from 'react-native-picker-select'

const languageCodes = [
  {label: 'English', value: 'en'},
  {label: 'Korean', value: 'kr'},
  {label: 'Japanese', value: 'jp'}
]

const forms = [
  {label: 'noun', value: 'noun'},
  {label: 'verb', value: 'verb'},
  {label: 'adjective', value: 'adjective'},
  {label: 'adverb', value: 'adverb'},
  {label: 'preposition', value: 'preposition'},
  {label: 'indefinite article', value: 'indefinite article'}
]

const AddDefinition = ({
  submit,
  examples,
  definitionAttributes: {
    content,
    form,
    languageCode
  },
  definitionAttributesDispatch,
  examplesDispatch,
  cancel
}) => {
  return (
    <Inner>
      <FlexWrap>
        <TextSmall>Form:</TextSmall>
        <RNPickerSelect
          onValueChange={(value) => value ? definitionAttributesDispatch({target: {form: value}}) : null}
          items={forms}
          value={form}
          placeholder={{}}
        />
        <TextSmall>language:</TextSmall>
        <RNPickerSelect
          onValueChange={(value) => value ? definitionAttributesDispatch({target: {languageCodes: value}}) : null}
          items={languageCodes}
          value={languageCode}
          placeholder={{}}
        />
      </FlexWrap>
      <TextSmall>Definition</TextSmall>
      <TextInput
        onChangeText={value => definitionAttributesDispatch({target: {content: value}})}
        value={content}
        multiline
        numberOfLines={4}
        maxLength={100}
        style={globalStyles.content}
      />
      <Flex>
        <TextSmall>Examples</TextSmall>
        <Button onPress={() => examplesDispatch({type: 'add'})} title='+' />
      </Flex>
      {examples?.map((example, index) =>
        !example._destroy &&
        <Flex>
          
          <TextField
            onChangeText={value => examplesDispatch({index: index, value: value})}
            value={example.content}
            multiline
            numberOfLines={4}
            maxLength={100}
            key={index}
            style={globalStyles.content}
          />
          <Button onPress={() => examplesDispatch({type: 'remove', index: index})} title='-' />
        </Flex>
      )}
      <Flex>
        <Button onPress={()=> cancel()} title='Cancel' width={120} />
        <Button onPress={() => submit()} title='Submit' active width={120} disabled={!content} />
      </Flex>
    </Inner>
  )
}

const Flex = styled.View`
  display: flex
  flex-flow: row
  justify-content: space-between
  align-items: center
  width: 100%
  position: relative
`
const ButtonRight = styled.View`
  position: absolute
  right: -20px
`

const TextField = styled.TextInput`
  width: 100%
  margin-right: 10px
`

export default AddDefinition
