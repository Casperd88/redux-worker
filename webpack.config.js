const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Redux Worker",
      template: path.resolve(__dirname, "public/index.html")
    }),
    new WorkerPlugin()
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "self"
  }
};
