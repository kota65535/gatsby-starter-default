import { initAppConfig } from "@/config";
import { GatsbyBrowser } from "gatsby";
import React from "react";
import MuiThemeProvider from "./src/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "@aws-amplify/core";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = async () => {
  const config = await initAppConfig();
  Amplify.configure(config.amplify);
};

const queryClient = new QueryClient();

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => {
  return <>{element}</>;
};

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return (
    <React.StrictMode>
      <MuiThemeProvider>
        <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
      </MuiThemeProvider>
    </React.StrictMode>
  );
};
