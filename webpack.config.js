const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const compact = (array) => (
  array.filter((item) => item)
);

module.exports = (env) => {
  const { env: environment, analyze } = env;

  return {
    devServer: { historyApiFallback: true },
    devtool: environment === 'production'
      ? 'source-map'
      : 'inline-source-map',
    entry: path.resolve(__dirname, 'src', 'index'),
    mode: environment,
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      }, {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      }, {
        test: /\.(ttf|png|jpg|mp4)$/,
        use: {
          loader: 'url-loader',
        },
      }, {
        test: /\.svg$/,
        use: {
          loader: 'svg-inline-loader',
        },
      }],
    },
    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      filename: environment === 'production'
        ? '[name].[contenthash].js'
        : '[name].js',
      chunkFilename: environment === 'production'
        ? '[name].[contenthash].js'
        : '[name].js',
      path: path.resolve(__dirname, 'public'),
    },
    plugins: compact([
      new MiniCssExtractPlugin({
        filename: environment === 'production'
          ? '[name].[contenthash].css'
          : '[name].css',
        chunkFilename: environment === 'production'
          ? '[name].[contenthash].css'
          : '[name].css',
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        REACT_ENV: JSON.stringify(environment),
      }),
      new HtmlWebpackPlugin({
        title: 'React Boilerplate',
        template: 'template.html',
        favicon: './src/static/images/favicon.png',
      }),
      analyze ? new BundleAnalyzerPlugin() : undefined,
    ]),
  };
};
