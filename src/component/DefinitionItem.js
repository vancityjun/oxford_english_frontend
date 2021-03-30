import React, { useState, useReducer } from 'react'
import { Text } from 'react-native'
import AddDefinition from './AddDefinition'
import { useMutation } from '@apollo/client'
import {UpdateDefinition} from '../../graphql/mutation/updateDefinition.gql'
import {DeleteDefinition} from '../../graphql/mutation/deleteDefinition.gql'
import {reducer} from '../reducer/exampleReducer'
import {Inner, globalStyles, FlexWrap  } from './Styled'
import Button from './Button'
import TooltipMenu from './TooltipMenu'

const DefinitionItem = ({item, currentUser}) => {
  const [editable, setEditable] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [content, setContent] = useState(item.content)
  const [formVariable, setFormVariable] = useState(item.form)
  const [updateDefinition] = useMutation(UpdateDefinition)
  const [deleteDefinition] = useMutation(DeleteDefinition)
  const initialState = item.examples.map(({content, id}) => ({content: content, id: id}))
  const [examples, dispatch] = useReducer(reducer, initialState)

  const submit = () => {
    const input = {
      id: item.id,
      definitionAttributes: {
        content: content,
        form: formVariable,
        examples: examples
      }
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
            <FlexWrap justifyContent="space-between">
            <Button onPress={() => setOpenMenu(!openMenu)} title='...'/>
            </FlexWrap>
          )
        ]}
        {openMenu && 
          <TooltipMenu menu={[
            {title: 'Edit', onPress: () => {
              setEditable(true)
              setOpenMenu(false)
            }},
            {title: 'Delete', onPress: () => {
              setOpenMenu(false)
              deleteDefinition({variables: {input: {id: item.id}}})
            }},
          ]} />
        }
    </Inner>
  )
}

const Definition = ({item}) => {
  return (
    <>
      <Text>{item.user.fullName}</Text>
      <Text style={globalStyles.content} >{item.content}</Text>
      {item.examples.map(({content, id}) =>
        <Text style={globalStyles.content} key={id} >{content}</Text>
      )}
    </>
  )
}

export default DefinitionItem
