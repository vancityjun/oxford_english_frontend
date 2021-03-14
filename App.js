import { StatusBar } from 'expo-status-bar'
import React from 'react';
import { ApolloProvider } from '@apollo/client'
import 'react-native-gesture-handler'
import client from './graphql/client'
import StackNavigator from './src/navigator'
import UserProvider from './src/context/userContext'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <StackNavigator />
        <StatusBar style="auto" />
      </UserProvider>
    </ApolloProvider>
  );
}

export default App