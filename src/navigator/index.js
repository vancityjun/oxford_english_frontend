import React, {useContext} from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Main, 
  Login,
  Profile
} from '../screen'
import {UserContext} from '../context/userContext'
import Button from '../component/Button'

const Stack = createStackNavigator()

const StackNavigator = () => {
  const {currentUser} = useContext(UserContext)

  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
