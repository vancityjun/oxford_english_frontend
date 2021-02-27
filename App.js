import { StatusBar } from 'expo-status-bar'
import React from 'react';
import { ApolloProvider } from '@apollo/client'
import 'react-native-gesture-handler'
import client from './graphql/client'
import StackNavigator from './src/navigator'

const App = () => {
  return (
    <ApolloProvider client={client}>      
      <StackNavigator />
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}

export default App