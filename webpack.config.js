const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve("./dist"),
    filename: "script/bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {test: /.ts$/, use: {
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }}
    ]
  },
  resolve: {
    // 模块解析的时候 除了看一下是否是js文件 还看一下是否是ts文件 
    // 默认情况下是解析js文件，这样的话导入ts模块就无法识别
    extensions: [".js", ".ts"]
  }
}