import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import * as Device from 'expo-device'
import AsyncStorage from '@react-native-async-storage/async-storage'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin'
})

const getToken = async () => {
  const device = await Device.getDeviceTypeAsync()
  let token
  if (device === Device.DeviceType.DESKTOP) {
    token = document.cookie.split('; ').find(row => row.startsWith('token='))
  } else {
    token = await AsyncStorage.getItem('@token')
  }
  token = token.split('=')[1]
  return token ? `Bearer ${token}` : ''
}

const authLink = setContext( async (_, { headers }) => {
  const token = await getToken()
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // addTypename: false
  })
})
export default client
