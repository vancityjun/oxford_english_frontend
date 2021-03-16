import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin'
})

const authLink = setContext((_, { headers }) => {
  const token = document.cookie
  .split('; ')
  .find(row => row.startsWith('token='))
  .split('=')[1]

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
export default client
