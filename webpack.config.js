// Base webpack config
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const template = require("html-webpack-plugin");

// Development, production, and presets
const configType = env => require(`./build-utils/webpack.${env}`)(env);

// Final webpack configuration
module.exports = ({ mode } = { mode: "production" }) => {
  return merge(
    {
      mode,
      entry: path.join(__dirname, "./src/__development__/index.js"),
      output: {
        path: path.join(__dirname, "build"),
        filename: "index.js"
      },
      plugins: [
        new template({ template: "src/__development__/index.html" }),
        new webpack.ProgressPlugin()
      ]
    },
    configType(mode)
  );
};
