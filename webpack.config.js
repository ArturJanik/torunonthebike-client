const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = () => process.env.NODE_ENV === 'development';
const isProduction = () => process.env.NODE_ENV === 'production';

module.exports = {
  mode: isDevelopment() ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: '/',
    assetModuleFilename: 'static/images/[hash][ext][query]',
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    clean: {
      dry: false, // true - Logs the assets that should be removed instead of deleting them.
    },
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
  performance: {
    hints: false,
    maxEntrypointSize: isDevelopment() ? 512000 : 10000,
    maxAssetSize: isDevelopment() ? 512000 : 10000,
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
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                auto: true,
                namedExport: false,
              }
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ].filter(Boolean),
  optimization: {
    splitChunks: { chunks: "all" },
    usedExports: true,
  },
};
