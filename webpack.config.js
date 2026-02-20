const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    mode: argv.mode || "development",
    devtool: isProd ? false : "eval-source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProd ? "[hash:base64:8]" : "[name]__[local]--[hash:base64:5]",
                  namedExport: false,
                  exportLocalsConvention: "as-is",
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProd ? "[hash:base64:8]" : "[name]__[local]--[hash:base64:5]",
                  namedExport: false,
                  exportLocalsConvention: "as-is",
                },
              },
            },
            "sass-loader",
          ],
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "js/[name].[contenthash].js" : "[name].bundle.js",
      chunkFilename: isProd ? "js/[name].[contenthash].chunk.js" : "[name].chunk.js",
      clean: true
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: 'single',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: isProd ? {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        } : false
      }),
      ...(isProd ? [
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash].css",
          chunkFilename: "css/[id].[contenthash].css",
        }),
        new CompressionPlugin({
          filename: "[path][base].gz",
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      ] : [])
    ],
    devServer: {
      port: 3000,
      historyApiFallback: true,
      open: true
    }
  };
};