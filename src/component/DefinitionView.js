import React, { useReducer, useContext, useState } from 'react'
import { Text } from 'react-native'
import { useQuery } from '@apollo/client'
import Definitions from '../../graphql/query/definitions.gql'
import DefinitionItem from './DefinitionItem'
import AddDefinition from './AddDefinition'
import { UserContext } from '../context/userContext'
import { useMutation } from '@apollo/client'
import { CreateDefinition } from '../../graphql/mutation/createDefinition.gql'
import { exampleReducer } from '../reducer/exampleReducer'
import reducer from '../reducer/formReducer'
import { Row } from './Styled'
import Button from './Button'

const DefinitionView = ({vocabularyId, pos}) => {
  const [openField, setOpenField] = useState(false)
  const {currentUser} = useContext(UserContext)
  const [createDefinition, { data }] = useMutation(CreateDefinition)
  const [examples, examplesDispatch] = useReducer(exampleReducer, [])
  const [definitionAttributes, definitionAttributesDispatch] = useReducer(reducer, {
    content: '',
    form: pos,
    languageCode: 'en'
  })

  const submit = () => {
    const input = {
      vocabularyId: vocabularyId,
      definitionAttributes: definitionAttributes,
      examples: examples
    }
    createDefinition({variables: {input: input}})
    setOpenField(false)
  }

  const { loading, error, data: {definitions} = {} } = useQuery(Definitions, {
    variables: { vocabularyId: vocabularyId }
  })

  if(loading) return <Text>loading</Text>
  if(error) return <Text>{error.message}</Text>

  return (
    <Row>
      {data &&
        <DefinitionItem item={data.createDefinition.definition} currentUser={currentUser} />
      }
      {definitions.edges.map(({node, cursor}) =>
        <DefinitionItem item={node} key={cursor} currentUser={currentUser} />
      )}
      {openField ?
        <AddDefinition 
          submit={submit}
          definitionAttributes={definitionAttributes}
          definitionAttributesDispatch={definitionAttributesDispatch}
          examplesDispatch={examplesDispatch}
          examples={examples}
          cancel={()=> setOpenField(false)}
        /> :
        (currentUser && <Button onPress={()=> setOpenField(true)} title='Add Definitions' />)
      }
    </Row>
  )
}

export default DefinitionView
