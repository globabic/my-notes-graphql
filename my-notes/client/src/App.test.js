import React from 'react';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {render, mount} from 'enzyme'
import List from './components/List';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import client from './clientmock'

Enzyme.configure({ adapter: new Adapter() });

function pageBody(func) {
  return func(<ApolloProvider client={client()}>
  <div id="notes-list">
    <List>
    <div id="notes-list">
      <p>1 items</p>
      <ul>
        <ListItem item="Hello content" key="123" id="123" date="24/07/2018, 21:53:18" />
      </ul>
      <AddItem />
    </div>
    </List>
  </div>
  </ApolloProvider>)
}

describe('List', () => {
    test('renders no notes', () => {
        const resolverOverwrites = {
          Query: () => ({
            // empty
          })
        }
        const renderedComponent = render(
          <ApolloProvider client={client()}>
            <div id="notes-list">
              <List />
            </div>
          </ApolloProvider>
        );

        expect(renderedComponent).toMatchSnapshot();
    });

    test('renders one item', () => {
        const renderedComponent = pageBody(render);
        expect(renderedComponent).toMatchSnapshot();
    });

    test('error on empty submit', () => {
        const mounted = pageBody(mount)
        // fetch AddItem inner form
        const form = mounted.find("#add-item")
        form.simulate('submit', {
          preventDefault: () => {}
        })
        // check input placeholder in AddItem inner form
        expect(form.find("#content").render().prop("placeholder")).toEqual("Content can't be empty")
    });

    test('successful submit', () => {
        const mounted = pageBody(mount)
        // fetch AddItem inner form
        const form = mounted.find("#add-item")
        // set input value in form
        const input = form.find("#content")
        input.instance().value = 'My test note';

        form.simulate('submit', {
          preventDefault: () => {}
        })

        expect(input.render().prop("placeholder")).toEqual("Enter your note...")
    })
});
