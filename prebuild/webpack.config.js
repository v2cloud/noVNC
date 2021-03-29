const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const JSONMinifyPlugin = require("node-json-minify");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.[contenthash].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/vnc.html",
      filename: "vnc.html",
    }),
    new MiniCssExtractPlugin({
      filename: "base.[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "package.json"),
          transform: function (content) {
            return JSONMinifyPlugin(content.toString());
          },
          to: "./",
        },
        {
          from: path.resolve(__dirname, "src", "app", "locale"),
          transform: function (content) {
            return JSONMinifyPlugin(content.toString());
          },
          to: "./app/locale",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(svg|png|mp3|oga)$/,
        type: "asset/inline",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
};
