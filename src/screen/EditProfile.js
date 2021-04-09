import React, { useContext, useReducer, useState, useEffect } from 'react'
import { Page, Inner, FlexWrap } from '../component/Styled'
import { UserContext } from '../context/userContext'
import {reducer} from '../reducer/formReducer'
import TextInputWithTitle from '../component/TextInputWithTitle'
import UpdateUser from '../../graphql/mutation/updateUser.gql'
import DeleteUser from '../../graphql/mutation/deleteUser.gql'
import { useMutation } from '@apollo/client'
import Button from '../component/Button'
import {ModalControlContext} from '../context/ModalControlContext'
import styled from 'styled-components/native'

const EditProfile = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const [state, dispatch] = useReducer(reducer, currentUser.userAttributes || {})
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [deleteUser, {data: message}] = useMutation(DeleteUser)
  const [updateUser, {loading, data: {updateUserData} = {}}] = useMutation(UpdateUser)
  const {setAlertMessage, setAction, setInput, setOnChange} = useContext(ModalControlContext)

  useEffect(() => {
    if(!loading && updateUserData) {
      setCurrentUser(updateUserData.user)
    }
  },[updateUserData, loading])

  const confirm_delete = () => {
    deleteUser({variables: {input :{password: password}}})
    setCurrentUser(null)
  }
  const update = () => {
    delete state.__typename
    updateUser({
      variables: {input: {userAttributes: state}},
      password: password
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
        onChangeText={value => dispatch({target: {password: value}})}
        value={state.password}
        maxLength={20}
        secureTextEntry={true}
      />
      <TextInputWithTitle
        title="Password confirm"
        onChangeText={value => setPasswordConfirm(value)}
        value={passwordConfirm}
        maxLength={20}
        secureTextEntry={true}
      />
      <Inner>
        <FlexWrap justifyContent='space-evenly'>
          <Button
            onPress={()=> {
              setAlertMessage('Are you sure you want to delete your account?')
              setAction(() => confirm_delete)
              setInput({
                title: 'Confirm Password',
                value: password,
                onChange (value) {
                  setPassword(value)
                  debugger
                }
              })
            }}
            title='Delete account'
            width={120}
            background={false}
            warn
          />
          <Button onPress={() => update()} title='Submit' active width={120} />
        </FlexWrap>
      </Inner>
    </Wrap>
  )
}

const Wrap = styled(Page)`
  padding: 20px
`

export default EditProfile
