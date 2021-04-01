import React, { useReducer, useContext, useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import { TextSmall, FlexColumn, Inner } from '../component/Styled'
import LoginMutation from '../../graphql/mutation/login.gql'
import RegisterMutation from '../../graphql/mutation/register.gql'
import { UserContext } from '../context/userContext'
import { useMutation } from '@apollo/client'
import {reducer} from '../reducer/formReducer'
import RegisterFields from '../component/login/RegisterFields'
import Button from '../component/Button'

const Login = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, {})
  const [isRegister, setIsRegister] = useState(false)
  const [disable, setDisable] = useState(true)
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const [login, { data: loginData }] = useMutation(LoginMutation)
  const [register, { data: registerData }] = useMutation(RegisterMutation)

  useEffect(()=> {
    const user = loginData?.login.user || registerData?.register.user
    if(user) {
      setCurrentUser(user)
      navigation.goBack()
    }
  },[loginData, registerData])

  useEffect(()=> {
    // need to work on
    const {
      email,
      password,
      firstName,
      lastName
    } = state
    const validateLogin = !(email && password)

    if(isRegister) {
      setDisable(validateLogin || !(firstName && lastName) )
    } else {
      setDisable(validateLogin)
    }
  },[state, isRegister])

  const submit = input => {
    if( isRegister ) {
      return register({variables: {input: input}})
    }
    login({variables: {input: input}})
  }

  return (
    <FlexColumn>
      <Inner>
        <TextSmall>Email</TextSmall>
        <TextInput
          onChangeText={value => dispatch({target: {email: value}})}
          value={state.email || ''}
          autoCompleteType='username'
        />
      </Inner>
      <Inner>
        <TextSmall>Password</TextSmall>
        <TextInput
          onChangeText={value => dispatch({target: {password: value}})}
          value={state.password || ''}
          autoCompleteType='password'
          secureTextEntry={true}
        />
      </Inner>
      {isRegister &&
        <RegisterFields
          state={state}
          dispatch={dispatch}
        />
      }
      <View>
        <Button
          onPress={() => submit(state)}
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
        />
      </View>
    </FlexColumn>
  )
}

export default Login;
