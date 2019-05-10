// Base webpack config
import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import template from "html-webpack-plugin";
import development from "./build-utils/webpack.development"; // Development, production, and presets

interface Modes {
  mode: string;
}

// webpack config
export default (paramsPassedByWebpack: Modes) => {
  const { mode } = paramsPassedByWebpack;

  return merge(
    {
      mode: mode === "development" ? "development" : "production",
      entry: path.join(__dirname, "./__development__/index.tsx"),
      output: {
        path: path.join(__dirname, "build"),
        filename: "index.js"
      },
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      plugins: [
        new template({ template: "./__development__/index.html" }),
        new webpack.ProgressPlugin()
      ]
    },
    development()
  );
};
