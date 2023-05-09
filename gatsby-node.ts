import { GatsbyNode } from "gatsby";
import { join } from "path";
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = async ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
      },
    },
    plugins: stage === 'build-html' ? [] : [new ForkTsCheckerWebpackPlugin()]
  });
};
