import {gql} from 'apollo-boost';

const getNotesQuery = gql`
{
  notes{
      id
      content
      date
    }
}
`

const addNoteMutation = gql`
mutation($content: String!, $date: String!){
  addNote(content: $content, date: $date){
    content
    date
    id
  }
}
`

const editNoteMutation = gql`
mutation($id: ID!, $content: String!, $date: String!){
  updateNote(id: $id, content: $content, date: $date){
    content
    date
    id
  }
}
`

const deleteNoteMutation = gql`
mutation($id: ID!){
  deleteNote(id: $id){
    id
  }
}
`

export {getNotesQuery, addNoteMutation, editNoteMutation, deleteNoteMutation};
