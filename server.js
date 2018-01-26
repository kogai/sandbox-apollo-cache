const express = require('express');
const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');
const {
  makeExecutableSchema
} = require('graphql-tools');

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

const typeDefs = `
  type Query {
    books: [Book!]!
    author: Author
  }

  type Book { title: String!, author: String! }
  type Author {
    id: String!
    name: String!
    books: [Book!]!
  }
`;

let called = 0;
const resolvers = {
  Query: {
    books: () => books,
    author: () => {
      if (called === 0) {
        called++;
        return null
      } else {
        return {
          id: "a",
          name: "Arthur Clarke",
          books: [{
            author: "Arthur Clarke",
            title: "The Sentinel"
          }]
        }
      }

    }
  },
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

app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
