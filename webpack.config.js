const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    plugins: [
      new Dotenv(),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          use: ["babel-loader"],
          test: /\.js$|jsx/,
          exclude: [/node_modules/],
        },
        {
          test: [/\.css$/i],
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
  };
};
