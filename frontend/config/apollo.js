import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

//apollo-link-context nos va permit modificar los headers via context para que se propaguen  por toda la aplicacion

const DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
const HttpLink = createHttpLink({
  uri: "http://localhost:4000/",
  fetch,

});
// setContextnos va permitir modificar los headers que se envian
//esta mofificacion a la configuracion de apollo obedece a que se requiere enviar a los
//headers datos, como el token, etc, necesaria para la autenticacion

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
console.log("conectandose a servidor")
const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: authLink.concat(HttpLink),
  defaultOptions: DefaultOptions,
});
console.log("conectado a servidor")
export default client;
