// webpack.config.js
const JavaScriptObfuscator = require("webpack-obfuscator");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//Multi page entry
function getEntry() {
  const entry = {};
  glob.sync("./src/pages/**/index.js").forEach((file) => {
    const name = file.match(/\/pages\/(.+)\/index.js/)[1];
    entry[name] = file;
  });
  return entry;
}

//Multi page template
function getHtmlTemplate() {
  return glob
    .sync("./src/pages/**/index.html")
    .map((file) => {
      return { name: file.match(/\/pages\/(.+)\/index.html/)[1], path: file };
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          template: template.path,
          chunks: [template.name.toString()],
          filename: `${template.name}.html`,
          minify: {
            removeRedundantAttributes: false,
          },
        })
    );
}

const config = {
  mode: "production",
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].[contenthash].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...getHtmlTemplate(),
    new JavaScriptObfuscator({
      rotateStringArray: true,
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
};

module.exports = config;
