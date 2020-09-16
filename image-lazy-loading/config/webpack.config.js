const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const contentBase = `/image-lazy-loading`
const resolve = {
  extensions: ['.vue', '.less', '.css', '.js', '.jsx', '.ts'], // 忽略文件后缀
  modules: ['node_modules'], // 指定包的目录
  alias: {
    '@': contentBase // 文件目录缩写
  }
}

const webpackModule = {
  rules: [{
      test: /\.js[x]?$/,
      use: ['babel-loader']
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:7].[ext]'
        }
      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:7].[ext]'
        }
      }]
    },
    {
      test: /\.(html)$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    },
  ]
}

module.exports = {
  mode: "production",
  entry: "./image-lazy-loading/index.js",
  module: webpackModule,
  resolve,
  output: {
    path: path.resolve("image-lazy-loading/dist/"),
    filename: "image-lazy-loading.js",
    library: "imageLazyLoading", // 在全局变量中增加一个library变量
    libraryTarget: "umd"
  }
}