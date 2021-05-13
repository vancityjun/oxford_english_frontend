import { StatusBar } from 'expo-status-bar'
import React from 'react';
import { ApolloProvider } from '@apollo/client'
import 'react-native-gesture-handler'
import client from './graphql/client'
import StackNavigator from './src/navigator'
import initialize from './src/helper/DeviceHelper'
import ContextProviders from './src/context/ContextProviders'

const App = () => {
  initialize()
  return (
    <ApolloProvider client={client}>
      <ContextProviders>
        <StackNavigator />
        <StatusBar style="auto" />
      </ContextProviders>
    </ApolloProvider>
  )
}

export default App