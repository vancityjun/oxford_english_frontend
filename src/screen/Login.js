import React, { useReducer, useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, ActionSheetIOS } from 'react-native'
import { Button } from '../component/Styled'
import LoginMutation from '../../graphql/mutation/login.gql'
import RegisterMutation from '../../graphql/mutation/register.gql'
import { UserContext } from '../context/userContext'
import { useMutation } from '@apollo/client'
import {reducer, initialState} from '../reducer/loginReducer'
import RegisterFields from '../component/login/RegisterFields'

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isRegister, setIsRegister] = useState(false)
  const [validateForm, setValidateForm] = useState(false)
  const {setCurrentUser} = useContext(UserContext)
  const [login, { data: loginData }] = useMutation(LoginMutation)
  const [register, { data: registerData }] = useMutation(RegisterMutation)

  useEffect(()=> {
    if(loginData) {
      setCurrentUser(loginData.login.user)
    }
  },[loginData])

  useEffect(()=> {
    if(registerData) {
      setCurrentUser(registerData.register.user)
    }
  },[registerData])

  useEffect(()=> {
    // need to work on
    const {
      email,
      password,
      firstName,
      lastName
    } = state
    const validateLogin = email && password

    if(isRegister) {
      setValidateForm(validateLogin && firstName && lastName )
    } else {
      setValidateForm(validateLogin)
    }
  },[state])

  const submit = input => {
    if( isRegister ) {
      return register({variables: {input: input}})
    }
    login({variables: {input: input}})
  }

  return (
    <View>
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={value => dispatch({target: {email: value}})}
          value={state.email}
        />
      </View>
      {isRegister &&
        <RegisterFields
          state={state}
          dispatch={dispatch}
        />
      }
      <View>
        <Text>Password</Text>
        <TextInput
          onChangeText={value => dispatch({target: {password: value}})}
          value={state.password}
        />
      </View>
      <Button onPress={() => submit(state)}>
        <Text>{isRegister ? 'Create Account' : 'Login'}</Text>
      </Button>
      <Button onPress={() => setIsRegister(!isRegister)}>
        <Text>{isRegister ? 'login' : 'register'}</Text>
      </Button>
    </View>
  );
};

export default Login;
