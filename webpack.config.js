const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"], modules: ["node_modules"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: path.join(__dirname, "src", "public", "index.html") }),
    new webpack.DefinePlugin({
      __SERVER__: `'${process.env.SERVER_HOSTNAME || "http://localhost:3000"}'`,
      __OWLEYES_ENDPOINT__: `'${process.env.OWLEYES_ENDPOINT}'`,
      __SEENOMALY_ENDPOINT__: `'${process.env.SEENOMALY_ENDPOINT}'`,
      __BATCH_JOB_ENDPOINT__: `'${process.env.BATCH_JOB_ENDPOINT}'`,
    }),
  ],
};
