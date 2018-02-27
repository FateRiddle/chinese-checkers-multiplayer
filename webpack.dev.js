const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const port = process.env.PORT || 8000

module.exports = {
  // entry: ['webpack-hot-middleware/client', path.resolve(__dirname, './src/index.js')],
  entry: [path.resolve(__dirname, './src/index.js')],

  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    // new webpack.HotModuleReplacementPlugin(),  //not needed in koa-webpack v2
    // new OpenBrowserPlugin({ url: `http://localhost:${port}/` }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
}
