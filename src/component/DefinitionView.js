import React, { useReducer, useContext, useState } from 'react'
import { Text } from 'react-native'
import { useQuery } from '@apollo/client'
import Definitions from '../../graphql/query/definitions.gql'
import DefinitionItem from './DefinitionItem'
import AddDefinition from './AddDefinition'
import {UserContext} from '../context/userContext'
import { useMutation } from '@apollo/client'
import {CreateDefinition} from '../../graphql/mutation/createDefinition.gql'
import {reducer} from '../reducer/exampleReducer'
import {Row} from './Styled'
import Button from './Button'

const DefinitionView = ({vocabularyId, pos}) => {
  const [openField, setOpenField] = useState(false)
  const {currentUser} = useContext(UserContext)

  const [content, setContent] = useState('')
  const [formVariable, setFormVariable] = useState(pos)
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
      {currentUser &&
        <Button onPress={()=> setOpenField(!openField)} title={openField ? 'Cancel' : 'Add Definitions'} />
      }
      {openField &&
        <AddDefinition 
          submit={submit}
          content={content}
          setContent={setContent}
          examples={examples}
          dispatch={dispatch}
        />
      }
    </Row>
  )
}

export default DefinitionView
