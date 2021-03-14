import React, {useContext} from 'react'
import { TouchableWithoutFeedback, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Main, 
  Login,
  DefinitionView
} from '../screen'
import {UserContext} from '../context/userContext'

const Stack = createStackNavigator()

const StackNavigator = () => {
  const {loading, currentUser} = useContext(UserContext)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={Main}
          options={ ({navigation: {navigate}}) => ({
            headerTitle: 'Home',
            headerRight: () => (
              <TouchableWithoutFeedback onPress={() => navigate('Login')} >
                <Text>{currentUser ? 'profile' : 'login' }</Text>
              </TouchableWithoutFeedback>
            )
          })} 
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Definitions" component={DefinitionView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
