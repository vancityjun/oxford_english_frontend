import React from 'react'
import { Inner, globalStyles, TextSmall, FlexWrap } from './Styled'
import Button from './Button'
import styled from 'styled-components/native'
import RNPickerSelect from 'react-native-picker-select'
import TextInputWithTitle from './TextInputWithTitle'

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
  {label: 'article', value: 'article'}
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
    <>
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
      </Inner>
      <Inner>
        <TextInputWithTitle
          onChangeText={value => definitionAttributesDispatch({target: {content: value}})}
          value={content}
          multiline
          numberOfLines={4}
          maxLength={100}
          style={globalStyles.content}
          title='Definition'
          autoFocus
        />
      </Inner>
      <Inner>
        <Flex>
          <TextSmall>Examples</TextSmall>
          <Button onPress={() => examplesDispatch({type: 'add'})} title='+' />
        </Flex>
        {examples?.map((example, index) =>
          !example._destroy &&
          <Flex>
            <TextInputWithTitle
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
      </Inner>
      <Inner>
        <Flex>
          <Button onPress={()=> cancel()} title='Cancel' width={120} />
          <Button onPress={() => submit()} title='Submit' active width={120} disabled={!content} />
        </Flex>
      </Inner>
    </>
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

export default AddDefinition
