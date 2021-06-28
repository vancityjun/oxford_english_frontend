import React, { useState } from 'react'
import TextInputWithTitle from '../TextInputWithTitle'

const RegisterFields = ({
  state,
  dispatch,
  errorMessage,
  passwordConfirm,
  SetPasswordConfirm,
}) => {
  return (
    <>
      <TextInputWithTitle
        title='Password confirm'
        onChangeText={value => SetPasswordConfirm(value)}
        value={passwordConfirm}
        secureTextEntry={true}
      />
      <TextInputWithTitle
        title='First name'
        onChangeText={value => dispatch({target: {firstName: value}})}
        value={state.firstName}
        textContentType='givenName'
      />
      <TextInputWithTitle
        title='Last name'
        onChangeText={value => dispatch({target: {lastName: value}})}
        value={state.lastName}
        errorMessage={errorMessage}
        textContentType='familyName'
      />
    </>
  )
}

export default RegisterFields
