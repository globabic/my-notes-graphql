const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cros-origin requests
app.use(cors());

mongoose.connect('mongodb://default-user:rootpassword123@ds247121.mlab.com:47121/my-notes-db');
mongoose.connection.once('open', ()=>{
  console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4001, () => {
  console.log('Listening for requests on port 4001');
});
