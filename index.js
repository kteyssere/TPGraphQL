require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/resolver');
const mongoose = require("mongoose");

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(process.env.DB_CONNECTION, options)
  .then(() => app.listen(4000, console.log("🚀 Serveur GraphQL lancé sur http://localhost:4000/graphql")))
  .catch(error => {
    throw error
  });

