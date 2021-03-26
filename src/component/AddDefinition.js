import React from 'react'
import { View, Text, TextInput } from 'react-native'
import {Inner, globalStyles} from './Styled'
import Button from './Button'

const AddDefinition = ({submit, examples, content, setContent, dispatch}) => {
  return (
    <Inner>
      <Text>definition</Text>
      <TextInput
        onChangeText={value => setContent(value)}
        value={content}
        multiline
        numberOfLines={4}
        maxLength={100}
        style={globalStyles.content}
      />
      <View>
        <Text>examples</Text>
        <Button onPress={() => dispatch({type: 'add'})} title='+' active/>
      </View>
      {examples?.map((example, index) =>
        !example._destroy &&
        <>
          <TextInput
            onChangeText={value => dispatch({index: index, value: value})}
            value={example.content}
            multiline
            numberOfLines={4}
            maxLength={100}
            key={index}
            style={globalStyles.content}
          />
          <Button onPress={() => dispatch({type: 'remove', index: index})} title='-' active/>
        </>
      )}
      <Button onPress={() => submit()} title='Submit'/>
    </Inner>
  )
}

export default AddDefinition
