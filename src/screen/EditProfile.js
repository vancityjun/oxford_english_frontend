import React, { useContext, useReducer, useState, useEffect } from 'react'
import { Page, Inner, FlexWrap } from '../component/Styled'
import { UserContext } from '../context/userContext'
import reducer from '../reducer/formReducer'
import TextInputWithTitle from '../component/TextInputWithTitle'
import UpdateUser from '../../graphql/mutation/updateUser.gql'
import DeleteUser from '../../graphql/mutation/deleteUser.gql'
import { useMutation } from '@apollo/client'
import Button from '../component/Button'
import styled from 'styled-components/native'
import {ModalControlContext} from '../context/ModalControlContext'

const EditProfile = ({navigation}) => {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const {setAlertMessage, setInputTitle, setAction} = useContext(ModalControlContext)
  const [state, dispatch] = useReducer(reducer, {...currentUser.userAttributes})
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [deleteUser, {data: message}] = useMutation(DeleteUser)
  const [updateUser, {loading, data: {updateUser: {user} = {}} = {}}] = useMutation(UpdateUser)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
    if(!loading && user) {
      setCurrentUser(user)
      navigation.goBack()
    }
  },[user, loading])

  const confirm_delete = (password) => {
    deleteUser({variables: {input :{password: password}}})
    setCurrentUser(null)
    navigation.navigate('Main')
  }

  const submit = () => {
    if (newPassword !== passwordConfirm) {
      return setErrorMessage('Passwords are not matching')
    }
    if (newPassword) {
      setAlertMessage('Confirm your password to change the password')
      setAction(() => update)
      setInputTitle('Confirm password')
    } else {
      update()
    }
  }

  const update = (password) => {
    delete state.__typename
    updateUser({
      variables: {input: {
        userAttributes: state,
        newPassword: newPassword,
        password: password
      }}
    })
  }

  return (
    <Wrap>
      <TextInputWithTitle
        title="Email"
        onChangeText={value => dispatch({target: {email: value}})}
        value={state.email}
        maxLength={30}
      />
      <FlexWrap justifyContent='space-between'>
        <TextInputWithTitle
          title="First name"
          onChangeText={value => dispatch({target: {firstName: value}})}
          value={state.firstName}
          maxLength={20}
          width='50%'
        />
        <TextInputWithTitle
          title="Last name"
          onChangeText={value => dispatch({target: {lastName: value}})}
          value={state.lastName}
          maxLength={20}
          width='50%'
        />
      </FlexWrap>
      <TextInputWithTitle
        title="Change password"
        onChangeText={value => setNewPassword(value)}
        value={newPassword}
        maxLength={20}
        secureTextEntry
      />
      <TextInputWithTitle
        title="Confirm new password"
        onChangeText={value => setPasswordConfirm(value)}
        value={passwordConfirm}
        maxLength={20}
        secureTextEntry
        errorMessage={errorMessage}
      />
      <Inner>
        <FlexWrap justifyContent='space-evenly'>
          <Button
            onPress={()=> {
              setAlertMessage('Are you sure you want to delete your account?')
              setAction(() => confirm_delete)
              setInputTitle('Confirm password')
            }}
            title='Delete account'
            width={120}
            background={false}
            warn
          />
          <Button
            onPress={() => submit()}
            title='Submit' active width={120}
            disabled={newPassword && !(newPassword && passwordConfirm)}
          />
        </FlexWrap>
      </Inner>
    </Wrap>
  )
}

const Wrap = styled(Page)`
  padding: 20px
`

export default EditProfile
