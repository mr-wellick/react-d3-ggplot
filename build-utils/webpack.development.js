export default {
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    overlay: {
      errors: true,
      warnings: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  }
};
