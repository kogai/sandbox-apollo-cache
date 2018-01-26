const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');
const {
  makeExecutableSchema
} = require('graphql-tools');
const serveStatic = require('serve-static');
const typeDefs = require('./typeDefs');

// Some fake data
const books = [{
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const id = "1234";
let called = 0;

const resolvers = {
  Query: {
    author: () => {
      if (called === 0) {
        called++;
        return {
          id,
          author: null
        }
      } else {
        return {
          id,
          author: {
            name: "Greg Eagan",
            books: [{
              author: "Arthur Clarke",
              title: "The Sentinel"
            }]
          }
        }
      }

    }
  },
  Mutation: {
    author: () => {
      console.log("MUTATE!");
      called++;
      return ({
        id,
        author: {
          name: "Arthur Clarke",
          books: [{
            author: "Arthur Clarke",
            title: "The Sentinel"
          }]
        }
      })
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.use(serveStatic(path.join(__dirname, 'dist')));

app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
