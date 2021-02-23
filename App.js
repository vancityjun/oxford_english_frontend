import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'
import Main from './screen/Main'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View>
        <Main />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

export default App