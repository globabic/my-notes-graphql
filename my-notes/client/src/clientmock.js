import graphql from 'graphql';
import setupClient from 'apollo-client-mock'

const typeDefs = `
  type ListItem {
    id: String,
    content: String,
    date: String
  }
`

const defaultMocks = {
  Query: () => ({
    data: () => {
      notes: () => [
        id: () => "123",
        content: () => "Hello content",
        date: () => "24/07/2018, 21:53:18"
      ]
    }
  })
}

const client = setupClient(defaultMocks, typeDefs)

export default client
