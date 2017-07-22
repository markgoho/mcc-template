const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    global: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
        files: [
          {
            match: ['**/*.html'],
            fn: function(event, file) {
              if (event === 'change') {
                const bs = require('browser-sync').get('bs-webpack-plugin');
                bs.reload();
              }
            }
          }
        ]
      },
      { reload: false }
    )
  ],
  watch: true,
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist')
  }
};
