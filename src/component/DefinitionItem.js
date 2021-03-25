import React, { useState, useReducer } from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import AddDefinition from './AddDefinition'
import { useMutation } from '@apollo/client'
import {UpdateDefinition} from '../../graphql/mutation/updateDefinition.gql'
import {reducer} from '../reducer/exampleReducer'
import {Inner, globalStyles} from './Styled'
import Button from './Button'

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
    <TouchableWithoutFeedback onLongPress={() => console.log('long p')}>
      <Inner>
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
            <Button onPress={() => setEditable(!editable)} title={editable ? 'Cancel' : 'Edit'}/>
          }
      </Inner>
    </TouchableWithoutFeedback>
  )
}

const Definition = ({item}) => {
  return (
    <>
      <Text>{item.user.firstName} {item.user.lastName}</Text>
      <Text style={globalStyles.content} >{item.content}</Text>
      {item.examples.map(({content}) =>
        <Text style={globalStyles.content} >{content}</Text>
      )}
    </>
  )
}

export default DefinitionItem
