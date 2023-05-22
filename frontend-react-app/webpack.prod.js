// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'media/[name][ext]',
    // sourceMapFilename: 'js/[name].[contenthash].js.map',
    path: path.resolve(__dirname, '..', 'build'),
    // clean: true,
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, '..', 'build'),
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { modules: true },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },

      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: ImageMinimizerPlugin.loader,
        enforce: 'pre',
        options: {
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
          },
        },
      },
    ],
  },
  // Webpack will automatically resolve these extensions when they are imported without extension
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.css', '.scss'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: 'public/index.html',
          filename: 'index.html',
          favicon: 'public/favicon.ico',
          manifest: 'public/manifest.json',
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    ),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      exclude: /.map$/,
      deleteOriginalAssets: true,
    }),
  ],

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        common: {
          test: /[\\/]src[\\/]reusable_ui_components[\\/]/,
          chunks: 'all',
          minSize: 0,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              'imagemin-gifsicle',
              'imagemin-mozjpeg',
              'imagemin-pngquant',
              'imagemin-svgo',
            ],
          },
        },
        generator: [
          {
            // You can apply generator using `?as=webp`, you can use any name and provide more options
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp'],
            },
          },
        ],
      }),
    ],
  },
};
