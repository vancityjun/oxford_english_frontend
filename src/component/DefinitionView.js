import React, { useEffect, useContext, useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { useQuery } from '@apollo/client'
import Definitions from '../../graphql/query/definitions.gql'
import DefinitionItem from './DefinitionItem'
import AddDefinition from './AddDefinition'

const DefinitionView = ({vocabularyId, pos}) => {
  const [openField, setOpenField] = useState(false)
  useEffect(()=> {
  },[])
  const { loading, error, data } = useQuery(Definitions, {
    variables: { vocabularyId: vocabularyId }
  })

  if(loading) return <Text>loading</Text>
  if(error) return <Text>{error.message}</Text>

  return (
    <View>
      {data.definitions.edges.map(({node, cursor}) =>
        <DefinitionItem item={node} key={cursor} />
      )}
      <TouchableWithoutFeedback onPress={()=> setOpenField(!openField)}>
        <Text>Add Definitions</Text>
      </TouchableWithoutFeedback>
      {openField && <AddDefinition vocabularyId={vocabularyId} form={pos} />}
    </View>
  )
}

export default DefinitionView
