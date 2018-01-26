const {
  ApolloClient,
  createNetworkInterface
} = require('apollo-client');
const gql = require('graphql-tag');

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

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
  }),
});

const query = gql `
query Q {
  author {
    id
    name
    books {
      title
      author
    }
  }
}
`;

client.query({
    query,
  })
  .then(data => {
    console.log(data.data);

    client.query({
        query,
      })
      .then(data => console.log(data.data))
  });
