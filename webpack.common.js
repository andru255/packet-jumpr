const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const tsconfig = require("./tsconfig.json");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx|.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@abstract": path.resolve(__dirname, "src/abstract"),
      "@toolbox": path.resolve(__dirname, "src/toolbox"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "lib"),
    library: "pongts",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Pong v2! reloaded",
      template: "index.html",
    }),
    new WriteFilePlugin(),
  ],
};
