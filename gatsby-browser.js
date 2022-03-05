import * as React from "react";
import "./src/styles/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import GlobalContextProvider from "./src/context/GlobalContextProvider";
import { GlobalCaptchaProvider } from "./src/context/GlobalCaptcha";
import { client } from "./src/lib/apolloClient";
import { AuthModalContextProvider } from "~/context/AuthModalContext";
import { AuthContextProvider } from "~/context/AuthContext";
export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>
    <AuthModalContextProvider>
      <GlobalCaptchaProvider>
        <ApolloProvider client={client}>
          <AuthContextProvider>{element}</AuthContextProvider>
        </ApolloProvider>
      </GlobalCaptchaProvider>
    </AuthModalContextProvider>
  </GlobalContextProvider>
);
