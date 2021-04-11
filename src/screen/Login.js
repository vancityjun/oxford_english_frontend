import React, { useReducer, useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlexColumn } from '../component/Styled'
import LoginMutation from '../../graphql/mutation/login.gql'
import RegisterMutation from '../../graphql/mutation/register.gql'
import { UserContext } from '../context/userContext'
import { useMutation } from '@apollo/client'
import reducer from '../reducer/formReducer'
import RegisterFields from '../component/login/RegisterFields'
import Button from '../component/Button'
import TextInputWithTitle from '../component/TextInputWithTitle'
import { ModalControlContext } from '../context/ModalControlContext'

const Login = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, {})
  const [isRegister, setIsRegister] = useState(false)
  const [disable, setDisable] = useState(true)
  const [passwordConfirm, SetPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState(true)
  const { setCurrentUser } = useContext(UserContext)
  const {setAlertMessage} = useContext(ModalControlContext)
  const [login, { data: {login: loginData} = {} }] = useMutation(LoginMutation)
  const [register, { data: {register: registerData} = {} }] = useMutation(RegisterMutation)

  useEffect(()=> {
    const user = loginData?.user || registerData?.user
    const errors = loginData?.errors || registerData?.errors

    if (user) {
      setCurrentUser(user)
      navigation.goBack()
    } else if (errors) {
      errors.forEach((error) => setAlertMessage(error))
    }
  },[loginData, registerData])

  useEffect(()=> {
    const {
      email,
      password,
      firstName,
      lastName
    } = state
    const validateLogin = !(email && password)

    if(isRegister) {
      setDisable(validateLogin || !(firstName && lastName && passwordConfirm))
    } else {
      setDisable(validateLogin)
    }
  },[state, isRegister])

  const submit = () => {
    if( isRegister ) {
      if (state.password !== passwordConfirm) {
        return setErrorMessage('Passwords are not matching')
      }
      return register({variables: {input: state}})
    }
    login({variables: {input: state}})
  }

  return (
    <FlexColumn>
      <TextInputWithTitle
        title='Email'
        onChangeText={value => dispatch({target: {email: value}})}
        value={state.email}
        autoCompleteType='username'
        autoFocus
      />
      <TextInputWithTitle
        title='Password'
        onChangeText={value => dispatch({target: {password: value}})}
        value={state.password}
        autoCompleteType='password'
        secureTextEntry={true}
      />
      {isRegister &&
        <RegisterFields
          state={state}
          dispatch={dispatch}
          passwordConfirm={passwordConfirm}
          SetPasswordConfirm={(value) => SetPasswordConfirm(value)}
          errorMessage={errorMessage}
        />
      }
      <View>
        <Button
          onPress={() => submit()}
          disabled={disable}
          active={true}
          large={true}
          title={isRegister ? 'Create Account' : 'Login'}
          width={170}
          height={38}
        />
        <Button 
          onPress={() => setIsRegister(!isRegister)}
          title={isRegister ? 'login' : 'register'}
          background={false}
        />
      </View>
    </FlexColumn>
  )
}

export default Login;
