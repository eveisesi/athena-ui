import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from "apollo-link-context"
import { getMainDefinition } from 'apollo-utilities'
import store from "./store/index"



// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
})

const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_GRAPHQL_WS,
  options: {
    reconnect: true,
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)


const authLink = setContext((_, { headers }) => {
  const token = store.getters.getToken
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})



// Cache implementation
const cache = new InMemoryCache()



// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache,
  connectToDevTools: true,
})


// Install the vue plugin
Vue.use(VueApollo)

export default new VueApollo({
  defaultClient: apolloClient,
})

