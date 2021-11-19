import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import Layout from "./../components/layout";
import ApolloClient from "../libs/apollo";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={ApolloClient}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
