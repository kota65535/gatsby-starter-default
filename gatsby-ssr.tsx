import { GatsbySSR } from "gatsby";
export { wrapPageElement } from "./gatsby-browser";
export { wrapRootElement } from "./gatsby-browser";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "ja" });
};
