import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {addNoteMutation, getNotesQuery} from '../queries/queries';

import '../css/addItem.css';

class AddIteam extends Component {
  constructor(props){
     super(props)
      this.state = {
        content: '',
        date: ''
      };
   }//constructor
   submitForm(e){
     e.preventDefault();
     let value = this.contentInput.value;
     if(value !== null && value !== '' && value.length !== 0) {
       let date = new Date().toLocaleString('en-GB', {hour12: false}).split(',');
       this.props.addNoteMutation({
         variables:{
           content: value,
           date: date.toLocaleString()
         },
         refetchQueries: [{query: getNotesQuery}]
       });
       this.form.reset();
       this.contentInput.className = "";
       this.contentInput.placeholder = "Enter your note...";
       this.setState({
         content: '',
         date: ''
       });
     } else {
       this.contentInput.placeholder = "Content can't be empty";
       this.contentInput.className = "error";
     }

 }//submitForm

  render(){
    return(
      <form id="add-item" ref = {f => this.form = f} onSubmit={this.submitForm.bind(this)}>
          <input id="content" ref = {c => this.contentInput = c} placeholder="Enter your note..." type="text"/>
          <input type="submit" value="Add" />
      </form>
    )
  }//render
}

export default compose(
  graphql(getNotesQuery, {name: "getNotesQuery"}),
  graphql(addNoteMutation, {name: "addNoteMutation"})
)(AddIteam);
