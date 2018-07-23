import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import '../css/listItem.css';

import {deleteNoteMutation, editNoteMutation, getNotesQuery} from '../queries/queries';

class ListItem extends Component {
  constructor(props){
     super(props);
     this.state = {
      selected: null
    }
   }//constructor
  render(){
    return(
      <li>
        <div className="list-item">
            <img className="list-item-avatar" alt="avatar" src={require("../images/avatar.svg")}/>
            <div className="list-item-bubble">
                <span className="list-item-name">{this.props.item}</span>
                <img className="list-item-edit" src={require("../images/edit.svg")} alt="edit" onClick={this.handleEdit.bind(this)}></img>
                <img className="list-item-delete" src={require("../images/delete.svg")} alt="delete" onClick={this.handleDelete.bind(this)}></img>
            </div>
            <span className="list-item-date">{this.props.date}</span>
          </div>
      </li>
    )
  }//render
  handleDelete(){

    this.props.deleteNoteMutation({
      variables:{
        id: this.props.id
      },
      refetchQueries: [{query: getNotesQuery}]
    }
   );
 }//handleDelete
  handleEdit(){
    
    let newValue = prompt("Edit your note: ", this.props.item);
    let today = new Date();
    let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes();
    if(newValue != null){
      this.props.editNoteMutation({
        variables:{
          id: this.props.id,
          content: newValue,
          date: date
        },
        refetchQueries: [{query: getNotesQuery}]
      }
    );

    }

  }//handleEdit

}//ListItem

export default compose(
  graphql(getNotesQuery, {name: "getNotesQuery"}),
  graphql(deleteNoteMutation, {name: "deleteNoteMutation"}),
  graphql(editNoteMutation, {name: "editNoteMutation"})
)(ListItem);
