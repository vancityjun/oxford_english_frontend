import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import {Inner, globalStyles} from './Styled'

const AddDefinition = ({submit, examples, content, setContent, dispatch}) => {
  return (
    <Inner>
      <Text>definition</Text>
      <TextInput
        onChangeText={value => setContent(value)}
        value={content}
        multiline={true}
        style={globalStyles.content}
      />
      <View>
        <Text>examples</Text>
        <TouchableOpacity onPress={() => dispatch({type: 'add'})}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      {examples?.map((example, index) =>
        !example._destroy &&
        <>
          <TextInput
            onChangeText={value => dispatch({index: index, value: value})}
            value={example.content}
            multiline={true}
            key={index}
            style={globalStyles.content}
          />
          <TouchableOpacity onPress={() => dispatch({type: 'remove', index: index})}>
            <Text>-</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => submit()}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </Inner>
  )
}

export default AddDefinition
