const React = require('react');
const {render} = require('react-dom');
const {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  gql,
  graphql,
} = require('react-apollo');
const typeDefs = require('../typeDefs');

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
  }),
});

const query = gql `
query Q {
  author {
    id
    author {
      name
      books {
        title
      }
    }
  }
}
`;

const mutation = gql `
mutation M {
  author {
    id
    author {
      name
      books {
        title
      }
    }
  }
}
`;

const C = graphql(query, {
  options: {
    fetchPolicy: 'network-only'
  }
})(({ data }) => {
  if (data.loading) {
    return <span>LOADING...</span>
  }
  console.log(data);
  return <div>{data.author.author
      ? data.author.author.name
      : "No-author"}</div>
});

const D = graphql(mutation)(class extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      a: false
    }
  }

  render() {
    const { mutate } = this.props;
    return (
      <div>
        <button
          onClick={() => {
            // mutate().then(({data}) => {
            //   console.log(data.author);
            //   this.setState({
            //     a: true
            //   })
            // })
            this.setState({
              a: true
            })
          }}
        >fetch more</button>
        {this.state.a && <C />}
      </div>
    );
  }
});

render(
  <ApolloProvider client={client}>
    <div>
      <C />
      <D />
    </div>
  </ApolloProvider>,
  document.getElementById('root'),
);
