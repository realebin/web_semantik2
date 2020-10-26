const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;

const app = express();
const Schema = require('./schema.js');

app.use('/graphql', expressGraphQL({
  schema: Schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server is running on port 4000...')
});