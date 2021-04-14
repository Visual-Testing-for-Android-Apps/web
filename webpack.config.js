const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var apiHost = "'http://localhost:3001'";

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({template: path.join(__dirname, "src", "public", "index.html")}),
          new webpack.DefinePlugin({
            __API__: "'https://secure-everglades-60104.herokuapp.com'"
          })]
};

// var setupApi = function() {
//   switch (process.env.NODE_ENV) {
//     case 'prod':
//       apiHost = '';
//       break;
//     case 'dev':
//       apiHost = "'http://localhost:3001'";
//       break;
//   }
// };

//setupApi();
