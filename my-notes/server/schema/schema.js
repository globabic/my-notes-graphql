const graphql = require('graphql');
const Note = require('../models/note');

const{
  GraphQLObjectType,
   GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: {type: GraphQLID},
    content: {type: GraphQLString},
    date: {type: GraphQLString},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    note:{
      type: NoteType,
      args:{id:{type:GraphQLID}},
      resolve(parent, args){
        return Note.findById(args.id);
      }
    },
    notes:{
      type: new GraphQLList(NoteType),
      resolve(parent, args){
        return Note.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addNote:{
      type: NoteType,
      args: {
        content: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args){

        let note = new Note({
          content: args.content,
          date: args.date,
        });
        return note.save();
      }
    },
    updateNote:{
      type: NoteType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args){

        return Note.findByIdAndUpdate(args.id, {$set: {content: args.content, date: args.date}}).exec();
    }
  },
  deleteNote:{
    type: NoteType,
    args:{
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve(parent, args){
      return Note.findByIdAndRemove(args.id);

    }
  }

    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
