module.exports = `
type Query {
    author: Author!
  }

  type Mutation {
    author: Author!
  }

  type Book { title: String! }
  type Author {
    id: String!
    author: AuthorObject
  }
  type AuthorObject {
    name: String!
    books: [Book!]!
  }
`;
