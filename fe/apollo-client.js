import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache()
});


// const client = new ApolloClient({
//   uri: "http:/localhost:5000/graphql",
//   cache: new InMemoryCache(),
//   request: (operation) => {
//       operation.setContext({
//           headers: {
//             Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjVlYmFjNTIwOTM4OTNlZGU4MGUyZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDM1OTMwODgsImV4cCI6MTY0MzY3OTQ4OH0.j4cjRusUI9LC7L6ppJdV9pJpZ45dm1Z9C-KIRhirDi4"
//           }
//       });
//   }
// });

export default client;