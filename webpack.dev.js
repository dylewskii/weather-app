// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require("webpack-merge");
// eslint-disable-next-line import/extensions
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
});
