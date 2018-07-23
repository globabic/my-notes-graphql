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
     let today = new Date();
     today.setMinutes(2);
     let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + addZero(today.getHours()) + ':' + addZero(today.getMinutes());
     function addZero(i) {

    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }
     this.props.addNoteMutation({
       variables:{
         content: this.state.content,
         date: date
       },
       refetchQueries: [{query: getNotesQuery}]
     }

   );
   document.getElementById('add-item').reset();

 }//submitForm

  render(){
    return(
      <form id="add-item" onSubmit={this.submitForm.bind(this)}>
          <input type="text" onChange={(e) => this.setState({content: e.target.value})}/>
          <input type="submit" value="Add" />
      </form>
    )
  }//render
}

export default compose(
  graphql(getNotesQuery, {name: "getNotesQuery"}),
  graphql(addNoteMutation, {name: "addNoteMutation"})
)(AddIteam);
