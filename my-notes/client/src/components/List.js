import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, graphql} from 'react-apollo';
import {getNotesQuery} from '../queries/queries';

import '../css/list.css';

//modules
import ListItem from './ListItem';
import AddItem from './AddItem';



class List extends Component {
  displayNotes(){
    let data = this.props.data;
    if(data.loading){
      return(<div>Loading...</div>)
    }else{
      return data.notes.map(note =>{
        return(
          <ListItem item={note.content} key={note.id} id={note.id} date={note.date} />
        )
      })
    }
  }//displayNotes
  countItems(){
      let data = this.props.data;
    if(data.loading){
      return "Calculating..."
    }else{
      let notes = data.notes;
      return notes.length;
    }
  }
  render() {
  return (

      <div id="notes-list">
        <p>{this.countItems()} items</p>
        <ul>
          {this.displayNotes()}
        </ul>
        <AddItem />
      </div>


  );
}//render

}

export default graphql(getNotesQuery)(List);
