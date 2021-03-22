import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

const AddDefinition = ({submit, examples, content, setContent, dispatch}) => {
  return (
    <View>
      <Text>definition</Text>
      <TextInput
        onChangeText={value => setContent(value)}
        value={content}
        multiline={true}
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
          />
          <TouchableOpacity onPress={() => dispatch({type: 'remove', index: index})}>
            <Text>-</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => submit()}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDefinition
