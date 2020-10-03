const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PROJECT_NAME = 'picture-magnifier';
const contentBase = `/${PROJECT_NAME}`
const entryIndex = `/${PROJECT_NAME}/index.js`
const htmlTemplete = `/${PROJECT_NAME}/index.html`

const output = {
  publicPath: '/',
  path: '/dist',
  filename: 'bundle.[hash:7].js',
  chunkFilename: 'chunks/[name].[hash:7].js',
}

const resolve = {
  extensions: ['.vue', '.less', '.css', '.js', '.jsx', '.ts'], // 忽略文件后缀
  modules: ['node_modules'], // 指定包的目录
  alias: {
    '@': contentBase // 文件目录缩写
  }
}

const webpackModule = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js[x]?$/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader', {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader', 'less-loader']
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

const plugins = [
  new HtmlWebpackPlugin({
    template: htmlTemplete
  }),
  new webpack.HotModuleReplacementPlugin(), // 热加载
]

const devServer = {
  contentBase: '/dist',
  compress: true,
  watchContentBase: false,
  progress: true,
  open: true,
  hot: false,
  disableHostCheck: true,
  host: 'localhost',
  port: 9030,
  historyApiFallback: false,
  proxy: {
    '/api': {
      target: 'http://localhost:6000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  }
}

module.exports = {
  mode: 'development', // 打包模式 development || production
  entry: entryIndex, // 入口文件
  output, // 打包输出文件目录
  resolve,
  module: webpackModule,
  plugins,
  devServer,
}