import React, { useState, useReducer, useContext } from 'react'
import AddDefinition from './AddDefinition'
import { useMutation } from '@apollo/client'
import {UpdateDefinition} from '../../graphql/mutation/updateDefinition.gql'
import {DeleteDefinition} from '../../graphql/mutation/deleteDefinition.gql'
import {exampleReducer} from '../reducer/exampleReducer'
import { Inner, globalStyles, FlexWrap, TextSmall } from './Styled'
import TooltipButton from './TooltipButton'
import {ModalControlContext} from '../context/ModalControlContext'
import {reducer} from '../reducer/formReducer'
import styled from 'styled-components/native'

const DefinitionItem = ({item, currentUser}) => {
  const [editable, setEditable] = useState(false)
  const [updateDefinition] = useMutation(UpdateDefinition)
  const [deleteDefinition] = useMutation(DeleteDefinition)
  const [definitionAttributes, definitionAttributesDispatch] = useReducer(reducer, {
    content: item.content,
    form: item.form,
    languageCode: item.languageCode
  })
  const initialState = item.examples.map(({content, id}) => ({content: content, id: id}))
  const [examples, examplesDispatch] = useReducer(exampleReducer, initialState)
  const {setAlertMessage, setAction} = useContext(ModalControlContext)

  const submit = () => {
    const input = {
      id: item.id,
      definitionAttributes: definitionAttributes,
      examples: examples
    }
    updateDefinition({variables: {input: input}})
    setEditable(false)
  }

  const action = () => {
    deleteDefinition({variables: {input: {id: item.id}}})
  }

  return (
    <Wrap>
        {editable ?
          <AddDefinition
            submit={submit}
            definitionAttributes={definitionAttributes}
            examples={examples}
            examplesDispatch={examplesDispatch}
            definitionAttributesDispatch={definitionAttributesDispatch}
            cancel={() => setEditable(false)}
          />
        : [
          <Definition item={item} />,
          (item.user.id === currentUser?.id &&
            <FlexWrap justifyContent="space-between">
              <TooltipButton menu={[
                {title: 'Edit', onPress: () => {
                  setEditable(true)
                }},
                {title: 'Delete', onPress: () => {
                  setAlertMessage('Are you sure you want to delete?')
                  setAction(() => action)
                }},
              ]} />
            </FlexWrap>
          )
        ]}
    </Wrap>
  )
}

const Definition = ({item}) => {
  return (
    <>
      <TextSmall>{item.user.fullName}</TextSmall>
      <TextSmall style={globalStyles.content} >{item.content}</TextSmall>
      {item.examples.map(({content, id}) =>
        <TextSmall style={globalStyles.content} key={id} >{content}</TextSmall>
      )}
    </>
  )
}

const Wrap = styled(Inner)`
  z-index: 1
`

export default DefinitionItem
