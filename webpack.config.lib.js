const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "flip-number.js",
    library: "flipNumber", // 在全局变量中增加一个library变量
    libraryTarget: "umd"
  }
}