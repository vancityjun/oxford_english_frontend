import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Main, 
  Login,
  Profile,
  EditProfile,
} from '../screen'
import {UserContext} from '../context/userContext'
import {ModalControlContext} from '../context/ModalControlContext'
import Button from '../component/Button'
import styled from 'styled-components/native'
import Alert from '../component/Alert'

const Stack = createStackNavigator()

const StackNavigator = () => {
  const {currentUser} = useContext(UserContext)
  const {alertMessage, inputTitle, setOpenModal} = useContext(ModalControlContext)

  return (
    <NavigationContainer>
      {!!alertMessage &&
        <ModalBackground >
          <Alert alertMessage={alertMessage} inputTitle={inputTitle} />
        </ModalBackground>
      }
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={ ({navigation: {navigate}}) => ({
            headerTitle: 'Home',
            headerRight: () =>
            currentUser ?
              <Button onPress={() => navigate('Profile')} title='Profile'/>
            :
              <Button onPress={() => navigate('Login')} title='Login'/>
          })}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const ModalBackground = styled.Pressable`
  position: absolute
  left: 0px
  top: 0px
  width: 100%
  height: 100%
  z-index: 900
  background: rgba(0, 0, 0, 0.2)
  display: flex
  align-items: center
`

export default StackNavigator
