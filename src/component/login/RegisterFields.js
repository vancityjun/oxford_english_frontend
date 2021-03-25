import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { TextSmall, Inner } from '../../component/Styled'

const RegisterFields = ({state, dispatch}) => {
  const [passwordConfirm, SetPasswordConfirm] = useState('')

  return (
    <>
      <Inner>
        <TextSmall>Password confirm</TextSmall>
        <TextInput
          onChangeText={value => SetPasswordConfirm(value)}
          value={passwordConfirm}
          secureTextEntry={true}
        />
      </Inner>
      <Inner>
        <TextSmall>First name</TextSmall>
        <TextInput
          onChangeText={value => dispatch({target: {firstName: value}})}
          value={state.firstName || ''}
        />
      </Inner>
      <Inner>
        <TextSmall>Last name</TextSmall>
        <TextInput
          onChangeText={value => dispatch({target: {lastName: value}})}
          value={state.lastName || ''}
        />
      </Inner>
    </>
  );
};

export default RegisterFields
