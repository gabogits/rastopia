import "../assets/css/reset.css";
import "../assets/css/base.css";
import "../assets/css/forms.css";
import "../assets/css/inputrange.css";
import "../assets/css/large-devices.css";
import "../assets/css/medium-devices.css";
import "../assets/css/small-devices.css";

import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import ProductState from "../context/productState";
import {AuthState} from "../context/authState";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
    <AuthState>
      <ProductState>
        <Component {...pageProps} />
      </ProductState>
      </AuthState>
    </ApolloProvider>
  );
};

export default MyApp;
