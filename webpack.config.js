// Base webpack config
let path     = require("path");
let webpack  = require("webpack");
let merge    = require("webpack-merge");
let template = require("html-webpack-plugin");

// Development, production, and presets
let configType = (env) => require(`./build-utils/webpack.${env}`)(env);

// Final webpack configuration
module.exports = ( { mode } = { mode: "production" } ) => {
    return merge(
        {
            mode,
            entry: path.join(__dirname, "./src/__development__/index.js"),
            output:
            {
                path: path.join(__dirname, "build"),
                filename: "index.js"
            },
            plugins:
            [
                new template({ template: "src/__development__/index.html" }),
                new webpack.ProgressPlugin()
            ]
        },
        configType(mode)
    );
};