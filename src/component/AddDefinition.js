import React, { useState, useReducer } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useMutation } from '@apollo/client'
import {CreateDefinition} from '../../graphql/mutation/createDefinition.gql'
import {reducer} from '../reducer/exampleReducer'

const AddDefinition = ({vocabularyId, form, setOpenField}) => {
  const [content, setContent] = useState('')
  const [formVariable, setFormVariable] = useState(form)
  const [createDefinition, { data }] = useMutation(CreateDefinition)
  const [examples, dispatch] = useReducer(reducer, [])

  const submit = () => {
    const input = {
      vocabularyId: vocabularyId,
      content: content,
      form: formVariable,
      examples: examples
    }
    createDefinition({variables: {input: input}})
    setOpenField(false)
  }

  return (
    <View>
      <Text>definition</Text>
      <TextInput
        onChangeText={value => setContent(value)}
        value={content}
        multiline={true}
      />
      <View>
        <Text>examples</Text>
        <TouchableOpacity onPress={() => dispatch({type: 'add'})}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      {examples?.map((example, index)=>
        <>
          <TextInput
            onChangeText={value => dispatch({index: index, value: value})}
            value={example}
            multiline={true}
            key={index}
          />
          <TouchableOpacity onPress={() => dispatch({type: 'remove', index: index})}>
            <Text>-</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => submit()}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDefinition
