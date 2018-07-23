import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import List from './components/List';


//apollo client steup
const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="notes-list">
          <List />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
