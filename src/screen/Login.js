import React, { useReducer, useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Button, TextSmall } from '../component/Styled'
import LoginMutation from '../../graphql/mutation/login.gql'
import RegisterMutation from '../../graphql/mutation/register.gql'
import { UserContext } from '../context/userContext'
import { useMutation } from '@apollo/client'
import {reducer, initialState} from '../reducer/loginReducer'
import RegisterFields from '../component/login/RegisterFields'

const Login = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
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
    <View>
      <View>
        <TextSmall>Email</TextSmall>
        <TextInput
          onChangeText={value => dispatch({target: {email: value}})}
          value={state.email}
          autoCompleteType='username'
        />
      </View>
      <View>
        <TextSmall>Password</TextSmall>
        <TextInput
          onChangeText={value => dispatch({target: {password: value}})}
          value={state.password}
          autoCompleteType='password'
          secureTextEntry={true}
        />
      </View>
      {isRegister &&
        <RegisterFields
          state={state}
          dispatch={dispatch}
        />
      }
      <Button onPress={() => submit(state)} disabled={disable}>
        <TextSmall>{isRegister ? 'Create Account' : 'Login'}</TextSmall>
      </Button>
      <TouchableWithoutFeedback onPress={() => setIsRegister(!isRegister)}>
        <TextSmall>{isRegister ? 'login' : 'register'}</TextSmall>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;
