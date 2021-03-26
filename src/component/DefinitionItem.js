import React, { useState, useReducer } from 'react'
import { Text } from 'react-native'
import AddDefinition from './AddDefinition'
import { useMutation } from '@apollo/client'
import {UpdateDefinition} from '../../graphql/mutation/updateDefinition.gql'
import {reducer} from '../reducer/exampleReducer'
import {Inner, globalStyles} from './Styled'
import Button from './Button'
import TooltipMenu from './TooltipMenu'

const DefinitionItem = ({item, currentUser}) => {
  const [editable, setEditable] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
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
    <Inner>
        {editable ? [
          <AddDefinition
            submit={submit}
            content={content}
            setContent={setContent}
            examples={examples}
            dispatch={dispatch}
          />,
          <Button onPress={() => setEditable(false)} title='Cancel' />
        ] : [
        <Definition item={item} />,
        (item.user.id === currentUser?.id &&
           <Button onPress={() => setOpenMenu(!openMenu)} title='...'/>)
        ]}
        {openMenu && 
          <TooltipMenu menu={[
            {title: 'Edit', onPress: () => {
              setEditable(true)
              setOpenMenu(false)
            }},
            {title: 'Delete', onPress: () => {
              setOpenMenu(false)
            }},
          ]} />
        }
    </Inner>
  )
}

const Definition = ({item}) => {
  return (
    <>
      <Text>{item.user.firstName} {item.user.lastName}</Text>
      <Text style={globalStyles.content} >{item.content}</Text>
      {item.examples.map(({content, id}) =>
        <Text style={globalStyles.content} key={id} >{content}</Text>
      )}
    </>
  )
}

export default DefinitionItem
