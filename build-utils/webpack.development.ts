export default () => ({
  devServer: {
    historyApiFallback: true,
    stats: "errors-only",
    overlay: {
      errors: true,
      warnings: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      }
    ]
  }
});
