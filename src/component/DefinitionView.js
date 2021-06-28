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
import * as WebBrowser from 'expo-web-browser'
import { useNavigation } from '@react-navigation/native'

const DefinitionView = ({vocabulary}) => {
  const navigation = useNavigation()
  const [openField, setOpenField] = useState(false)
  const {currentUser} = useContext(UserContext)
  const [createDefinition, { data }] = useMutation(CreateDefinition)
  const [examples, examplesDispatch] = useReducer(exampleReducer, [])
  const [definitionAttributes, definitionAttributesDispatch] = useReducer(reducer, {
    content: '',
    form: vocabulary.pos,
    languageCode: 'en'
  })

  const submit = () => {
    const input = {
      vocabularyId: +vocabulary.id,
      definitionAttributes: definitionAttributes,
      examples: examples
    }
    createDefinition({variables: {input: input}})
    setOpenField(false)
  }

  // dev & testing
  const openLink = () => {
    (currentUser && !definitions) && setOpenField(true)
    WebBrowser.openBrowserAsync(`https://www.oxfordlearnersdictionaries.com${vocabulary.link}`)
  }

  const variables = {variables: { vocabularyId: +vocabulary.id }}
  const fetchDefinitions = {query: Definitions, ...variables}

  const { loading, error, data: {definitions} = {} } = useQuery(Definitions, variables)

  if(loading) return <Text>loading</Text>
  if(error) return <Text>{error.message}</Text>

  return (
    <Row>
      {data &&
        <DefinitionItem
          item={data.createDefinition.definition}
          currentUser={currentUser}
          refetchDefinitions={fetchDefinitions}
        />
      }
      {definitions.edges.map(({node, cursor}) =>
        <DefinitionItem
          item={node}
          key={cursor}
          currentUser={currentUser}
          refetchDefinitions={fetchDefinitions}
        />
      )}
      {/* dev & testing */}
      <Button onPress={()=> openLink()} title='Open Dictionary' />
      {currentUser.admin &&
        <Button
          onPress={() => navigation.navigate('AddVocab', {item: vocabulary })}
          title='Edit Vocabulary'
        />
      }
      {openField ?
        <AddDefinition 
          submit={submit}
          definitionAttributes={definitionAttributes}
          definitionAttributesDispatch={definitionAttributesDispatch}
          examplesDispatch={examplesDispatch}
          examples={examples}
          cancel={()=> setOpenField(false)}
        /> :
        // (currentUser && <Button onPress={()=> setOpenField(true)} title='Add Definitions' />)
        // will decide whether enable this or keep external oxford dictionary later for production
        null
      }
    </Row>
  )
}

export default DefinitionView
