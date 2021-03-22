import React, { useState, useReducer } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AddDefinition from './AddDefinition'
import { useMutation } from '@apollo/client'
import {UpdateDefinition} from '../../graphql/mutation/updateDefinition.gql'
import {reducer} from '../reducer/exampleReducer'


const DefinitionItem = ({item, currentUser}) => {
  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(item.content)
  const [formVariable, setFormVariable] = useState(item.form)
  const [updateDefinition] = useMutation(UpdateDefinition)
  const initialState = item.examples.map(({content, id}) => ({content: content, id: id}))
  const [examples, dispatch] = useReducer(reducer, initialState)

  const submit = () => {
    const input = {
      id: item.id,
      content: content,
      form: formVariable,
      examples: examples
    }
    updateDefinition({variables: {input: input}})
    setEditable(false)
  }

  return (
    <View>
      {editable ?
        <AddDefinition
          submit={submit}
          content={content}
          setContent={setContent}
          examples={examples}
          dispatch={dispatch}
        />
      :
        <Definition item={item} />
      }
      {item.user.id === currentUser?.id &&
        <TouchableOpacity onPress={() => setEditable(!editable)}>
          <Text>{editable ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const Definition = ({item}) => {
  return (
    <>
      <Text>{item.user.firstName} {item.user.lastName}</Text>
      <Text>{item.content}</Text>
      {item.examples.map(({content}) =>
        <Text>{content}</Text>
      )}
    </>
  )
}

export default DefinitionItem
