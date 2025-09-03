import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const uri = import.meta.env.VITE_GRAPHQL_HTTP ?? 'http://localhost:4000'

const link = new HttpLink({ uri })

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
