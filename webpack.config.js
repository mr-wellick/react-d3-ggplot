// Base webpack config
let path          = require("path");
let webpack       = require("webpack");
let merge         = require("webpack-merge");
let template      = require("html-webpack-plugin");
let cleanBuildDir = require("clean-webpack-plugin");

// Development, production, and presets
let configType   = (env) => require(`./build-utils/webpack.${env}`)(env);
let configPreset =          require("./build-utils/loadPresets.js");

// Final webpack configuration
module.exports = ( { mode, presets } = { mode: "production", presets: undefined } ) => {
    return merge(
        {
            mode,
            entry: path.join(__dirname, "./src/App.js"),
            output:
            {
                path: path.join(__dirname, "build"),
                filename: "index.js",
                //libraryTarget: "commonjs2"
            },
            plugins:
            [
                new template({ template: "src/index.html" }),
                new webpack.ProgressPlugin(),
                new cleanBuildDir(["build"])
            ],
            //externals: {
            //    "react": "commonjs react"
            //}
        },
        configType(mode),
        presets !== undefined ? configPreset({ mode, presets }) : null
    );
};
