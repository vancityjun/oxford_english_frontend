import React, { useReducer, useState } from 'react'
import { Page } from '../component/Styled'
import AddDefinition from '../component/AddDefinition'
import { useMutation } from '@apollo/client'
import { exampleReducer } from '../reducer/exampleReducer'
import reducer from '../reducer/formReducer'
import TextInputWithTitle from '../component/TextInputWithTitle'
import AddVocabulary from '../../graphql/mutation/addVocabulary.gql'
import RNPickerSelect from 'react-native-picker-select'
import Button from '../component/Button'
import posOptions from '../others/pos'
import {FlexWrap} from '../component/Styled'
import styled from 'styled-components/native'

const AddVocab = ({navigation}) => {
  const [word, setWord] = useState('')
  const [pos, setPos] = useState('')
  const [celpip, setCelpip] = useState(true)
  const [addVocabulary, { data }] = useMutation(AddVocabulary)
  const [examples, examplesDispatch] = useReducer(exampleReducer, [])
  const [definitionAttributes, definitionAttributesDispatch] = useReducer(reducer, {
    content: '',
    form: '',
    languageCode: 'en'
  })

  const submit = () => {
    const input = {
      word: word,
      pos: pos,
      celpip: celpip,
      definitionAttributes: definitionAttributes,
      examples: examples
    }
    addVocabulary({variables: {input: input}})
  }

  return (
    <Wrap>
      <TextInputWithTitle
        title="name"
        onChangeText={value => setWord(value)}
        value={word}
        maxLength={30}
      />
      <FlexWrap justifyContent='space-between'>
        <RNPickerSelect
          onValueChange={(value) => setPos(value)}
          items={posOptions}
          value={pos}
          placeholder={{label: 'part of speech'}}
        />
        <Button
          onPress={() => setCelpip(!celpip)}
          active={celpip}
          outline={true}
          title='celpip'
          background={false}
          height='auto'
        />
      </FlexWrap>
      <AddDefinition
        submit={submit}
        definitionAttributes={definitionAttributes}
        definitionAttributesDispatch={definitionAttributesDispatch}
        examplesDispatch={examplesDispatch}
        examples={examples}
        cancel={()=> navigation.goBack()}
      />
    </Wrap>
  )
}
const Wrap = styled(Page)`
  padding: 20px
`

export default AddVocab
