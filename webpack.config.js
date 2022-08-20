const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env) => ({
  mode: env.WEBPACK_SERVE ? 'development' : 'production', 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: '/',
    assetModuleFilename: 'static/images/[hash][ext][query]',
//     chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },
  target: 'web',
  devServer: {
    port: '9500',
    static: ['./dist'],
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js','.jsx','.ts','.tsx'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(sc|c)ss$/,
        exclude: /\.module\.(sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: 'global',
              sourceMap: false,
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.module\.(sc|c)ss$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
//       inject: true,
//       minify: 'auto',
    }),
    !env.WEBPACK_SERVE ? new CleanWebpackPlugin() : false,
  ].filter(Boolean),
});
