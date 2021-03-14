import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'

const RegisterFields = ({state, dispatch}) => {
  const [passwordConfirm, SetPasswordConfirm] = useState('')

  return (
    <>
      <View>
        <Text>Password confirm</Text>
        <TextInput
          onChangeText={value => SetPasswordConfirm(value)}
          value={passwordConfirm}
        />
      </View>
      <View>
        <Text>First name</Text>
        <TextInput
          onChangeText={value => dispatch({target: {firstName: value}})}
          value={state.firstName || ''}
        />
      </View>
      <View>
        <Text>Last name</Text>
        <TextInput
          onChangeText={value => dispatch({target: {lastName: value}})}
          value={state.lastName || ''}
        />
      </View>
    </>
  );
};

export default RegisterFields
