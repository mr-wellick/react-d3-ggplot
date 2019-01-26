let uglifyJS = require("uglifyjs-webpack-plugin");

module.exports = () => ({
    optimization:
    {
        minimizer:
        [
            new uglifyJS({
                parallel: true
            })
        ]
    },
    module:
    {
        rules:
        [
            {
                test: /\.ts$/, use: [ "ts-loader" ]
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                query:
                {
                    presets: [ "@babel/preset-react", "@babel/preset-env" ]
                }
            }
        ]
    }
});
