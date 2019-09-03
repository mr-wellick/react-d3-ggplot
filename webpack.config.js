import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import template from 'html-webpack-plugin';
import development from './build-utils/webpack.development';

export default ({ mode }) => {
  return merge(
    {
      mode: mode,
      entry: path.join(__dirname, './development/index.js'),
      output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
      },
      plugins: [
        new template({ template: './development/index.html' }),
        new webpack.ProgressPlugin()
      ]
    },
    development
  );
};
