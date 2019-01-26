module.exports = () => ({
    devServer:
    {
        historyApiFallback: true,
        stats: "errors-only",
        overlay:
        {
            errors: true,
            warnings: true
        }
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
