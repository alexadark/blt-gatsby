import * as React from "react";
import "./src/styles/tailwind.css";
import { AuthProvider } from "./src/lib/hooks/useAuth";
import { ApolloProvider } from "@apollo/client";
import GlobalContextProvider from "./src/context/GlobalContextProvider";
import { GlobalCaptchaProvider } from "./src/context/GlobalCaptcha";
import { client } from "./src/lib/apolloClient";

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>
    <GlobalCaptchaProvider>
      <ApolloProvider client={client}>
        <AuthProvider>{element}</AuthProvider>
      </ApolloProvider>
    </GlobalCaptchaProvider>
  </GlobalContextProvider>
);
