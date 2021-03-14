import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
export default client
